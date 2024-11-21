import ApplicationDetailsBox from "@/components/my-designs/ApplicantDetails";
import DashboardFrame from "@/shared/DashboardFrame";
import LoaderSvg from "@/shared/LoaderSvg";
import { Suspense } from "react";

export default function ApplicationDetails() {
  return (
    <DashboardFrame withSideBar>
      <Suspense
        fallback={
          <div>
            <LoaderSvg color="#000000" />
          </div>
        }
      >
        <ApplicationDetailsBox />
      </Suspense>
    </DashboardFrame>
  );
}
