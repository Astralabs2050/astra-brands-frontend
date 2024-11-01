"use client";
import {
  applicationIcon,
  chatIcon,
  deleteIcon,
  designSample1,
  designSample2,
  designSample3,
  detailsIcon,
  mintIcon,
  optionsIcon,
  piecesIcon,
  reportIcon,
} from "@/image";
import ButtonWithIcon from "@/shared/ButtonWithIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Designs({
  name,
  numberOfPiece,
  image,
  status,
}: {
  name: string;
  numberOfPiece: number;
  image: string;
  status: string;
}) {
  const [popUp, setPopup] = useState<boolean>(false);
  const route = useRouter();
  return (
    <div
      className="p-[1.4rem] rounded-[1rem] w-[max-content] border"
      onClick={() => setPopup(false)}
    >
      <Image src={image} width={230} height={260} alt="design sample" />
      <div className="flex justify-between items-center mt-[2rem]">
        <div>
          <p className="text-[1.8rem] font-bold ">{name}</p>
          <div className="flex gap-x-[.6rem] items-center">
            <Image src={piecesIcon} width={15} height={15} alt="" />
            <p className="text-[1.2rem]">{numberOfPiece} Pieces</p>
          </div>
        </div>
        <div className="flex relative">
          <Image
            src={optionsIcon}
            width={24}
            height={24}
            alt=""
            onClick={(e) => {
              e.stopPropagation();
              setPopup(true);
            }}
            className="cursor-pointer"
          />{" "}
          {popUp && (
            <div className="bg-white w-[27rem] absolute z-50 left-0 rounded-[10px] px-[3rem] py-[1.5rem] flex flex-col gap-y-[3rem]">
              <div className="flex gap-x-[1.5rem] items-center cursor-pointer">
                <div>
                  <Image src={detailsIcon} alt="" height={20} width={20} />
                </div>
                <p className="text-[1.3rem]  font-bold">View job details</p>
              </div>
              <div className="flex gap-x-[1.5rem] items-center cursor-pointer">
                <div>
                  <Image src={mintIcon} alt="" height={20} width={20} />
                </div>
                <p className="text-[1.3rem]  font-bold">Mint as NFT</p>
              </div>
              {status === "created" && (
                <div className="flex gap-x-[1.5rem] items-center mb-[3rem] cursor-pointer">
                  <div>
                    <Image src={deleteIcon} alt="" height={18} width={18} />
                  </div>
                  <p className="text-[1.3rem] text-astraRed font-bold">
                    Delete Job
                  </p>
                </div>
              )}
              {status === "ongoing" && (
                <div className="flex gap-x-[1.5rem] items-center mb-[3rem] cursor-pointer">
                  <div>
                    <Image src={reportIcon} alt="" height={18} width={18} />
                  </div>
                  <p className="text-[1.3rem] text-astraRed font-bold">
                    Report an issue
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {status === "created" && (
        <ButtonWithIcon
          action="View Applicants"
          handleClick={() => {
            route.push("/applicants");
          }}
          loaderColor="#ffffff"
          icon={applicationIcon}
          containerStyle="bg-white rounded-[.8rem] py-[1.2rem] mt-[2rem] w-[100%] border border-black"
          fontStyle="text-black text-[1.3rem]"
          iconWidth="w-[1.9rem]"
        />
      )}
      {status === "ongoing" && (
        <ButtonWithIcon
          action="Open Conversation"
          handleClick={() => {
            route.push("/messages");
          }}
          loaderColor="#ffffff"
          icon={chatIcon}
          containerStyle="bg-white rounded-[.8rem] py-[1.2rem] mt-[2rem] w-[100%] border border-black"
          fontStyle="text-black text-[1.3rem]"
          iconWidth="w-[1.9rem]"
        />
      )}
    </div>
  );
}

export default function DesignBox() {
  const [category, setCategory] = useState<string>("");

  return (
    <div className="w-[100%] p-[4rem]">
      <div className="flex items-center gap-x-[2rem] mt-[5rem]">
        <p
          className={`text-[1.6rem] flex items-center justify-center px-auto py-[1.2rem] rounded-full font-[500] cursor-pointer  min-w-[14rem] ${
            category === "created"
              ? "bg-astraSilver text-black"
              : "text-astraTextGrey"
          }`}
          onClick={() => setCategory("created")}
        >
          Created Jobs
        </p>
        <p
          className={`text-[1.6rem] flex items-center justify-center px-[1.8rem] py-[1.2rem] rounded-full font-[500] cursor-pointer  min-w-[14rem] ${
            category === "ongoing"
              ? "bg-astraSilver text-black"
              : "text-astraTextGrey"
          }`}
          onClick={() => setCategory("ongoing")}
        >
          Ongoing Jobs
        </p>
        <p
          className={`text-[1.6rem] flex items-center justify-center px-[1.8rem] py-[1.2rem] rounded-full font-[500] cursor-pointer min-w-[14rem] ${
            category === "" ? "bg-astraSilver text-black" : "text-astraTextGrey"
          }`}
          onClick={() => setCategory("")}
        >
          Minted NFTs
        </p>
      </div>
      <hr className="mt-[1.5rem] mb-[3rem]" />
      <div className="flex gap-x-[2rem]">
        {[
          {
            name: "Coloured Jumpsuits",
            numberOfPiece: 3,
            image: designSample1,
            status: "created",
          },
          {
            name: "Coloured Jumpsuits",
            numberOfPiece: 3,
            image: designSample2,
            status: "ongoing",
          },
          {
            name: "Coloured Jumpsuits",
            numberOfPiece: 3,
            image: designSample3,
            status: "minted",
          },
        ].map((item, index) => (
          <Designs
            key={index}
            name={item.name}
            image={item.image}
            numberOfPiece={item.numberOfPiece}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
}
