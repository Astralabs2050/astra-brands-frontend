import ApplicantBox from "@/components/my-designs/Applicants";
import DashboardFrame from "@/shared/DashboardFrame";

export default function Applicants() {
  return (
    <DashboardFrame withSideBar>
      <ApplicantBox />
    </DashboardFrame>
  );
}
