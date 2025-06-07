import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Truck, Package, AlertTriangle, Search, Plus, RefreshCw, Upload } from "lucide-react";
import { useInventory, useLowStockItems, useExpiringItems, useUpdateStock } from "@/hooks/useInventory";
import CsvUpload from "./CsvUpload";

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCsvUpload, setShowCsvUpload] = useState(false);
  const [csvProducts, setCsvProducts] = useState<any[]>([]);
  
  const { data: inventoryData, isLoading, refetch } = useInventory();
  const { data: lowStockData } = useLowStockItems();
  const { data: expiringData } = useExpiringItems();
  const updateStockMutation = useUpdateStock();

  // Fallback data while loading or if API fails
  const fallbackData = [
    {
      id: "INV-001",
      name: "Ethiopian Coffee Premium",
      category: "Beverages",
      currentStock: 1250,
      minimumStock: 500,
      maxStock: 2000,
      location: "Warehouse A",
      expiryDate: "2024-06-15",
      status: "In Stock",
      lastRestocked: "2024-01-10"
    },
    {
      id: "INV-002",
      name: "Organic Teff Grain",
      category: "Grains",
      currentStock: 180,
      minimumStock: 200,
      maxStock: 1000,
      location: "Warehouse B", 
      expiryDate: "2024-08-20",
      status: "Low Stock",
      lastRestocked: "2024-01-08"
    },
    {
      id: "INV-003",
      name: "Honey Processing Kit",
      category: "Equipment",
      currentStock: 45,
      minimumStock: 100,
      maxStock: 300,
      location: "Warehouse C",
      expiryDate: "N/A",
      status: "Critical",
      lastRestocked: "2024-01-05"
    },
    {
      id: "INV-004",
      name: "Organic Spice Mix",
      category: "Spices",
      currentStock: 890,
      minimumStock: 300,
      maxStock: 1200,
      location: "Warehouse A",
      expiryDate: "2024-04-30",
      status: "In Stock",
      lastRestocked: "2024-01-12"
    }
  ];

  // Combine API data with CSV uploaded products
  const allProducts = [...(inventoryData || fallbackData), ...csvProducts];
  const displayData = allProducts;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock": return "bg-emerald-100 text-emerald-700";
      case "Low Stock": return "bg-amber-100 text-amber-700";
      case "Critical": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getStockLevel = (current: number, min: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const isExpiringSoon = (expiryDate: string) => {
    if (expiryDate === "N/A") return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  const filteredInventory = displayData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const criticalItems = displayData.filter(item => item.status === "Critical").length;
  const lowStockItems = displayData.filter(item => item.status === "Low Stock").length;
  const expiringItems = displayData.filter(item => isExpiringSoon(item.expiryDate)).length;

  const handleUpdateStock = (id: string, quantity: number) => {
    updateStockMutation.mutate({ id, quantity });
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleCsvProductsUploaded = (products: any[]) => {
    setCsvProducts(prevProducts => [...prevProducts, ...products]);
    setShowCsvUpload(false);
  };

  return (
    <div className="space-y-6">
      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Items</p>
                <p className="text-2xl font-bold text-slate-800">
                  {isLoading ? "..." : displayData.length}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Critical Stock</p>
                <p className="text-2xl font-bold text-red-600">{criticalItems}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Low Stock</p>
                <p className="text-2xl font-bold text-amber-600">{lowStockItems}</p>
              </div>
              <Package className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-purple-600">{expiringItems}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CSV Upload Section */}
      {showCsvUpload && (
        <CsvUpload onProductsUploaded={handleCsvProductsUploaded} />
      )}

      {/* Search and Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-emerald-600" />
            Inventory Management
          </CardTitle>
          <CardDescription>Monitor stock levels, expiry dates, and restock alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search by product name, ID, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowCsvUpload(!showCsvUpload)}
            >
              <Upload className="h-4 w-4" />
              {showCsvUpload ? 'Hide' : 'Bulk Upload'}
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <div className="grid gap-4">
        {isLoading ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-slate-600">Loading inventory data...</p>
            </CardContent>
          </Card>
        ) : (
          filteredInventory.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Product Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800">{item.name}</h3>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p><span className="font-medium">ID:</span> {item.id}</p>
                      <p><span className="font-medium">Category:</span> {item.category}</p>
                      <p><span className="font-medium">Location:</span> {item.location}</p>
                      <p><span className="font-medium">Last Restocked:</span> {item.lastRestocked}</p>
                    </div>
                  </div>

                  {/* Stock Levels */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Stock Level</span>
                        <span className="text-slate-600">
                          {item.currentStock} / {item.maxStock}
                        </span>
                      </div>
                      <Progress 
                        value={getStockLevel(item.currentStock, item.minimumStock, item.maxStock)} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>Min: {item.minimumStock}</span>
                        <span>Current: {item.currentStock}</span>
                        <span>Max: {item.maxStock}</span>
                      </div>
                    </div>

                    {/* Expiry Info */}
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm font-medium text-slate-700 mb-1">
                        Expiry Date
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{item.expiryDate}</span>
                        {isExpiringSoon(item.expiryDate) && (
                          <Badge className="bg-red-100 text-red-700 text-xs">
                            Expires Soon!
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit Stock
                      </Button>
                      <Button variant="outline" size="sm">
                        Restock
                      </Button>
                      <Button variant="outline" size="sm">
                        Move Location
                      </Button>
                    </div>

                    {/* Quick Restock */}
                    {(item.status === "Low Stock" || item.status === "Critical") && (
                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <p className="text-xs font-medium text-amber-800 mb-2">Quick Restock</p>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Quantity" 
                            className="text-xs h-8"
                            defaultValue={item.maxStock - item.currentStock}
                            id={`restock-${item.id}`}
                          />
                          <Button 
                            size="sm" 
                            className="h-8 text-xs"
                            onClick={() => {
                              const input = document.getElementById(`restock-${item.id}`) as HTMLInputElement;
                              const quantity = parseInt(input.value);
                              if (quantity) {
                                handleUpdateStock(item.id, quantity);
                              }
                            }}
                            disabled={updateStockMutation.isPending}
                          >
                            Order
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default InventoryManagement;
