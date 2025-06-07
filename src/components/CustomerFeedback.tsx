
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MessageSquare, TrendingUp, Award, Filter } from "lucide-react";

const CustomerFeedback = () => {
  const [selectedTier, setSelectedTier] = useState("all");

  const feedbackData = [
    {
      id: "FB-001",
      productId: "PB-2024-001",
      productName: "Ethiopian Coffee Premium",
      rating: "Gold",
      score: 4.8,
      comment: "Excellent quality coffee! The aroma and taste are outstanding.",
      customerName: "Alem T.",
      date: "2024-01-15",
      verified: true
    },
    {
      id: "FB-002", 
      productId: "PB-2024-002",
      productName: "Organic Teff Grain",
      rating: "Silver",
      score: 4.2,
      comment: "Good quality grain, but packaging could be improved.",
      customerName: "Bekele M.",
      date: "2024-01-14",
      verified: true
    },
    {
      id: "FB-003",
      productId: "PB-2024-003", 
      productName: "Honey Processing Kit",
      rating: "Bronze",
      score: 3.5,
      comment: "Product works as expected but instructions unclear.",
      customerName: "Sara K.",
      date: "2024-01-13",
      verified: false
    }
  ];

  const ratingStats = {
    gold: { count: 245, percentage: 65 },
    silver: { count: 98, percentage: 26 },
    bronze: { count: 34, percentage: 9 }
  };

  const getRatingColor = (rating: string) => {
    switch (rating.toLowerCase()) {
      case "gold": return "bg-amber-100 text-amber-700 border-amber-200";
      case "silver": return "bg-slate-100 text-slate-700 border-slate-200"; 
      case "bronze": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating.toLowerCase()) {
      case "gold": return "🥇";
      case "silver": return "🥈";
      case "bronze": return "🥉";
      default: return "⭐";
    }
  };

  const filteredFeedback = selectedTier === "all" 
    ? feedbackData 
    : feedbackData.filter(item => item.rating.toLowerCase() === selectedTier);

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-600" />
            Customer Feedback Overview
          </CardTitle>
          <CardDescription>
            Tiered rating system with customer sentiment analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200">
              <div className="text-3xl mb-2">🥇</div>
              <div className="text-2xl font-bold text-amber-700">{ratingStats.gold.count}</div>
              <div className="text-sm text-amber-600 mb-2">Gold Ratings</div>
              <div className="text-xs text-amber-500">{ratingStats.gold.percentage}% of total</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
              <div className="text-3xl mb-2">🥈</div>
              <div className="text-2xl font-bold text-slate-700">{ratingStats.silver.count}</div>
              <div className="text-sm text-slate-600 mb-2">Silver Ratings</div>
              <div className="text-xs text-slate-500">{ratingStats.silver.percentage}% of total</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="text-3xl mb-2">🥉</div>
              <div className="text-2xl font-bold text-orange-700">{ratingStats.bronze.count}</div>
              <div className="text-sm text-orange-600 mb-2">Bronze Ratings</div>
              <div className="text-xs text-orange-500">{ratingStats.bronze.percentage}% of total</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                Customer Feedback
              </CardTitle>
              <CardDescription>Recent customer ratings and comments</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <select 
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="border border-slate-200 rounded px-3 py-1 text-sm"
              >
                <option value="all">All Ratings</option>
                <option value="gold">Gold Only</option>
                <option value="silver">Silver Only</option>
                <option value="bronze">Bronze Only</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFeedback.map((feedback) => (
              <div key={feedback.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <Badge className={`${getRatingColor(feedback.rating)} border`}>
                      {getRatingIcon(feedback.rating)} {feedback.rating}
                    </Badge>
                    <div>
                      <h4 className="font-medium text-slate-800">{feedback.productName}</h4>
                      <p className="text-sm text-slate-500">Product ID: {feedback.productId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{feedback.score}</span>
                    </div>
                    <p className="text-xs text-slate-500">{feedback.date}</p>
                  </div>
                </div>
                
                <p className="text-slate-700 mb-3 italic">"{feedback.comment}"</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">By: {feedback.customerName}</span>
                    {feedback.verified && (
                      <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Reply</Button>
                    <Button variant="outline" size="sm">Flag</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feedback Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            Feedback Analytics
          </CardTitle>
          <CardDescription>Insights from customer feedback trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-slate-800">Top Performing Products</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded">
                  <span className="text-sm">Ethiopian Coffee Premium</span>
                  <Badge className="bg-amber-100 text-amber-700">🥇 4.8</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <span className="text-sm">Organic Spice Mix</span>
                  <Badge className="bg-amber-100 text-amber-700">🥇 4.7</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <span className="text-sm">Traditional Injera Starter</span>
                  <Badge className="bg-slate-100 text-slate-700">🥈 4.3</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-slate-800">Common Feedback Themes</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded">
                  <span className="text-sm">Quality & Taste</span>
                  <span className="text-xs text-emerald-600">78% positive</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-amber-50 rounded">
                  <span className="text-sm">Packaging</span>
                  <span className="text-xs text-amber-600">64% positive</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="text-sm">Delivery Time</span>
                  <span className="text-xs text-blue-600">71% positive</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerFeedback;
