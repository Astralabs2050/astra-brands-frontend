import {
  paperClipIcon,
  paymentIcon,
  profilePicture,
  searchIcon,
} from "@/image";
import Image from "next/image";

export default function MessageFrame() {
  return (
    <div className="flex w-[100%] bg-white">
      <div className="w-[25%] px-[2rem] py-[4rem] border-r">
        <div className="px-[2rem] py-[1.6rem] rounded-full border flex items-center justify-between w-[100%]">
          <input
            placeholder="Search Messages"
            className="text-[1.6rem] bg-transparent outline-none"
          />
          <Image src={searchIcon} alt="" width={24} height={24} />
        </div>
        <div className="mt-[3rem]">
          <div className="bg-astraGreyBg rounded-[1rem] py-[1.5rem] px-[2rem] mb-[2rem]">
            <div className="flex items-center justify-between ">
              <p className="text-[1.5rem]">Takehiro Tomiyasu</p>
              <p className="text-[1.5rem] text-astraTextGrey">2:28PM</p>
            </div>
            <p className="text-[1.5rem] text-black font-bold mt-[.8rem] mb-[1rem]">
              AstroWRLD Summer II
            </p>
            <p className="text-[1.5rem] text-astraTextGrey">
              Hey Tomiyasu, I would like to develop 3D images of the following
              attached pdf files...
            </p>
          </div>
          <div className="rounded-[1rem] py-[1.5rem] px-[2rem] mb-[2rem]">
            <div className="flex items-center justify-between ">
              <p className="text-[1.5rem]">Takehiro Tomiyasu</p>
              <p className="text-[1.5rem] text-astraTextGrey">2:28PM</p>
            </div>
            <p className="text-[1.5rem] text-black font-bold mt-[.8rem] mb-[1rem]">
              AstroWRLD Summer II
            </p>
            <p className="text-[1.5rem] text-astraTextGrey">
              Hey Tomiyasu, I would like to develop 3D images of the following
              attached pdf files...
            </p>
          </div>
        </div>
      </div>
      <div className="w-[75%] flex flex-col justify-between">
        <div className="flex items-center justify-between px-[3.2rem] py-[1.6rem] border-b">
          <div className="flex items-center ">
            <Image
              src={profilePicture}
              alt=""
              width={56}
              height={56}
              className="rounded-full mr-[1.2rem]"
            />
            <div>
              <p className="font-bold text-[1.8rem]">Takehiro Tomiyasu</p>
              <p className="text-[1.4rem]">3D Artist, Designer</p>
            </div>
          </div>
          <div className="flex px-[2rem] py-[1rem] items-center bg-[radial-gradient(44.96%_391.37%_at_49.64%_50%,_#3F37C9_2.67%,_#4361EE_100%)] rounded-full w-[max-content]">
            <Image
              src={paymentIcon}
              alt=""
              width={24}
              height={24}
              className="rounded-full mr-[1.2rem]"
            />
            <p className="text-[1.8rem] text-white">$500</p>
          </div>
        </div>
        <div className="flex items-center gap-x-[2rem] px-[3rem] py-[4rem] ">
          <div>
            <Image src={paperClipIcon} alt="" width={24} height={24} />
          </div>
          <div className="px-[2rem] py-[1.6rem] rounded-[1rem] bg-astraGreyBg flex items-center justify-between w-[100%]">
            <textarea
              placeholder="Type a message..."
              className="text-[1.4rem] bg-transparent outline-none w-[100%]"
            />
            <button className="border rounded-full text-[1.4rem] py-[1.5rem] px-[1.2rem] border-black min-w-[max-content]">
              Milestone Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
