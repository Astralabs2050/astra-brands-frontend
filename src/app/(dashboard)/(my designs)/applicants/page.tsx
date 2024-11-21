import ApplicantBox from "@/components/my-designs/Applicants";
import DashboardFrame from "@/shared/DashboardFrame";
import LoaderSvg from "@/shared/LoaderSvg";
import { Suspense } from "react";

export default function Applicants() {
  return (
    <DashboardFrame withSideBar>
      <Suspense
        fallback={
          <div>
            <LoaderSvg color="#000000" />
          </div>
        }
      >
        <ApplicantBox />
      </Suspense>
    </DashboardFrame>
  );
}
