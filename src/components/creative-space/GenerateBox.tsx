"use client";

import {
  dwIcon,
  featuredIcon,
  generateIcon,
  sample1,
  sample2,
  sample3,
  sample4,
  tickedIcon,
  uploadIcon,
} from "@/image";
import ButtonWithIcon from "@/shared/ButtonWithIcon";
import Image from "next/image";
import { useRef, useState } from "react";
import SkillNeededModal from "./SkillNeededModal";
import { useRouter } from "next/navigation";

export default function GenerateBox() {
  const route = useRouter();
  const [generated, setGenerated] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [skillNeededModal, setSkillNeededModal] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAttach = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Open file dialog
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages: string[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          newImages.push(reader.result as string);
          setImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  if (generated === "") {
    return (
      <div className="w-[100%] px-[17rem] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center w-[100%]">
          <p className="text-center text-[3rem]">
            Welcome to your Creative Space
          </p>
          <div className="flex">
            <Image src={dwIcon} alt="" width={20} height={20} />
            <p className="text-[1.5rem] ml-[1.2rem] text-astraTextGrey">
              Design a collection using AI and bring your ideas to life
            </p>
          </div>
          <div className="flex justify-between items-center w-[100%] border-astraSilver bg-astraGreyBg px-[3rem] py-[2rem] rounded-[1rem] mt-[5rem]">
            <div className="w-[100%]">
              <textarea
                placeholder="Enter prompt e.g., 'female model wearing multi-coloured jumpsuit'"
                className="text-[1.5rem] w-[90%] bg-transparent outline-none resize-none overflow-hidden"
                rows={1}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
              <div
                className="flex items-center gap-x-[.7rem] mt-[1.2rem] cursor-pointer"
                onClick={handleAttach}
              >
                <Image src={uploadIcon} alt="" width={15} height={15} />
                <p className="text-[1.5rem]">Attach</p>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    width={500}
                    height={500}
                    alt={`Uploaded ${index + 1}`}
                    className="w-[100px] h-[100px] object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
            <ButtonWithIcon
              action="Generate"
              handleClick={() => {
                setGenerated("something");
              }}
              loaderColor="#ffffff"
              icon={generateIcon}
              containerStyle="bg-black rounded-full  py-[1.2rem] mt-[2rem] min-w-[15rem]"
              fontStyle="text-white text-[1.5rem]"
              iconWidth="w-[2.4rem]"
            />
          </div>
          <p className="text-[1.5rem] text-astraTextGrey mt-[2rem]">
            You have <span className="text-[1.5rem] text-black">3/3 </span>free
            outfit generations
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-[100%] p-[3rem]">
        <p className="text-[1.5rem] text-astraTextGrey">Prompt:</p>
        <p className="text-[2rem] mt-[1.5rem]">{prompt}</p>
        <hr className=" mx-[3rem] mt-[2rem] mb-[4rem]" />
        <p className="text-[1.5rem] text-astraTextGrey mb-[2rem]">Results:</p>
        <div className="flex gap-x-[2rem]">
          {[sample1, sample2, sample3, sample4].map((item, index) => (
            <Image key={index} src={item} alt="" width={220} height={260} />
          ))}
        </div>
        <div className="mx-auto w-[max-content]">
          <ButtonWithIcon
            action="Bring Your idea To Life"
            handleClick={() => {
              setSkillNeededModal(true);
            }}
            loaderColor="#ffffff"
            icon={generateIcon}
            containerStyle="bg-astraBlue w-[22rem] rounded-[.5rem] py-[1.2rem] mt-[10rem] mx-auto"
            fontStyle="text-white text-[1.5rem]"
            iconWidth="w-[2.4rem]"
          />
        </div>
        <SkillNeededModal
          isVisible={skillNeededModal}
          handleCancel={() => {
            setSkillNeededModal(false);
          }}
          handleProceed={() => {
            route.push("/additional-information-1");
          }}
        >
          <div>
            {[
              {
                id: 1,
                title: "Graphic Designer",
                description: " ",
                icon: featuredIcon,
              },
              {
                id: 2,
                title: "Fashion Illustrator",
                description: " ",
                icon: featuredIcon,
              },
              {
                id: 3,
                title: "Tech Pack Designer",
                description: " ",
                icon: featuredIcon,
              },
              {
                id: 4,
                title: "Manufacture a Sample",
                description:
                  "Find a tailor or manufacturer to make a sample made",
                icon: featuredIcon,
              },
            ].map((item) => (
              <div
                key={item.id}
                className={`flex justify-between items-center p-[1.6rem] rounded-[1.2rem] border mt-[2rem] ${
                  selectedId === item.id ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setSelectedId(item.id)}
              >
                <div className="flex items-center gap-x-[1.6rem]">
                  <Image src={item.icon} alt="" width={32} height={32} />
                  <div>
                    <p className="text-[1.7rem]">{item.title}</p>
                    <p className="text-[1.4rem] text-astraTextGrey">
                      {item.description}
                    </p>
                  </div>
                </div>
                {selectedId === item.id && (
                  <Image
                    src={tickedIcon}
                    alt="Selected"
                    width={24}
                    height={24}
                  />
                )}
              </div>
            ))}
            {/* <div className="flex justify-between items-center p-[1.6rem] rounded-[1.2rem] border mt-[2rem]">
              <div className="flex items-center gap-x-[1.6rem] ">
                <Image src={featuredIcon} alt="" width={32} height={32} />
                <div>
                  <p className="text-[1.7rem]">Graphic Designer</p>
                  <p className="text-[1.4rem] text-astraTextGrey">
                    Find a tailor or manufacturer to make a sample made
                  </p>
                </div>
              </div>
              <Image src={tickedIcon} alt="" width={24} height={24} />
            </div> */}
          </div>
        </SkillNeededModal>
      </div>
    );
  }
}
