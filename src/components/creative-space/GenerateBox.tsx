"use client";

import { dwIcon, generateIcon, uploadIcon } from "@/image";
import ButtonWithIcon from "@/shared/ButtonWithIcon";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { addCreator, generateDesign } from "@/network/creativeSpace";
import toast from "react-hot-toast";
import LoaderSvg from "@/shared/LoaderSvg";

export default function GenerateBox() {
  const route = useRouter();
  const [generated, setGenerated] = useState<boolean>(false);
  // const [selectedId, setSelectedId] = useState<string | null>(null);
  // const [skillNeededModal, setSkillNeededModal] = useState<boolean>(false);
  const [designId, setDesignId] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log(generatedImages);

  const handleAttach = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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

  //Handle generate
  const { mutateAsync, isPending } = useMutation({
    mutationFn: generateDesign,
  });
  const handleGenerate = async () => {
    if (prompt === "") {
      toast.error("please enter prompt");
    } else {
      setGenerated(true);
      const res = await mutateAsync({
        prompt: prompt,
      });

      if ((res && "error" in res) || (res && res.status === false)) {
        toast.error(res.message ?? "");
      } else if (res && res.data) {
        setGeneratedImages(res?.data?.images);
        setDesignId(res.data?.designId);
        if (typeof window !== "undefined") {
          localStorage.setItem("designId", res?.data?.designId);
          localStorage.setItem(
            "generatedImages",
            JSON.stringify(res?.data?.images)
          );
        }
      }
    }
  };

  //Handle add maker
  const { mutateAsync: mutateAsyncAddCreator, isPending: isPendingAddCreator } =
    useMutation({
      mutationFn: addCreator,
    });
  const handleAddCreator = async () => {
    const res = await mutateAsyncAddCreator({
      designId: designId,
      creator: "manufacturer",
    });

    if ((res && "error" in res) || (res && res.status === false)) {
      toast.error(res.message ?? "");
    } else if (res && res.data) {
      route.push("/additional-information-1");
    }
  };

  if (!generated) {
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
          <div className="flex justify-between items-center w-[100%] border border-astraSilver bg-astraGreyBg px-[3rem] py-[2rem] rounded-[1rem] mt-[5rem]">
            <div className="w-[100%]">
              <textarea
                placeholder='Enter prompt e.g. "female model wearing multi-coloured jumpsuit"'
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
                <p className="text-[1.5rem] text-astraActionGrey">Attach</p>
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
              handleClick={handleGenerate}
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
        {isPending ? (
          <div className="flex justify-center items-center py-[4rem] ">
            <LoaderSvg color="#000000" />
          </div>
        ) : (
          <div className="flex gap-x-[2rem]">
            {generatedImages.map((item, index) => (
              <Image
                key={index}
                src={item}
                alt=""
                width={220}
                height={260}
                className=""
              />
            ))}
          </div>
        )}
        <div className="mx-auto w-[max-content]">
          <ButtonWithIcon
            action="Bring Your idea To Life"
            handleClick={handleAddCreator}
            loaderColor="#ffffff"
            icon={generateIcon}
            containerStyle="bg-astraBlue w-[22rem] rounded-[.5rem] py-[1.2rem] mt-[10rem] mx-auto"
            fontStyle="text-white text-[1.5rem]"
            iconWidth="w-[2.4rem]"
            animate={isPendingAddCreator}
          />
        </div>
        {/* <SkillNeededModal
          isVisible={skillNeededModal}
          handleCancel={() => {
            setSkillNeededModal(false);
          }}
          handleProceed={handleAddCreator}
          isLoading={isPendingAddCreator}
        >
          <div>
            {[
              {
                id: 1,
                title: "Graphic Designer",
                values: "graphicsDesigner",
                description: " ",
                icon: featuredIcon,
              },
              {
                id: 2,
                title: "Fashion Illustrator",
                values: "fashionIllustrator",
                description: " ",
                icon: featuredIcon,
              },
              {
                id: 3,
                title: "Tech Pack Designer",
                values: "techPackDesigner",
                description: " ",
                icon: featuredIcon,
              },
              {
                id: 4,
                title: "Manufacture a Sample",
                values: "manufacturer",
                description:
                  "Find a tailor or manufacturer to make a sample made",
                icon: featuredIcon,
              },
            ].map((item) => (
              <div
                key={item.id}
                className={`flex justify-between items-center p-[1.6rem] rounded-[1.2rem] border mt-[2rem] ${
                  selectedId === item.values
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedId(item.values)}
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
                {selectedId === item.values && (
                  <Image
                    src={tickedIcon}
                    alt="Selected"
                    width={24}
                    height={24}
                  />
                )}
              </div>
            ))}
          </div>
        </SkillNeededModal> */}
      </div>
    );
  }
}
