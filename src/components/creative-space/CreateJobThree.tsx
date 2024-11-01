"use client";
import { blueWarning, writeWithAi } from "@/image";
import Button from "@/shared/Button";
import ButtonWithIcon from "@/shared/ButtonWithIcon";
import CustomRadioButtonGroup from "@/shared/CustomRadioButtons";
import JobFrame from "@/shared/JobFrame";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateJobThree() {
  const route = useRouter();
  const [text, setText] = useState<string>("");
  const maxChars = 1000;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    if (target.value.length <= maxChars) {
      setText(target.value);
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
    }
  };

  const [selectedOption1, setSelectedOption1] = useState<string>("");
  const [selectedOption2, setSelectedOption2] = useState<string>("");
  const [selectedOption3, setSelectedOption3] = useState<string>("");
  const options = [
    "More than 6 months",
    "3 to 6 months",
    "1 to 3 months",
    "1 to 3 weeks",
  ];
  const yesOrNo = ["Yes", "No"];

  return (
    <JobFrame
      title="Create a Job"
      description=""
      pageNumber="3/3"
      link="/additional-information-2"
    >
      <div className="mt-[7rem] mx-[5rem]">
        <p className="text-[1.5rem] mb-[1rem]">Job Description*</p>
        <div className="border border-astraTextGrey rounded-[1rem] p-[3rem]">
          <textarea
            placeholder="Write a short description about the work"
            className="text-[1.5rem] w-[90%] bg-transparent outline-none resize-none overflow-hidden"
            rows={5}
            value={text}
            onChange={handleInputChange}
          />
          <div className="flex items-end justify-end gap-x-[1.8rem]">
            <p className="text-[1.5rem] text-astraLightBlack">
              {text.length}/{maxChars}
            </p>
            <ButtonWithIcon
              action="Write with AI"
              handleClick={() => {}}
              loaderColor="#ffffff"
              icon={writeWithAi}
              containerStyle="bg-white rounded-full  py-[1rem] px-[2rem] min-w-[14rem] border border-black"
              fontStyle="text-black  text-[1.4rem]"
              iconWidth="w-[2.4rem]"
            />
          </div>
        </div>
        <hr className="m-[5rem]" />
        <p className="text-[1.7rem] mb-[3rem]">
          Select the Timeline for your different created jobs.*
        </p>
        <p className="text-[2rem] mb-[1.8rem]">Graphic Designer.</p>
        <CustomRadioButtonGroup
          options={options}
          selectedOption={selectedOption1}
          onChange={setSelectedOption1}
        />
        <p className="text-[2rem] mb-[1.8rem]">Manufacture a Sample.</p>
        <CustomRadioButtonGroup
          options={options}
          selectedOption={selectedOption2}
          onChange={setSelectedOption2}
        />
        <hr className="m-[5rem]" />
        <p className="text-[1.7rem] mb-[3rem]">
          Would you be sending your fabric to the manufacturer for this job?*
        </p>
        <CustomRadioButtonGroup
          options={yesOrNo}
          selectedOption={selectedOption3}
          onChange={setSelectedOption3}
        />
        <div className="flex items-center gap-x-[1rem] p-[2rem] bg-astraGreyBg rounded-[1rem]">
          <Image src={blueWarning} alt="" width={20} height={20} />
          <p className="text-[1.5rem] text-astraTextGrey ">
            We recommend that you send your preferred fabric to the manufacturer
            to avoid dispute and ensure quality production of your outfit
          </p>
        </div>
        <hr className="m-[5rem]" />
        <div className="flex justify-center gap-x-[2rem] items-center">
          <Button
            action="Cancel"
            width="w-[25rem]"
            handleClick={() => {
              route.push("/dashboard");
            }}
            fontSize="text-[1.3rem] font-bold"
            inverse
            rounded
          />
          <Button
            action="Create Jobs"
            width="w-[25rem]"
            handleClick={() => {
              route.push("/job-confirmation");
            }}
            fontSize="text-[1.3rem] font-bold"
            rounded
          />
        </div>
      </div>
    </JobFrame>
  );
}
