import StoreBox from "@/components/store-analytics/StoreBox";
import DashboardFrame from "@/shared/DashboardFrame";

export default function StoreAnalytics() {
  return (
    <DashboardFrame withSideBar>
      <StoreBox />
    </DashboardFrame>
  );
}
