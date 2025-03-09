import CreativeSpaceBox from "@/components/creative-space/CreativeSpaceBox";
import DashboardFrame from "@/shared/DashboardFrame";

export default function MyCreativeSpace() {
  return (
    <DashboardFrame withSideBar noActions>
      <CreativeSpaceBox />
    </DashboardFrame>
  );
}
