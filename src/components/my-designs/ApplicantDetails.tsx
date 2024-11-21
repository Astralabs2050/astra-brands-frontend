"use client";
import {
  arrowLeft,
  checkedIcon,
  dropDownIcon,
  profilePicture,
  sample1,
} from "@/image";
import Button from "@/shared/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import WalletModal from "./WalletModal";
import { useState } from "react";

export default function ApplicationDetailsBox() {
  const [walletModal, setWalletModal] = useState<boolean>(false);
  const route = useRouter();
  return (
    <div className="px-[4rem] py-[6rem] bg-astraOffWhite w-[100%]">
      <div
        className="flex gap-x-[2rem] items-center cursor-pointer"
        onClick={() => route.push("/applicants")}
      >
        <Image src={arrowLeft} alt="" height={24} width={24} />
        <div>
          <p className="text-[2.4rem] font-bold">Application Details</p>
          <p className="text-[1.8rem]">
            View creators that have applied to your created job.
          </p>
        </div>
      </div>
      <div className="mt-[5rem] bg-white py-[6rem] px-[4rem] rounded-[2rem]">
        <div className="flex justify-center mt-[-2rem]">
          <Image
            src={profilePicture}
            alt=""
            height={80}
            width={80}
            className="bg-white p-[.4rem] rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-[3.6rem] font-bold">Angeline Beier</p>
          <p className="text-[1.8rem] text-astraTextGrey">
            3D Artist, Designer
          </p>
        </div>
        <p className="text-[1.8rem] text-astraLightBlack font-bold mt-[6rem]">
          Description:
        </p>
        <p className="text-[1.8rem]">
          Takehiro is a Creative, Data-Driven, Digital Content Creator &
          Marketing Director. His passion for film, photography, music and
          design are evident in his numerous multi-media collaborations with
          Fortune 500 companies, non-profits and local businesses.
        </p>
        <p className="text-[1.8rem] text-astraLightBlack font-bold mt-[6rem]">
          Skills:
        </p>
        <div className="flex items-center py-[1rem] flex-wrap gap-[1.5rem]">
          <p className="text-[1.5rem] py-[1.4rem] px-[2rem] rounded-full text-center bg-astraBorderGrey min-w-[max-content]">
            Fashion Design
          </p>
          <p className="text-[1.5rem] py-[1.4rem] px-[2rem] rounded-full text-center bg-astraBorderGrey min-w-[max-content]">
            Fashion Design
          </p>
          <p className="text-[1.5rem] py-[1.4rem] px-[2rem] rounded-full text-center bg-astraBorderGrey min-w-[max-content]">
            Fashion Design
          </p>{" "}
          <p className="text-[1.5rem] py-[1.4rem] px-[2rem] rounded-full text-center bg-astraBorderGrey min-w-[max-content]">
            Fashion Design
          </p>
          <p className="text-[1.5rem] py-[1.4rem] px-[2rem] rounded-full text-center bg-astraBorderGrey min-w-[max-content]">
            Fashion Design
          </p>
          <p className="text-[1.5rem] py-[1.4rem] px-[2rem] rounded-full text-center bg-astraBorderGrey min-w-[max-content]">
            Fashion Design
          </p>
          <p className="text-[1.5rem] py-[1.4rem] px-[2rem] rounded-full text-center bg-astraBorderGrey min-w-[max-content]">
            Fashion Design
          </p>{" "}
          <p className="text-[1.5rem] py-[1.4rem] px-[2rem] rounded-full text-center bg-astraBorderGrey min-w-[max-content]">
            Fashion Design
          </p>
        </div>
        <p className="text-[1.8rem] text-astraLightBlack font-bold mt-[6rem] mb-[1rem]">
          View Angeline’s Projects
        </p>
        <div className="flex gap-x-[2rem]">
          <div>
            <Image
              src={sample1}
              alt=""
              height={279}
              width={245}
              className="rounded-[.5rem]"
            />
          </div>
          <div>
            <Image
              src={sample1}
              alt=""
              height={279}
              width={245}
              className="rounded-[.5rem]"
            />
          </div>
          <div>
            <Image
              src={sample1}
              alt=""
              height={279}
              width={245}
              className="rounded-[.5rem]"
            />
          </div>
        </div>
        <div className="border rounded-[2rem] mt-[6rem] bg-astraOffWhite">
          <div className="flex justify-between px-[3rem] py-[2rem] border-b">
            <p className="text-[1.6rem] font-bold">Payment Terms</p>
            <div>
              <Image src={dropDownIcon} alt="" width={22} height={22} />
            </div>
          </div>

          <div className="flex items-center justify-between p-[3rem]">
            <div>
              <p className="text-[1.6rem] font-bold">
                How much the creator is charging for this job?
              </p>
            </div>
            <div className="border bg-white rounded-full flex items-center justify-between px-[2.5rem] py-[1.5rem] w-[30rem]">
              <div>
                <input className="bg-white outline-none text-[1.6rem] text-astraLightBlack" />
              </div>

              <p className="text-[1.6rem] text-astraLightBlack font-[500]">
                $ 0.00
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-[1rem] mr-[4rem]">
            <Image src={checkedIcon} alt="" width={22} height={22} />
            <p className="text-[1.8rem] text-astraTextGrey">
              I am open to negotiations
            </p>
          </div>
          <div className="flex items-center justify-between p-[3rem]">
            <div>
              <p className="text-[1.6rem] font-bold">
                How much would you like to pay?
              </p>
              <p className="text-[1.6rem] text-astraTextGrey">
                This is the minimum amount the creator can accept for this job.
              </p>
            </div>
            <div className="border rounded-full flex items-center bg-white justify-between px-[2.5rem] py-[1.5rem] w-[30rem]">
              <div>
                <input className="bg-white outline-none text-[1.6rem] text-astraLightBlack" />
              </div>
              <p className="text-[1.6rem] text-astraLightBlack font-[500]">
                $ 0.00
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-[2rem] ml-[3rem] mb-[4rem]">
            <Button
              action="Accept Terms"
              fontSize="text-[1.2rem]"
              width="w-[20rem]"
              handleClick={() => setWalletModal(true)}
              rounded
            />
            <Button
              action="Decline Terms"
              fontSize="text-[1.2rem]"
              width="w-[20rem] border-astraRed"
              handleClick={() => route.push("/applicants")}
              inverse
              rounded
              textColor="text-astraRed"
              borderColor="border-astraRed"
            />
          </div>
        </div>
      </div>
      <WalletModal
        isVisible={walletModal}
        handleCancel={() => setWalletModal(false)}
        handleProceed={() => {}}
      >
        <div className="p-[2rem] border rounded-[1.4rem] my-[2.4rem]">
          <p className="text-[1.8rem] text-astraTextGrey mb-[1rem]">
            Timeline: 22nd November, 2024
          </p>
          <p className="text-[1.8rem] text-astraTextGrey">
            Amount to pay: $500
          </p>
        </div>
      </WalletModal>
    </div>
  );
}
