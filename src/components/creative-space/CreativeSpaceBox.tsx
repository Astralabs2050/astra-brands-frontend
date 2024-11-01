"use client";

import { dwIcon, placeHolder } from "@/image";
import Button from "@/shared/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CreativeSpaceBox() {
  const route = useRouter();
  return (
    <div className="w-[100%] p-[7rem]">
      <div className="flex flex-col justify-center items-center">
        <p className="text-center text-[3rem]">
          Welcome to your Creative Space
        </p>
        <div className="flex">
          <Image src={dwIcon} alt="" width={24} height={24} />
          <p className="text-[2rem] ml-[1.2rem] text-astraTextGrey">
            Design a fashion collection and bring it to life{" "}
          </p>
        </div>
        <div className="mt-[5rem]">
          <Image src={placeHolder} alt="placeholder" width={290} height={380} />
        </div>
        <div className="flex gap-x-[1rem] mt-[5rem]">
          <Button
            action="Upload Designs"
            width="w-[24rem]"
            handleClick={() => {}}
            fontSize="text-[1.6rem]"
            inverse
          />
          <Button
            action="Generate Inspiration (3 free trials)"
            width="w-[29rem]"
            handleClick={() => {
              route.push("/generate-designs");
            }}
            fontSize="text-[1.6rem]"
          />
        </div>
      </div>
    </div>
  );
}
