import { arrowLeft } from "@/image";
import Image from "next/image";
import Link from "next/link";

export default function GoBack({ link }: { link: string }) {
  return (
    <Link href={link} passHref>
      <div className="flex gap-x-[1rem]">
        <Image src={arrowLeft} alt="" height={24} width={24} />
        <p className="text-[1.6rem] font-bold">Go Back</p>
      </div>
    </Link>
  );
}
