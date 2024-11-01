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
import Button from "@/shared/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ApplicantBox() {
  const route = useRouter();
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
      <div className="mt-[5rem] flex gap-x-[4rem] ">
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
            <p className="text-[1.8rem] font-bold">Angeline Beier</p>
            <p className="text-[1.4rem] text-astraTextGrey">
              3D Artist, Designer
            </p>
            <hr className="my-[1rem]" />
            <div className="flex items-center justify-center gap-x-[1rem] mb-[1.6rem]">
              <Image src={emailIcon} alt="" height={20} width={20} />
              <p className="text-[1.4rem]">angeline@gmail.com</p>
            </div>
            <div className="flex items-center justify-center gap-x-[1rem] mb-[1.6rem]">
              <Image src={phoneIcon} alt="" height={20} width={20} />
              <p className="text-[1.4rem]">0978412176</p>
            </div>
            <div className="flex items-center justify-center gap-x-[1rem] mb-[1.6rem] w-[100%]">
              <Image src={webIcon} alt="" height={20} width={20} />
              <p className="text-[1.4rem]">https://portfolio.com/angeline</p>
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
            <p className="text-[1.8rem] font-bold">Angeline Beier</p>
            <p className="text-[1.4rem] text-astraTextGrey">
              3D Artist, Designer
            </p>
            <hr className="my-[1rem]" />
            <div className="flex items-center justify-center gap-x-[1rem] mb-[1.6rem]">
              <Image src={emailIcon} alt="" height={20} width={20} />
              <p className="text-[1.4rem]">angeline@gmail.com</p>
            </div>
            <div className="flex items-center justify-center gap-x-[1rem] mb-[1.6rem]">
              <Image src={phoneIcon} alt="" height={20} width={20} />
              <p className="text-[1.4rem]">0978412176</p>
            </div>
            <div className="flex items-center justify-center gap-x-[1rem] mb-[1.6rem] w-[100%]">
              <Image src={webIcon} alt="" height={20} width={20} />
              <p className="text-[1.4rem]">https://portfolio.com/angeline</p>
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
        </div>{" "}
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
            <p className="text-[1.8rem] font-bold">Angeline Beier</p>
            <p className="text-[1.4rem] text-astraLightBlack">
              3D Artist, Designer
            </p>
            <hr className="my-[1rem]" />
            <div className="flex items-center justify-center gap-x-[1rem] mb-[1.6rem]">
              <Image src={emailIcon} alt="" height={20} width={20} />
              <p className="text-[1.4rem]">angeline@gmail.com</p>
            </div>
            <div className="flex items-center justify-center gap-x-[1rem] mb-[1.6rem]">
              <Image src={phoneIcon} alt="" height={20} width={20} />
              <p className="text-[1.4rem]">0978412176</p>
            </div>
            <div className="flex items-center justify-center gap-x-[1rem] mb-[1.6rem] w-[100%]">
              <Image src={webIcon} alt="" height={20} width={20} />
              <p className="text-[1.4rem]">https://portfolio.com/angeline</p>
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
    </div>
  );
}
