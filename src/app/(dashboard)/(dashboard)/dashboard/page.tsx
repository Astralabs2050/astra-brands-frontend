import BrandDashboard from "@/components/dashboard/DashboardBox";
import DashboardFrame from "@/shared/DashboardFrame";

export default function Stat() {
  return (
    <DashboardFrame withSideBar>
      <BrandDashboard />
    </DashboardFrame>
  );
}
