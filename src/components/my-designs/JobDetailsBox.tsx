"use client";

import { blueWarning, sample1, sample2, sample3, sample4 } from "@/image";
import CustomRadioButtonGroup from "@/shared/CustomRadioButtons";
import GoBack from "@/shared/GoBack";
import Image from "next/image";
import { useState } from "react";

export function TextBox({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="text-[1.6rem] text-astraTextGrey">{title}</p>
      <p className="text-[1.8rem] text-black">{text}</p>
    </div>
  );
}
export default function JobDetailsBox() {
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
    <div className="px-[10rem] py-[5rem] w-[80%]">
      <GoBack link="/my-designs" />
      <div className="mt-[6rem]">
        <div>
          <p className="text-[2.5rem] mb-[2rem]">AstroWRLD Summer II</p>
          <p className="text-[1.8rem] mb-[6rem] text-astraTextGrey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="flex gap-x-[10rem] mb-[4rem]">
            <TextBox title="Name of Ouffit" text="AstroWRLD  Summer II" />
            <TextBox
              title="AI Prompt"
              text=" Female model wearing multi-coloured jumpsuit"
            />
          </div>
          <div className="flex gap-x-[6rem]">
            <TextBox
              title="How many pieces are in this look?"
              text="3 Pieces"
            />
            <TextBox title="Piece 1" text="Jeans - 10 Pieces" />
            <TextBox title="Piece 2" text="Shirts - 20 Pieces" />
            <TextBox title="Piece 3" text="Shirts - 20 Pieces" />
          </div>
          <div className="flex gap-x-[1.8rem] border border-dashed p-[.8rem] w-[max-content] my-[6rem]">
            {[sample1, sample2, sample3, sample4].map((item, index) => (
              <div key={index} className="w-[20rem] h-[23rem]">
                <Image
                  src={item}
                  alt=""
                  width={500}
                  height={500}
                  style={{ height: "auto", width: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>
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
      </div>
    </div>
  );
}
