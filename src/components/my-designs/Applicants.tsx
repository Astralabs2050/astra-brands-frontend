"use client";

import {
  arrowLeft,
  coverImage1,
  coverImage2,
  coverImage3,
  emailIcon,
  phoneIcon,
  profilePicture,
  webIcon,
} from "@/image";
import { Query } from "@/network/constant";
import { getApplicants } from "@/network/myDesigns";
import Button from "@/shared/Button";
import LoaderSvg from "@/shared/LoaderSvg";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function ApplicantBox() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, isPending } = useQuery({
    queryFn: () => getApplicants(id ?? ""),
    queryKey: [Query.VIEW_APPLICANTS_QUERY],
  });
  const applicants =
    data && data.status === true && !("error" in data) ? data.data : null;
  return (
    <div className="px-[4rem] py-[6rem] bg-astraOffWhite w-[100%]">
      <div
        className="flex gap-x-[2rem] items-center cursor-pointer"
        onClick={() => route.push("/my-designs")}
      >
        <Image src={arrowLeft} alt="" height={24} width={24} />
        <div>
          <p className="text-[2.4rem] font-bold">Job Applicants</p>
          <p className="text-[1.8rem]">
            View creators that have applied to your created job.
          </p>
        </div>
      </div>
      {isPending ? (
        <div className="flex justify-center items-center py-[4rem]">
          <LoaderSvg color="#000000" />
        </div>
      ) : applicants && applicants.length > 0 ? (
        applicants.map((item) => (
          <div key={item.id} className="mt-[5rem] flex gap-x-[4rem] ">
            <div className="w-[28.5rem] rounded-[1.4rem] bg-white pb-[2rem]">
              <div className="flex gap-x-[.4rem]">
                <Image src={coverImage1} alt="" height={130} width={150} />
                <div className="flex flex-col gap-y-[.2rem]">
                  <Image src={coverImage2} alt="" height={68} width={130} />
                  <Image src={coverImage3} alt="" height={68} width={130} />
                </div>
              </div>
              <div className="flex justify-center mt-[-2rem]">
                <Image
                  src={profilePicture}
                  alt=""
                  height={60}
                  width={60}
                  className="bg-white p-[.4rem] rounded-full"
                />
              </div>
              <div className="flex flex-col justify-center items-center px-[2.4rem]">
                <p className="text-[1.8rem] font-bold">
                  {item?.user?.creator?.fullName}
                </p>
                <p className="text-[1.4rem] text-astraTextGrey">
                  {item?.user?.creator?.category[0]}
                </p>
                <hr className="my-[1rem]" />
                <div className="flex items-center justify-center gap-x-[1rem] mb-[1.6rem]">
                  <Image src={emailIcon} alt="" height={20} width={20} />
                  <p className="text-[1.4rem]">{item?.user?.email}</p>
                </div>
                <div className="flex items-center justify-center gap-x-[1rem] mb-[1.6rem]">
                  <Image src={phoneIcon} alt="" height={20} width={20} />
                  <p className="text-[1.4rem]">0978412176</p>
                </div>
                <div className="flex items-center justify-center gap-x-[1rem] mb-[1.6rem] w-[100%]">
                  <Image src={webIcon} alt="" height={20} width={20} />
                  <p className="text-[1.4rem]">
                    https://portfolio.com/angeline
                  </p>
                </div>
                <Button
                  action="View Application"
                  fontSize="text-[1.2rem]"
                  width="w-[100%] py-[1.2rem]"
                  handleClick={() => {
                    route.push("/application-details");
                  }}
                  inverse
                  rounded
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-[1.8rem] py-[4rem] italic">
          No applicant yet
        </div>
      )}
    </div>
  );
}
