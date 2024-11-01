import ApplicationDetailsBox from "@/components/my-designs/ApplicantDetails";
import DashboardFrame from "@/shared/DashboardFrame";

export default function ApplicationDetails() {
  return (
    <DashboardFrame withSideBar>
      <ApplicationDetailsBox />
    </DashboardFrame>
  );
}
