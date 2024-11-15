"use client";

import { clotheTemplate, cloudIcon } from "@/image";
import { additionalInformation } from "@/network/creativeSpace";
import Button from "@/shared/Button";
import JobFrame from "@/shared/JobFrame";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateJobTwo() {
  const route = useRouter();
  const [previews, setPreviews] = useState<string[]>(["", "", ""]);
  const handleFileChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prevPreviews) => {
            const updatedPreviews = [...prevPreviews];
            updatedPreviews[index] = reader.result as string;
            return updatedPreviews;
          });
        };
        reader.readAsDataURL(file);
      }
    };

  const [uploadedImages, setUploadedImages] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const labels = ["Front View", "Side View 1", "Side View 2", "Back View"];

  const handleImageChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages[index] = reader.result as string;
            return updatedImages;
          });
        };
        reader.readAsDataURL(file);
      }
    };

  console.log(previews[0], uploadedImages[0]);
  console.log(uploadedImages[0]?.length);

  const {
    mutateAsync: mutateAsync,
    isPending: isPendingAdditionalInformation,
  } = useMutation({
    mutationFn: additionalInformation,
  });
  const handleNext = async () => {
    if (typeof window !== "undefined") {
      const jobData = JSON.parse(localStorage.getItem("storedJob") || "{}");
      const designId = localStorage.getItem("designId");
      const imageData = uploadedImages.map((image, index) => ({
        image,
        view: labels[index].toLowerCase().replace(" ", ""),
      }));
      const prints = previews
        .filter((preview) => preview !== "")
        .map((preview) => ({
          image: preview,
        }));

      const updatedJobData = {
        ...jobData,
        designId,
        data: {
          ...jobData.data,
          outfitName: jobData.data?.outfitName,
          pieceNumber: jobData.data?.pieceNumber,
          pieces: jobData.data?.pieces || [],
          imageData,
          prints,
        },
      };
      const res = await mutateAsync(updatedJobData);
      if ((res && "error" in res) || (res && res.status === false)) {
        toast.error(res.message ?? "");
      } else if ((res && res.data) || res.status === true) {
        route.push("/additional-information-3");
        if (typeof window !== "undefined") {
          localStorage.removeItem("storedJob");
        }
      }
    }
  };

  return (
    <JobFrame
      title="Any sketches or samples?"
      description="Uploading sketches/samples would help your Manufacturer or Tailor"
      pageNumber="2/3"
      link="/additional-information-1"
    >
      <div className="mt-[7rem] mx-[5rem]">
        <div className="flex justify-between gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center border border-dashed p-[2rem] rounded-[.8rem] cursor-pointer"
            >
              <label
                htmlFor={`imageUpload${idx}`}
                className="text-center mx-auto"
              >
                <p>{labels[idx]}</p>
                {uploadedImages[idx] ? (
                  <Image
                    src={uploadedImages[idx]}
                    alt={`${labels[idx]} Image`}
                    className="w-[150px] h-[250px] object-cover"
                    width={150}
                    height={250}
                  />
                ) : (
                  <>
                    <Image
                      src={clotheTemplate}
                      alt=""
                      width={150}
                      height={250}
                    />
                  </>
                )}
              </label>
              <input
                id={`imageUpload${idx}`}
                type="file"
                accept="image/*"
                onChange={handleImageChange(idx)}
                className="hidden"
              />
            </div>
          ))}
        </div>
        <div className="border px-[5rem] py-[3rem] rounded-[2rem] my-[5rem]">
          <p className="text-[2rem]">Do you have any pre-designed prints?</p>
          <hr className="mt-[1.4rem] mb-[3rem]" />
          <div className="flex justify-between">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx}>
                <label
                  htmlFor={`previewImage${idx}`}
                  className="cursor-pointer text-center mx-auto"
                >
                  {previews[idx] ? (
                    <div className="mb-[1rem]">
                      <Image
                        src={previews[idx]}
                        alt={`Preview ${idx + 1}`}
                        className="w-[18rem] h-[18rem] object-cover mx-auto"
                        width={196}
                        height={196}
                      />
                    </div>
                  ) : (
                    <div className="border border-dashed bg-astraGreyBg p-[1rem] cursor-pointer min-w-[28rem]">
                      <div className="w-[max-content] mx-auto">
                        <Image src={cloudIcon} alt="" width={30} height={30} />
                      </div>
                      <p className="text-astraLightBlack text-[1.4rem] text-center">
                        Drag and Drop .JPEG File
                      </p>
                      <p className="text-astraGrey text-[1.4rem] text-center">
                        or
                      </p>
                      <p className="text-black text-[1.4rem] text-center underline">
                        Upload from Device
                      </p>
                    </div>
                  )}
                </label>
                <input
                  id={`previewImage${idx}`}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange(idx)}
                  className="hidden"
                />
              </div>
            ))}
          </div>
        </div>
        <Button
          width="w-[50%] mx-auto"
          action="Create a Physical Version"
          fontSize="text-[1.5rem]"
          handleClick={handleNext}
          animate={isPendingAdditionalInformation}
          isDisabled={isPendingAdditionalInformation}
          rounded
        />
      </div>
    </JobFrame>
  );
}
