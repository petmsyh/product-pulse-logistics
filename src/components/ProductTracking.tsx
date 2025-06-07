
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { QrCode, Search, MapPin, Package, Clock, Truck } from "lucide-react";

const ProductTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const trackingData = [
    {
      id: "PB-2024-001",
      name: "Ethiopian Coffee Premium",
      status: "In Transit",
      location: "Addis Ababa Distribution Center",
      destination: "Dire Dawa Warehouse",
      progress: 65,
      estimatedArrival: "2 hours",
      barcode: "123456789012"
    },
    {
      id: "PB-2024-002", 
      name: "Organic Teff Grain",
      status: "Delivered",
      location: "Customer Location",
      destination: "Bahir Dar Store",
      progress: 100,
      estimatedArrival: "Completed",
      barcode: "123456789013"
    },
    {
      id: "PB-2024-003",
      name: "Honey Processing Kit",
      status: "Processing",
      location: "Manufacturing Facility",
      destination: "Quality Control",
      progress: 25,
      estimatedArrival: "6 hours",
      barcode: "123456789014"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-emerald-100 text-emerald-700";
      case "In Transit": return "bg-blue-100 text-blue-700";
      case "Processing": return "bg-amber-100 text-amber-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Scan Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-blue-600" />
            Product Tracking
          </CardTitle>
          <CardDescription>
            Search by product ID, barcode, or scan QR code for real-time tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Enter product ID or barcode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              Scan QR Code
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tracking Results */}
      <div className="grid gap-6">
        {trackingData.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Package className="h-4 w-4" />
                    Product ID: {item.id}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-slate-800">Current Location</p>
                      <p className="text-sm text-slate-600">{item.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-slate-800">Destination</p>
                      <p className="text-sm text-slate-600">{item.destination}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-slate-800">Estimated Arrival</p>
                      <p className="text-sm text-slate-600">{item.estimatedArrival}</p>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Delivery Progress</span>
                      <span className="text-blue-600">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Barcode */}
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-700 mb-1">Barcode</p>
                    <p className="font-mono text-lg text-slate-800">{item.barcode}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Update Status
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductTracking;
