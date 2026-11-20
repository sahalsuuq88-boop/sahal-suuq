import RevenueChart from "../components/anlytics/revenue";
// import StatCard from "../../components/anlytics/statCard";
// import { stats } from "../../lib/anlyticsData";
import OrdersChart from "../components/anlytics/ordersChart";
import SalesCategory from "../components/anlytics/salesCategory";
import TopProducts from "../components/anlytics/topProducts";
import RecentOrders from "../components/anlytics/recentOrders";
import ActivityTimeline from "../components/anlytics/activity";
import CustomerGrowth from "../components/anlytics/customerGrowth";
import TrafficSources from "../components/anlytics/trafficSources";
import DateFilter from "../components/anlytics/dateFilter";
import ExportButton from "../components/anlytics/exportMenu";


export default function AnalyticsPage() {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Track your store performance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DateFilter />
          <ExportButton />
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {/* StatCard */}
      </div>

      {/* CHARTS */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        <OrdersChart />
        <SalesCategory />
      </div>

      {/* TABLES */}
      <div className="grid gap-6 xl:grid-cols-2">
        <TopProducts />
        <RecentOrders />
      </div>

      {/* INSIGHTS */}
      <div className="grid gap-6 lg:grid-cols-3">
        <CustomerGrowth />
        <TrafficSources />
        <ActivityTimeline />
      </div>

    </div>
  );
}
