import { authRight } from "@/image";
import Image from "next/image";

export default function AuthRight() {
  return (
    <div className="w-[100%]">
      <Image
        src={authRight}
        alt=""
        height={500}
        width={500}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
