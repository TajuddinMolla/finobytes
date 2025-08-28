import { useState } from "react";
import { Award, TrendingUp, Gift, Star } from "lucide-react";

interface PointsTransaction {
  id: string;
  type: "earned" | "redeemed";
  amount: number;
  description: string;
  date: string;
  merchant?: string;
}

interface PointsData {
  totalPoints: number;
  lifetimeEarned: number;
  lifetimeRedeemed: number;
  currentTier: string;
  nextTier: string;
  pointsToNextTier: number;
  recentTransactions: PointsTransaction[];
}

const mockPointsData: PointsData = {
  totalPoints: 2847,
  lifetimeEarned: 5420,
  lifetimeRedeemed: 2573,
  currentTier: "Gold",
  nextTier: "Platinum",
  pointsToNextTier: 653,
  recentTransactions: [
    {
      id: "TXN-001",
      type: "earned",
      amount: 125,
      description: "Purchase at TechStore Pro",
      date: "2025-01-20",
      merchant: "TechStore Pro",
    },
    {
      id: "TXN-002",
      type: "earned",
      amount: 89,
      description: "Bonus points promotion",
      date: "2025-01-19",
    },
    {
      id: "TXN-003",
      type: "redeemed",
      amount: -200,
      description: "Gift card redemption",
      date: "2025-01-18",
    },
    {
      id: "TXN-004",
      type: "earned",
      amount: 67,
      description: "Purchase at Fashion Hub",
      date: "2025-01-17",
      merchant: "Fashion Hub",
    },
    {
      id: "TXN-005",
      type: "earned",
      amount: 45,
      description: "Referral bonus",
      date: "2025-01-16",
    },
  ],
};

export default function PointsSummary() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "history" | "rewards"
  >("overview");
  const [data] = useState<PointsData>(mockPointsData);

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "bronze":
        return "text-amber-600 bg-amber-100";
      case "silver":
        return "text-gray-600 bg-gray-100";
      case "gold":
        return "text-yellow-600 bg-yellow-100";
      case "platinum":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-blue-600 bg-blue-100";
    }
  };

  const progressPercentage = ((3500 - data.pointsToNextTier) / 3500) * 100;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Points</p>
              <p className="text-3xl font-bold">
                {data.totalPoints.toLocaleString()}
              </p>
            </div>
            <Award className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Lifetime Earned
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {data.lifetimeEarned.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Current Tier</p>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTierColor(
                  data.currentTier
                )}`}
              >
                <Star className="w-4 h-4 mr-1" />
                {data.currentTier}
              </span>
            </div>
            <Gift className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                To {data.nextTier}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {data.pointsToNextTier}
              </p>
              <p className="text-xs text-gray-400">points needed</p>
            </div>
            <div className="w-12 h-12 relative">
              <svg
                className="w-12 h-12 transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray={`${progressPercentage}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[{ id: "overview", name: "Overview", icon: Award }].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Points Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                      <span className="text-emerald-800 font-medium">
                        Total Earned
                      </span>
                      <span className="text-emerald-900 font-bold">
                        +{data.lifetimeEarned.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-red-800 font-medium">
                        Total Redeemed
                      </span>
                      <span className="text-red-900 font-bold">
                        -{data.lifetimeRedeemed.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                      <span className="text-blue-800 font-medium">
                        Current Balance
                      </span>
                      <span className="text-blue-900 font-bold text-lg">
                        {data.totalPoints.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Tier Progress
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getTierColor(
                          data.currentTier
                        )}`}
                      >
                        {data.currentTier}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getTierColor(
                          data.nextTier
                        )}`}
                      >
                        {data.nextTier}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      {data.pointsToNextTier} more points to reach{" "}
                      {data.nextTier}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
