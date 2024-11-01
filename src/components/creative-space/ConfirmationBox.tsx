"use client";

import { confirmIcon } from "@/image";
import Button from "@/shared/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ConfirmationBox() {
  const route = useRouter();
  return (
    <div
      className="bg-white w-[50rem] p-[2.4rem] lg:p-[3.2rem] rounded-[1.8rem]"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex justify-center">
        <div className="w-[8rem] ">
          <Image
            src={confirmIcon}
            alt=""
            style={{
              width: "100%",
              height: "auto",
            }}
            height={20}
            width={70}
          />
        </div>
      </div>
      <p className="text-[1.8rem] mt-[2rem] lg:mt-[3rem] w-[60%] mx-auto text-black font-bold text-center">
        Your outfit has been sent to the Talent Market!
      </p>
      <p className="text-[1.4rem] mt-[.8rem] text-gray-500 mb-[2rem] text-center">
        A job has been created, you will receive a list of applicants as soon as
        a maker applies to your created job.
      </p>
      <div className="mt-[1rem] flex justify-between w-[100%]">
        <div className="w-[48%]">
          <Button
            action="View in My Designs"
            fontSize="text-[1.4rem]"
            width="w-[100%]"
            handleClick={() => {
              route.push("/my-designs");
            }}
            inverse
            rounded
          />
        </div>
        <div className="w-[48%]">
          <Button
            action="Create another look"
            fontSize="text-[1.4rem]"
            width="w-[100%]"
            handleClick={() => {
              route.push("/my-creative-space");
            }}
            rounded
          />
        </div>
      </div>
    </div>
  );
}
