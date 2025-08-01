import React from "react";
import StatCard from "./StatCard";
import ChartComponent from "./ChartComponent";
import ModeOfDelivery from "./ModeofDelivery";
import RecentTransactions from "./RecentTransactions";
import {
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Receipt,
  BarChart3,
  ShoppingBag,
} from "lucide-react";

const statsData = [
  {
    title: "Gross Sales",
    value: "$24,500",
    icon: DollarSign,
    color: "blue",
    trend: "up",
    trendValue: "+12.5%",
  },
  {
    title: "Total Income",
    value: "$18,200",
    icon: TrendingUp,
    color: "green",
    trend: "up",
    trendValue: "+8.2%",
  },
  {
    title: "Total Purchase",
    value: "$12,800",
    icon: ShoppingCart,
    color: "purple",
    trend: "down",
    trendValue: "-3.1%",
  },
  {
    title: "Total Expense",
    value: "$6,400",
    icon: Receipt,
    color: "red",
    trend: "up",
    trendValue: "+5.4%",
  },
  {
    title: "Gross Profit",
    value: "$11,700",
    icon: BarChart3,
    color: "orange",
    trend: "up",
    trendValue: "+15.8%",
  },
  {
    title: "Orders",
    value: "1,248",
    icon: ShoppingBag,
    color: "indigo",
    trend: "up",
    trendValue: "+22.3%",
  },
];

const Dashboard = ({ sidebarCollapsed }) => {
  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-6 w-full">
      <div className="">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ChartComponent />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ModeOfDelivery />
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
