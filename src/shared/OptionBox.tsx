import { jobTick } from "@/image";
import Image from "next/image";
interface OptionBoxProps {
  text: string;
  ticked: boolean;
  onClick: () => void;
}

export default function OptionBox({ text, ticked, onClick }: OptionBoxProps) {
  return (
    <div
      className={`px-auto py-[1.8rem] flex justify-center items-center w-[16rem] gap-x-[.6rem] rounded-[.5rem]  cursor-pointer ${
        ticked ? "bg-astraSilver" : "bg-white border border-black"
      }`}
      onClick={onClick}
    >
      <p className="text-[1.2rem] text-black text-center">{text}</p>
      {ticked && (
        <div>
          <Image src={jobTick} alt="" width={24} height={24} />
        </div>
      )}
    </div>
  );
}
