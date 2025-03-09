import GenerateBox from "@/components/creative-space/GenerateBox";
import DashboardFrame from "@/shared/DashboardFrame";

export default function MyCreativeSpace() {
  return (
    <DashboardFrame withSideBar noActions>
      <GenerateBox />
    </DashboardFrame>
  );
}
