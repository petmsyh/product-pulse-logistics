
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, BarChart3, Users, AlertTriangle, Truck, QrCode, TrendingUp, MapPin } from "lucide-react";
import DashboardOverview from "@/components/DashboardOverview";
import ProductTracking from "@/components/ProductTracking";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import CustomerFeedback from "@/components/CustomerFeedback";
import InventoryManagement from "@/components/InventoryManagement";
import Header from "@/components/Header";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Product & Logistics Management System
          </h1>
          <p className="text-slate-600 text-lg">
            Real-time visibility and intelligent supply chain management
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Tracking
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Feedback
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Inventory
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="tracking">
            <ProductTracking />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="feedback">
            <CustomerFeedback />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
