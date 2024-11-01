"use client";

import { chartIcon, dropDown, outFitSample, refreshIcon } from "@/image";
import ButtonWithIcon from "@/shared/ButtonWithIcon";
import Image from "next/image";

export default function StoreBox() {
  return (
    <div className="w-[100%] py-[4rem] px-[6rem]">
      <p className="font-bold text-[3.2rem] text-center">Analytics</p>
      <p className="text-[1.8rem] text-center text-astraLightBlack">
        Get an idea of how well your looks are doing in Astra
      </p>
      <div className="flex gap-x-[2rem] mt-[5rem] items-center">
        {[
          { name: "Total Outfits sold", value: 3086 },
          { name: "Views this month", value: 8235 },
        ].map((item, index) => (
          <div key={index} className="border p-[2rem] rounded-[1rem]">
            <p className="text-[1.4rem] text-astraLightBlack">{item.name}</p>
            <div className=" flex gap-x-[5rem] mt-[2rem]">
              <p className="text-[3.2rem] font-bold">
                {item.value.toLocaleString()}
              </p>
              <Image src={chartIcon} alt="" height={50} width={150} />
            </div>
          </div>
        ))}
        <div className="w-[22rem]">
          <p className="text-[1.6rem] font-bold text-astraLightBlack mb-[.5rem]">
            Insights:
          </p>
          <p className="text-[1.4rem]">
            During this 30 day period, you earned{" "}
            <span className="text-[1.4rem] font-bold">428 impressions</span> per
            day
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-[8rem] mb-[3rem]">
        <div className=" flex items-center gap-x-[1.6rem]">
          <div className="p-[1.4rem] flex gap-x-[3.5rem] border rounded-[.8rem] w-[max-content]">
            <p className="text-[1.6rem] text-astraLightBlack">Most Tried On</p>
            <Image src={dropDown} alt="" height={16} width={16} />
          </div>
          <div className="p-[1.4rem] flex gap-x-[3.5rem] border rounded-[.8rem] w-[max-content]">
            <p className="text-[1.6rem] text-astraLightBlack">This Month</p>
            <Image src={dropDown} alt="" height={16} width={16} />
          </div>
        </div>
        <ButtonWithIcon
          action="Refresh"
          handleClick={() => {}}
          loaderColor="#ffffff"
          icon={refreshIcon}
          containerStyle="bg-white rounded-[.8rem] p-[1.5rem] w-[12rem] border border-astraBorderGrey"
          fontStyle="text-astraLightBlack text-[1.3rem]"
          iconWidth="w-[2.4rem]"
        />
      </div>
      <div className="flex text-[1.5rem] border-b pb-[.8rem] mb-[1rem]">
        <p className="text-[1.5rem] text-astraLightBlack font-bold min-w-[12rem] px-[1rem]">
          Outfit ID
        </p>
        <p className="text-[1.5rem] text-astraLightBlack font-bold min-w-[26rem] px-[1rem]">
          Name of outfit
        </p>
        <p className="text-[1.5rem] text-astraLightBlack font-bold min-w-[20rem] px-[1rem]">
          Outfit Price (ASTRAS)
        </p>
        <p className="text-[1.5rem] text-astraLightBlack font-bold min-w-[15rem] px-[1rem]">
          User Email
        </p>
        <p className="text-[1.5rem] text-astraLightBlack font-bold min-w-[14rem] px-[1rem]">
          Try on count
        </p>
        <p className="text-[1.5rem] text-astraLightBlack font-bold px-[1rem]">
          Buy count
        </p>
      </div>
      {[
        {
          id: "#AST12345",
          image: outFitSample,
          name: "Urban Ember",
          pieces: 3,
          price: 825.78,
          email: "kronos888@hotm...",
          tryOnCount: 2,
          buyCount: 0,
        },
        {
          id: "#AST12345",
          image: outFitSample,
          name: "Urban Ember",
          pieces: 3,
          price: 825.78,
          email: "kronos888@hotm...",
          tryOnCount: 2,
          buyCount: 0,
        },
        {
          id: "#AST12345",
          image: outFitSample,
          name: "Urban Ember",
          pieces: 3,
          price: 825.78,
          email: "kronos888@hotm...",
          tryOnCount: 2,
          buyCount: 0,
        },
        {
          id: "#AST12345",
          image: outFitSample,
          name: "Urban Ember",
          pieces: 3,
          price: 825.78,
          email: "kronos888@hotm...",
          tryOnCount: 2,
          buyCount: 0,
        },
        {
          id: "#AST12345",
          image: outFitSample,
          name: "Urban Ember",
          pieces: 3,
          price: 825.78,
          email: "kronos888@hotm...",
          tryOnCount: 2,
          buyCount: 0,
        },
      ].map((item, index) => (
        <div
          key={index}
          className="flex border-b pb-[1rem] pt-[2rem] items-center"
        >
          <p className="text-[1.5rem] text-black min-w-[12rem] px-[1rem]">
            {item.id}
          </p>
          <div className="flex items-center gap-x-[1rem] min-w-[26rem] px-[1rem]">
            <Image src={item.image} alt="" height={60} width={60} />
            <div>
              <p className="text-[1.5rem] ">{item.name}</p>
              <p className="text-[1.3em] mt-[.5rem] text-astraLightBlack">
                No. of Piece: {item.pieces} Pieces
              </p>
            </div>
          </div>
          <p className="text-[1.5rem] text-black min-w-[20rem] px-[1rem]">
            {item.price}
          </p>
          <p className="text-[1.5rem] text-black min-w-[15rem] px-[1rem]">
            {item.email}
          </p>
          <p className="text-[1.5rem] text-black min-w-[14rem] px-[1rem]">
            {item.tryOnCount}
          </p>
          <p className="text-[1.5rem] text-black px-[1rem]">{item.buyCount}</p>
        </div>
      ))}
    </div>
  );
}
