"use client";

import {
  myDesignsOne,
  myDesignsThree,
  myDesignsTwo,
  zeroGraphState,
} from "@/image";
import { getUserDetails } from "@/network/auth";
import { Query } from "@/network/constant";
import Button from "@/shared/Button";
import LoaderSvg from "@/shared/LoaderSvg";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BrandDashboard() {
  const route = useRouter();
  const { data, isPending } = useQuery({
    queryFn: getUserDetails,
    queryKey: [Query.GET_USER_INFO_QUERY],
  });

  const userData =
    data && data.status === true && !("error" in data) ? data.data : null;

  if (isPending) {
    return (
      <div className="flex justify-center items-center w-[100%]">
        <LoaderSvg color="#000000" />
      </div>
    );
  }

  return (
    <div className="w-[100%] p-[7rem]">
      <div className="flex flex-col justify-center items-center">
        <p className="text-center w-[max-content] text-[3rem]">
          Hello,{" "}
          <span className="text-[3rem] bg-[radial-gradient(44.96%_391.37%_at_49.64%_50%,_#3F37C9_2.67%,_#4361EE_100%)] inline-block text-transparent bg-clip-text leading-none">
            {userData && userData?.brand?.username}
          </span>
        </p>
        <p className="text-center w-[max-content] text-[1.6rem] text-astraTextGrey">
          Welcome to your Dashboard!
        </p>
      </div>
      <div className="p-[1.5rem]">
        <p className="text-[2rem]">Analytics</p>
        <p className="text-[1.8rem] text-astraLightBlack">
          Your key stats for the{" "}
          <span className="text-black text-[1.8rem]">last 30 days</span>
        </p>
        <div className="mt-[2.5rem] flex gap-x-[4rem]">
          {[
            { title: "Total Sales", value: "$0.00" },
            { title: "Total Orders", value: "0" },
            { title: "Impressions", value: "0" },
          ].map((item, index) => (
            <div
              key={index}
              className="border border-astraGrey rounded-[1.5rem] w-[28rem] p-[1.6rem] "
            >
              <p className="text-[1.6rem] mb-[1.4rem]">{item.title}</p>
              <p className="text-[2.4rem] font-bold">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-[4rem]">
          <div className="flex justify-between">
            <p className="text-[2rem]">Sales History</p>
            <div className="flex items-center gap-x-[1.5rem]">
              <p className="text-[1.5rem]">Day</p>
              <p className="text-[1.5rem]">Week</p>
              <p className="text-[1.5rem]">Month</p>
            </div>
          </div>
          <div className="w-[100%] mt-[3rem]">
            <Image
              src={zeroGraphState}
              alt=""
              width={500}
              height={500}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
        <div className="border rounded-[2.4rem] border-astraSilver flex flex-col items-start justify-center py-[18rem] mt-[3rem]">
          <p className="text-[2rem] text-astraLightBlack text-center mb-[2rem] mx-auto">
            You do not have any uploaded oufits.{" "}
          </p>
          <Button
            action="Upload New Design"
            width="w-[18rem] mx-auto"
            handleClick={() => {
              route.push("my-creative-space");
            }}
            fontSize="text-[1.6rem]"
            rounded
            inverse
          />
        </div>
        <div className="border rounded-[2.4rem] border-astraSilver mt-[3rem] p-[3rem]">
          <div className="flex justify-between items-center mb-[3rem]">
            <p className="text-[2rem]">My Designs</p>
            <p
              className="text-[1.8rem] underline cursor-pointer"
              onClick={() => route.push("/my-designs")}
            >
              View all
            </p>
          </div>
          <div className="flex justify-between">
            {[
              {
                image: myDesignsThree,
                title: "Coloured Jumpsuits",
                pieces: 3,
                price: "50£ ≈ 0.132 ASTRA",
              },
              {
                image: myDesignsOne,
                title: "Mask",
                pieces: 3,
                price: "50£ ≈ 0.132 ASTRA",
              },
              {
                image: myDesignsTwo,
                title: "Coloured Jumpsuits",
                pieces: 3,
                price: "50£ ≈ 0.132 ASTRA",
              },
              {
                image: myDesignsTwo,
                title: "Coloured Jumpsuits",
                pieces: 3,
                price: "50£ ≈ 0.132 ASTRA",
              },
            ].map((item, index) => (
              <div key={index} className="w-[21rem] rounded-[.8rem] border">
                <Image
                  src={item.image}
                  alt=""
                  width={500}
                  height={500}
                  style={{ width: "100%", height: "auto" }}
                  className="rounded-tr-[.8rem] rounded-tl-[.8rem]"
                />
                <div className="px-[1.2rem] py-[1rem]">
                  <p className="text-[1.1rem]">{item.title}</p>
                  <p className="text-[1.1rem] text-astraLightBlack my-[.5rem]">
                    {item.pieces} Pieces
                  </p>
                  <p className="text-[1.1rem] ml-auto text-right">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
