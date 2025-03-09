"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { linkIcon, logo } from "@/image";

export default function EscrowForm() {
  const route = useRouter();
  return (
    <div>
      <div className="px-[5rem] pt-[3rem] pb-[4rem] ml-[16rem]">
        <Image src={logo} alt="logo" height={30} width={150} />
      </div>
      <div className="bg-white w-[70%] mx-auto px-[4rem] py-[5rem] rounded-[2rem] mb-[5rem]">
        <p className="text-[2.8rem] text-center font-bold mb-[6rem]">
          Set Up Your Freighter Wallet {" "}
        </p>
        <p className="text-[1.8rem] font-bold mb-[3rem]">
          To fully unlock Astra’s features, you’ll need a stellar Web3 wallet. 
        </p>
        <p className="text-[1.8rem] font-bold mb-[1rem]">
          A Freighter Wallet is essential for:
        </p>
        <ul className="list-disc  ml-[3rem]">
          <li className="text-[1.7rem] leading-[3.2rem]">
            <span className="text-[1.7rem] font-bold">Securing Payments:</span>{" "}
            Without a Web3 wallet, you won’t be able to pay makers or receive
            payments from creators using Astra’s escrow system.
          </li>
          <li className="text-[1.7rem] leading-[3.2rem]">
            <span className="text-[1.7rem] font-bold">
              Tokenising Your Designs:
            </span>{" "}
            Easily turn your ideas into NFTs on the blockchain, ensuring
            ownership and transparency.
          </li>
        </ul>
        <p className="text-[1.8rem] font-bold mb-[1rem] mt-[4rem]">
          Once your Freighter Wallet is set up in your browser and topped up
          with funds, you’re ready to go:
        </p>
        <ul className="list-disc  ml-[3rem]">
          <li className="text-[1.7rem] leading-[3.2rem]">
            Click{" "}
            <span className="text-[1.7rem]  text-astraBlue">“Tokenize”</span> to
            mint your designs as NFTs.
          </li>
          <li className="text-[1.7rem] leading-[3.2rem]">
            Click{" "}
            <span className="text-[1.7rem]  text-astraBlue">
              “Pay into Escrow”
            </span>{" "}
            to securely process payments for makers or receive payments from
            creators.
          </li>
        </ul>
        <p className="text-[1.8rem] font-bold mb-[1rem] mt-[2rem] leading-[3.2rem]">
          No extra steps—everything is seamlessly integrated for your
          convenience.
        </p>
        <p className="text-[1.8rem] font-bold mb-[1rem] mt-[2rem] leading-[3.2rem]">
          Set up your wallet today by clicking the button below:
        </p>
        <div
          className="bg-black flex justify-center items-center w-[48rem] mx-auto py-[1.6rem] rounded-[1rem] gap-x-[2rem] cursor-pointer mt-[9rem]"
          onClick={() => {
            route.push("/dashboard");
          }}
        >
          <p className="text-[1.6rem] text-white">Get Started with Freighter</p>
          <div>
            <Image src={linkIcon} alt="" height={20} width={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
