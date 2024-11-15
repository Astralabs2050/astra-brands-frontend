"use client";
import { blueWarning, writeWithAi } from "@/image";
import Button from "@/shared/Button";
import ButtonWithIcon from "@/shared/ButtonWithIcon";
import CustomRadioButtonGroup from "@/shared/CustomRadioButtons";
import JobFrame from "@/shared/JobFrame";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useMutation } from "@tanstack/react-query";
import { createJob } from "@/network/creativeSpace";
import toast from "react-hot-toast";

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

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [formatedDate, setFormatedDate] = useState<string>("");

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
    if (newDate) {
      const formattedDate = newDate.format("MM/DD/YYYY");
      setFormatedDate(formattedDate);
    }
  };

  const [selectedOption3, setSelectedOption3] = useState<string>("");
  const [designId, setDesignId] = useState<string>("");
  const yesOrNo = ["Yes", "No"];
  useEffect(() => {
    if (typeof window !== "undefined") {
      const desID = localStorage.getItem("designId");
      setDesignId(desID ?? "");
    }
  }, []);

  //Create Job
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createJob,
  });
  const handleCreateJob = async () => {
    const res = await mutateAsync({
      designId: designId,
      description: text,
      manufacturer: selectedOption3 === "Yes" ? true : false,
      timeline: formatedDate,
    });
    if ((res && "error" in res) || (res && res.status === false)) {
      toast.error(res.message ?? "");
    } else if (res && res.data) {
      route.push("/job-confirmation");
      if (typeof window !== "undefined") {
        localStorage.removeItem("designId");
        localStorage.removeItem("generatedImages");
      }
    }
  };
  return (
    <JobFrame
      title="Create a Job"
      description=""
      pageNumber="3/3"
      link="/additional-information-2"
    >
      <div className="mt-[7rem] mx-[5rem]">
        <p className="text-[1.7rem] mb-[3rem]">
          Select the Timeline for your different created jobs.*
        </p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            className="w-[50rem] text-[1.4rem]"
          />
        </LocalizationProvider>
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
            handleClick={handleCreateJob}
            animate={isPending}
            isDisabled={isPending}
            fontSize="text-[1.3rem] font-bold"
            rounded
          />
        </div>
      </div>
    </JobFrame>
  );
}
