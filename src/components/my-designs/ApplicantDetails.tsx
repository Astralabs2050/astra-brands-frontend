"use client";
import { arrowLeft, dropDownIcon, profilePicture, sample1 } from "@/image";
import Button from "@/shared/Button";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import WalletModal from "./WalletModal";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { acceptOrReject, getSingleApplicant } from "@/network/myDesigns";
import { Query } from "@/network/constant";
import LoaderSvg from "@/shared/LoaderSvg";
import toast from "react-hot-toast";

export default function ApplicationDetailsBox() {
  const [walletModal, setWalletModal] = useState<boolean>(false);
  const route = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const userId = searchParams.get("userId");
  const { data, isPending } = useQuery({
    queryFn: () => getSingleApplicant(jobId ?? "", userId ?? ""),
    queryKey: [Query.VIEW_SINGLE_APPLICANT_QUERY],
  });
  const applicant =
    data && data.status === true && !("error" in data) ? data.data : null;

  const { mutateAsync, isPending: isPendingAcceptOrReject } = useMutation({
    mutationFn: acceptOrReject,
  });
  const [acceptOrRejectLoader, setAcceptOrRejectLoader] = useState<string>("");

  const handleAccept = async () => {
    setAcceptOrRejectLoader("accept");
    const res = await mutateAsync({
      jobApplicationId: applicant?.id ?? "",
      status: true,
    });
    if ((res && "error" in res) || (res && res.status === false)) {
      toast.error(res.message ?? "");
    } else {
      toast.success(res.message);
      setWalletModal(true);
    }
  };

  const handleReject = async () => {
    setAcceptOrRejectLoader("reject");
    const res = await mutateAsync({
      jobApplicationId: applicant?.id ?? "",
      status: false,
    });
    if ((res && "error" in res) || (res && res.status === false)) {
      toast.error(res.message ?? "");
    } else {
      toast.success(res.message);
      route.push("/my-designs");
    }
  };

  //Initiate Escrow

  const treasuryAddress =
    "GC7UEC3AFM2JTFA2PAR5WRM6QOSBJ6PM454LGRLQIZU5QJZLYDIY2WON";
  const creatorAddress = "";
  const shopperAddress =
    "GDL5LVUDI2GEA765TFFMEHH3KVLR63IE3OCRIJAZM7N3LM6NYADAYKBG";

  const [escrowLoader, setEscrowLoader] = useState(false);

  const initiateEscrow = async () => {
    setEscrowLoader(true);
    try {
      const response = await fetch("/api/initiate-escrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          makerAddress: applicant?.wallet,
          treasuryAddress,
          shopper: shopperAddress,
          amount: applicant?.amount.toString(),
          creator: creatorAddress || null,
        }),
      });

      const data = await response.json();
      toast.success("Escrow started successfully ");
      console.log(data.status);

      setEscrowLoader(false);
      route.push("/messages");
    } catch (err) {
      // console.error("Failed to initiate escrow", err);
      toast.error("Failed to initiate escrow");
      console.log(err);
      setEscrowLoader(false);
    }
  };

  if (isPending) {
    return (
      <div className="py-[4rem] flex items-center justify-center w-[100%]">
        <LoaderSvg color="#000000" />
      </div>
    );
  }
  return (
    <div className="px-[4rem] py-[6rem] bg-astraOffWhite w-[100%]">
      <div
        className="flex gap-x-[2rem] items-center cursor-pointer"
        onClick={() => route.push(`/applicants?id=${jobId}`)}
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
          <p className="text-[3.6rem] font-bold">
            {applicant?.user?.creator?.fullName}
          </p>
          <p className="text-[1.8rem] text-astraTextGrey">
            {applicant?.user?.creator?.category[0]}
          </p>
        </div>
        <p className="text-[1.8rem] text-astraLightBlack font-bold mt-[6rem]">
          Description:
        </p>
        <p className="text-[1.8rem]">
          {applicant?.user?.creator?.fullName} is a{" "}
          {applicant?.user?.creator?.category[0]}, based in{" "}
          {applicant?.user?.creator?.location}. Their skills are listed below.
        </p>
        <p className="text-[1.8rem] text-astraLightBlack font-bold mt-[6rem]">
          Skills:
        </p>
        <div className="flex items-center py-[1rem] flex-wrap gap-[1.5rem]">
          {applicant &&
            applicant?.user?.creator?.skills.map((item, index) => (
              <p
                key={index}
                className="text-[1.5rem] py-[1.4rem] px-[2rem] rounded-full text-center bg-astraBorderGrey min-w-[max-content]"
              >
                {item}
              </p>
            ))}
        </div>
        <p className="text-[1.8rem] text-astraLightBlack font-bold mt-[6rem] mb-[1rem]">
          View {applicant?.user?.creator?.fullName}’s Projects
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
                How much is the creator is charging for this job?
              </p>
            </div>
            <div className="border bg-white rounded-full flex items-center justify-between px-[2.5rem] py-[1.5rem] w-[30rem]">
              <div>
                <p className="bg-white outline-none text-[1.6rem] text-astraLightBlack">
                  {applicant?.amount}
                </p>
              </div>

              <p className="text-[1.6rem] text-astraLightBlack font-[500]">
                $ {applicant?.amount}
              </p>
            </div>
          </div>
          {/* <div className="flex items-center justify-end gap-x-[1rem] mr-[4rem]">
            <Image src={checkedIcon} alt="" width={22} height={22} />
            <p className="text-[1.8rem] text-astraTextGrey">
              I am open to negotiations
            </p>
          </div> */}
          {/* <div className="flex items-center justify-between p-[3rem]">
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
          </div> */}
          <div className="flex items-center gap-x-[2rem] ml-[3rem] mb-[4rem]">
            <Button
              action="Accept Terms"
              fontSize="text-[1.2rem]"
              width="w-[20rem]"
              handleClick={handleAccept}
              isDisabled={isPendingAcceptOrReject}
              animate={
                isPendingAcceptOrReject && acceptOrRejectLoader === "accept"
              }
              rounded
            />
            <Button
              action="Decline Terms"
              fontSize="text-[1.2rem]"
              width="w-[20rem] border-astraRed"
              handleClick={handleReject}
              inverse
              rounded
              textColor="text-astraRed"
              borderColor="border-astraRed"
              isDisabled={isPendingAcceptOrReject}
              animate={
                isPendingAcceptOrReject && acceptOrRejectLoader === "reject"
              }
            />
          </div>
        </div>
      </div>
      <WalletModal
        isVisible={walletModal}
        handleCancel={() => setWalletModal(false)}
        handleProceed={initiateEscrow}
        isLoading={escrowLoader}
      >
        <div className="p-[2rem] border rounded-[1.4rem] my-[2.4rem]">
          <p className="text-[1.8rem] text-astraTextGrey mb-[1rem]">
            Timeline:
          </p>
          <p className="text-[1.8rem] text-astraTextGrey">
            Amount to pay: ${applicant?.amount}
          </p>
        </div>
      </WalletModal>
    </div>
  );
}
