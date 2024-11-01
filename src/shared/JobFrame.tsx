"use client";
import { logo } from "@/image";
import Image from "next/image";
import GoBack from "./GoBack";
interface OnboardFrameProps {
  link: string;
  pageNumber: string;
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function JobFrame({
  link,
  pageNumber,
  children,
  title,
  description,
}: OnboardFrameProps) {
  return (
    <div className="bg-astraOffWhite">
      <div className="px-[5rem] pt-[3rem] pb-[4rem]">
        <Image src={logo} alt="logo" height={30} width={150} />
      </div>
      <div className="bg-white w-[80%] mx-auto px-[4rem] py-[5rem] rounded-[2rem]">
        <div className="flex justify-between items-center">
          <GoBack link={link} />
          <div>
            <p className="text-[3rem] font-bold text-center ">{title}</p>
            <p className="text-[2rem] text-astraGray text-center">
              {description}
            </p>
          </div>
          <p className="text-[2rem] text-astraBlue text-bold">{pageNumber}</p>
        </div>
        <div className="mx-auto">{children}</div>
      </div>
    </div>
  );
}
