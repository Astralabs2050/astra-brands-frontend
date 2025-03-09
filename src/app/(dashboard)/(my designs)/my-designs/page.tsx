import DesignBox from "@/components/my-designs/DesignBox";
import DashboardFrame from "@/shared/DashboardFrame";

export default function MyDesigns() {
  return (
    <DashboardFrame withSideBar>
      <DesignBox />
    </DashboardFrame>
  );
}
