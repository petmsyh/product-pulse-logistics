
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Brain, AlertTriangle, Target, Calendar, BarChart3 } from "lucide-react";

const AnalyticsDashboard = () => {
  const aiInsights = [
    {
      title: "Expiry Risk Analysis",
      description: "AI detected 127 products at risk of expiry within 30 days",
      severity: "high",
      action: "Prioritize distribution",
      confidence: 94
    },
    {
      title: "Defect Pattern Detection",
      description: "Batch MB-2024-156 shows 12% higher defect rate",
      severity: "medium", 
      action: "Quality control review",
      confidence: 87
    },
    {
      title: "Demand Forecasting",
      description: "Ethiopian Coffee demand predicted to increase 23% next month",
      severity: "low",
      action: "Increase production",
      confidence: 91
    }
  ];

  const performanceMetrics = [
    { label: "On-time Delivery", value: 94, target: 95, color: "emerald" },
    { label: "Customer Satisfaction", value: 87, target: 90, color: "blue" },
    { label: "Inventory Accuracy", value: 96, target: 98, color: "purple" },
    { label: "Quality Score", value: 92, target: 95, color: "amber" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-amber-100 text-amber-700";
      case "low": return "bg-emerald-100 text-emerald-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getMetricColor = (color: string) => {
    switch (color) {
      case "emerald": return "text-emerald-600";
      case "blue": return "text-blue-600";
      case "purple": return "text-purple-600";
      case "amber": return "text-amber-600";
      default: return "text-slate-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>
            Machine learning analysis of your supply chain data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-slate-800">{insight.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(insight.severity)}>
                      {insight.severity} priority
                    </Badge>
                    <span className="text-sm text-slate-500">{insight.confidence}% confidence</span>
                  </div>
                </div>
                <p className="text-slate-600 mb-3">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">{insight.action}</span>
                  <div className="w-24">
                    <Progress value={insight.confidence} className="h-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-600" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Key performance indicators vs targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${getMetricColor(metric.color)}`}>
                      {metric.value}%
                    </span>
                    <span className="text-sm text-slate-500">/ {metric.target}%</span>
                  </div>
                </div>
                <Progress value={metric.value} className="h-2" />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Current</span>
                  <span className={metric.value >= metric.target ? "text-emerald-600" : "text-amber-600"}>
                    {metric.value >= metric.target ? "Target achieved" : `${metric.target - metric.value}% to target`}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trend Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Trend Analysis
            </CardTitle>
            <CardDescription>Weekly performance trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-emerald-800">Product Movement</span>
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-sm text-emerald-700 mb-1">15% increase this week</p>
                <p className="text-xs text-emerald-600">Peak demand in Addis Ababa region</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-800">Customer Feedback</span>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-sm text-blue-700 mb-1">Gold ratings up 8%</p>
                <p className="text-xs text-blue-600">Improved packaging quality noted</p>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-amber-800">Alert Frequency</span>
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <p className="text-sm text-amber-700 mb-1">23% reduction in expiry alerts</p>
                <p className="text-xs text-amber-600">AI predictions improving accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Predictive Analytics
          </CardTitle>
          <CardDescription>AI-powered forecasting for the next 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-2xl font-bold text-blue-700 mb-1">2,847</div>
              <div className="text-sm text-blue-600 mb-2">Predicted Orders</div>
              <div className="text-xs text-blue-500">+18% vs last month</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
              <div className="text-2xl font-bold text-emerald-700 mb-1">156</div>
              <div className="text-sm text-emerald-600 mb-2">Items at Risk</div>
              <div className="text-xs text-emerald-500">-12% improvement</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-2xl font-bold text-purple-700 mb-1">94.2%</div>
              <div className="text-sm text-purple-600 mb-2">Forecast Accuracy</div>
              <div className="text-xs text-purple-500">AI confidence level</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
