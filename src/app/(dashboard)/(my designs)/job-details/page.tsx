import JobDetailsBox from "@/components/my-designs/JobDetailsBox";
import DashboardFrame from "@/shared/DashboardFrame";
import LoaderSvg from "@/shared/LoaderSvg";
import { Suspense } from "react";

export default function JobDetails() {
  return (
    <DashboardFrame>
      <Suspense
        fallback={
          <div>
            <LoaderSvg color="#000000" />
          </div>
        }
      >
        <JobDetailsBox />
      </Suspense>
    </DashboardFrame>
  );
}
