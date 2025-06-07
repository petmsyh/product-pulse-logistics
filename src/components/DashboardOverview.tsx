
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Package, TrendingUp, Users, AlertTriangle, MapPin, Clock } from "lucide-react";
import { useDashboardMetrics, useExpiryAlerts } from "@/hooks/useAnalytics";
import { useLowStockItems } from "@/hooks/useInventory";
import { useFeedbackStats } from "@/hooks/useFeedback";

const DashboardOverview = () => {
  const { data: metrics, isLoading: metricsLoading } = useDashboardMetrics();
  const { data: expiryAlerts, isLoading: expiryLoading } = useExpiryAlerts();
  const { data: lowStockItems, isLoading: stockLoading } = useLowStockItems();
  const { data: feedbackStats, isLoading: feedbackLoading } = useFeedbackStats();

  const dashboardMetrics = [
    {
      title: "Total Products",
      value: metricsLoading ? "Loading..." : metrics?.totalProducts || "0",
      change: "+12%",
      trend: "up",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Active Shipments",
      value: metricsLoading ? "Loading..." : metrics?.activeShipments || "0",
      change: "+5%",
      trend: "up",
      icon: MapPin,
      color: "text-emerald-600"
    },
    {
      title: "Customer Feedback",
      value: feedbackLoading ? "Loading..." : feedbackStats?.averageRating || "N/A",
      change: "+0.2",
      trend: "up",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Expiry Alerts",
      value: expiryLoading ? "Loading..." : expiryAlerts?.count || stockLoading ? "Loading..." : lowStockItems?.length || "0",
      change: "-8",
      trend: "down",
      icon: AlertTriangle,
      color: "text-amber-600"
    }
  ];

  if (metricsLoading || expiryLoading || stockLoading || feedbackLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center text-slate-600">Loading...</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">
                {metric.value}
              </div>
              <p className="text-xs text-slate-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Activity */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Real-time Activity
            </CardTitle>
            <CardDescription>Latest system activities and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {metrics?.recentActivity?.length > 0 ? (
              metrics.recentActivity.map((activity: any) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-emerald-500' :
                    activity.status === 'warning' ? 'bg-amber-500' :
                    activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">{activity.action}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-slate-600 py-4">
                No recent activity data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current system performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {metrics?.systemHealth ? (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Database Performance</span>
                    <span className="text-emerald-600">{metrics.systemHealth.database}%</span>
                  </div>
                  <Progress value={metrics.systemHealth.database} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Response Time</span>
                    <span className="text-emerald-600">{metrics.systemHealth.apiResponse}%</span>
                  </div>
                  <Progress value={metrics.systemHealth.apiResponse} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>AI Processing</span>
                    <span className="text-amber-600">{metrics.systemHealth.aiProcessing}%</span>
                  </div>
                  <Progress value={metrics.systemHealth.aiProcessing} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage Usage</span>
                    <span className="text-blue-600">{metrics.systemHealth.storage}%</span>
                  </div>
                  <Progress value={metrics.systemHealth.storage} className="h-2" />
                </div>
              </>
            ) : (
              <div className="text-center text-slate-600 py-4">
                System health data not available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used system functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
              <Package className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-800">Scan Product</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer">
              <MapPin className="h-8 w-8 text-emerald-600 mb-2" />
              <span className="text-sm font-medium text-emerald-800">Track Shipment</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer">
              <Users className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-800">View Feedback</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer">
              <AlertTriangle className="h-8 w-8 text-amber-600 mb-2" />
              <span className="text-sm font-medium text-amber-800">Check Alerts</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
