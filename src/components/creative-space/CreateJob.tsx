"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import JobFrame from "@/shared/JobFrame";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useMutation } from "@tanstack/react-query";
import { createJob } from "@/network/creativeSpace";
import { Dayjs } from "dayjs";
import toast from "react-hot-toast";
import { ConnectButton, useCurrentWallet } from "@mysten/dapp-kit";
import Image from "next/image";
import { logo } from "@/image";
import { useMintNFT } from "./MintNFT";

export default function CreateAJob() {
  const route = useRouter();

  const [mintUi, setMintUi] = useState<boolean>(true);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const maxChars = 1000;
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    if (target.value.length <= maxChars) {
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
    }
  };

  const jobDetails = useFormik<{
    designId: string;
    prompt: string;
    outfitName: string;
    quantity: number;
    budget: number;
    description: string;
  }>({
    initialValues: {
      designId: "",
      prompt: "",
      outfitName: "",
      quantity: 0,
      budget: 0,
      description: "",
    },
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: () => {
      route.push("/additional-information-2");
    },
  });

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [formatedDate, setFormatedDate] = useState<string>("");

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
    if (newDate) {
      const formattedDate = newDate.format("MM/DD/YYYY");
      setFormatedDate(formattedDate);
    }
  };

  //Restore values when reloaded
  useEffect(() => {
    if (typeof window !== "undefined") {
      const designId = localStorage.getItem("designId");
      const prompt = localStorage.getItem("prompt");
      const generatedDesigns = localStorage.getItem("generatedImages");
      if (generatedDesigns) {
        const designData = JSON.parse(generatedDesigns);
        setGeneratedImages(designData);
      }
      if (designId && prompt) {
        jobDetails.setFieldValue("designId", designId);
        jobDetails.setFieldValue("prompt", prompt);
      }
    }
  }, []);

  //Create Job
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createJob,
  });
  const handleCreateJob = async () => {
    try {
      const res = await mutateAsync({
        designId: jobDetails.values.designId,
        description: jobDetails.values.description,
        //Update this from the backend
        manufacturer: true,
        timeline: formatedDate,
      });
      if ((res && "error" in res) || (res && res.status === false)) {
        toast.error(res.message ?? "");
      } else if (res && res.data) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("designId");
          localStorage.removeItem("generatedImages");
          localStorage.removeItem("storedJob");
          localStorage.removeItem("prompt");
        }
      }
      await mintNFT({
        designId: jobDetails.values.designId,
        designName: jobDetails.values.outfitName,
        fabricType: "default", // Update as needed
        designImage: generatedImages[0], // First generated image
        prompt: jobDetails.values.prompt,
      });

      // Show success toast for minting
      toast.success("Minted Successfully");
      route.push("/job-confirmation");
    } catch (error) {
      // Handle errors for both Create Job and Mint NFT
      console.error(error);
      toast.error("An error occurred while processing your request.");
    }
  };

  const { mintNFT } = useMintNFT();
  const wallet = useCurrentWallet();

  return (
    <>
      {mintUi ? (
        <div className="bg-astraOffWhite">
          <div className="px-[5rem] pt-[3rem] pb-[4rem]">
            <Image src={logo} alt="logo" height={30} width={150} />
          </div>
          <div className="bg-white w-[80%] mx-auto px-[4rem] py-[5rem] rounded-[2rem]">
            <p className="text-[3rem] font-bold text-center ">CONNECT WALLET</p>
            <p className="text-center text-[1.6rem] w-[70%] mx-auto">
              Before proceeding to create a job, we need to connect to your SUI
              wallet to turn you designs to NFTs. <br />
              To do that, click on the button below and click on the SUI logo
              from the pop up that appears.
            </p>

            <div className="flex justify-end mb-8 border w-[max-content] mx-auto p-[1rem] mt-[3rem]">
              <ConnectButton />
            </div>
            {wallet.isConnected && (
              <div className="w-[max-content] mx-auto">
                <Button
                  action="Proceed"
                  width="w-[25rem]"
                  handleClick={() => setMintUi(false)}
                  fontSize="text-[1.3rem] font-bold"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <JobFrame
          title="Additional information"
          description="Enter more information for a maker to turn your AI design into a real outfit"
          link="/generate-designs"
        >
          <div>
            <div className="flex gap-x-[2rem] w-[max-content] mx-auto mt-[7rem]">
              {generatedImages &&
                generatedImages.map((item, index) => (
                  <img key={index} src={item} alt="" width={220} height={260} />
                ))}
            </div>
            <div className="mt-[5rem]">
              <div className="w-[80%] mx-auto">
                <p className="text-[1.5rem] pb-[.5rem]">Name of Outfit</p>
                <InputField
                  type="text"
                  error={null}
                  placeholder="Give your look a name"
                  name="outfitName"
                  value={jobDetails.values.outfitName}
                  borderRadius="rounded-full"
                  fontSize="text-[1.8rem]"
                  onChange={jobDetails.handleChange}
                  onBlur={jobDetails.handleBlur}
                />
                <div className="flex justify-between mt-[1rem] w-[100%]">
                  <div className="w-[48%]">
                    <p className="text-[1.5rem] pb-[.5rem]">
                      How many pieces of this design will you make?
                    </p>
                    <InputField
                      type="text"
                      error={null}
                      placeholder="Enter number of pieces"
                      borderRadius="rounded-full"
                      fontSize="text-[1.5rem]"
                      value={jobDetails.values.quantity}
                      name="quantity"
                      onChange={jobDetails.handleChange}
                    />
                  </div>
                  <div className="w-[48%]">
                    <p className="text-[1.5rem] pb-[.5rem]">
                      Enter Budget per Piece
                    </p>
                    <InputField
                      type="text"
                      error={null}
                      placeholder="$ 1.00"
                      borderRadius="rounded-full"
                      fontSize="text-[1.5rem]"
                      value={jobDetails.values.budget}
                      name="budget"
                      onChange={jobDetails.handleChange}
                    />
                  </div>
                </div>
                <p className="text-[1.5rem] mb-[1rem]">
                  Select the timeline for job completion.*
                </p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="w-[100%] text-[1.4rem]"
                  />
                </LocalizationProvider>
              </div>
              <div className="w-[80%] mx-auto">
                <p className="text-[1.5rem] mb-[1rem] mt-[4rem]">
                  Job Description*
                </p>
                <div className="border border-astraTextGrey rounded-[1rem] p-[3rem]">
                  <textarea
                    placeholder="Write a short description about the work"
                    className="text-[1.5rem] w-[90%] bg-transparent outline-none resize-none overflow-hidden"
                    rows={2}
                    value={jobDetails.values.prompt}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex justify-center gap-x-[2rem] items-center mt-[5rem]">
                <Button
                  action="Cancel"
                  width="w-[25rem]"
                  handleClick={() => {
                    route.push("/dashboard");
                    if (typeof window !== "undefined") {
                      localStorage.removeItem("designId");
                      localStorage.removeItem("generatedImages");
                      localStorage.removeItem("storedJob");
                      localStorage.removeItem("prompt");
                    }
                  }}
                  fontSize="text-[1.3rem] font-bold"
                  inverse
                  rounded
                />
                <Button
                  action="Create Job"
                  width="w-[25rem]"
                  //   handleClick={handleCreateJob}
                  handleClick={handleCreateJob}
                  animate={isPending}
                  isDisabled={isPending}
                  fontSize="text-[1.3rem] font-bold"
                  rounded
                />
              </div>
            </div>
          </div>
        </JobFrame>
      )}
    </>
  );
}
