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
      <div className="bg-white w-[70%] mx-auto px-[4rem] py-[5rem] rounded-[2rem]">
        <p className="text-[3rem] text-center font-bold mb-[6rem]">
          Set-up Escrow Account{" "}
        </p>
        <p className="text-[2rem] font-bold mb-[1rem]">What is an Escrow?</p>
        <p className="text-[1.7rem] mb-[3rem] leading-[3.2rem]">
          An escrow account is a financial arrangement where a third party holds
          and regulates funds or assets on behalf of two parties involved in a
          transaction. The funds are only released when all agreed-upon
          conditions are met, ensuring that both parties fulfil their
          obligations.
        </p>
        <p className="text-[1.7rem] leading-[3.2rem]">
          In this context, an escrow account is needed to protect makers,
          creators and shoppers in transactions. It ensures that the
          creator&apos;s payment is secure until they receive the goods or
          services as promised, and the seller is assured they will be paid once
          they deliver. This helps build trust and reduces the risk of fraud,
          making transactions smoother and more reliable.
        </p>
        <p className="text-[2rem] font-bold mb-[1rem] mt-[2rem] leading-[3.2rem]">
          Why use escrow?
        </p>
        <p className="text-[1.7rem] leading-[3.2rem]">
          Ultimately, escrow is a means of shielding your transaction and
          ensuring that fraud isn’t allowed to happen. It does mean putting your
          fate in the hands of somebody else, of course. But as long as it’s
          somebody you trust, you could also see it as a way of letting them
          take care of the logistics so you can spend more time focusing on what
          really matters.
        </p>
        <p className="text-[2rem] font-bold mb-[1rem] mt-[2rem] leading-[3.2rem]">
          How can this help?
        </p>
        <ul className="list-disc  ml-[3rem]">
          <li className="text-[1.7rem] leading-[3.2rem]">
            Advanced encryption protects transactions and personal data from
            unauthorised access.
          </li>
          <li className="text-[1.7rem] leading-[3.2rem]">
            Payment methods are securely verified and sensitive information is
            safely stored.
          </li>
          <li className="text-[1.7rem] leading-[3.2rem]">
            Continuous monitoring for suspicious activity with alerts and holds
            on unusual transactions.
          </li>
          <li className="text-[1.7rem] leading-[3.2rem]">
            Structured process for handling disputes fairly and promptly.
          </li>
          <li className="text-[1.7rem] leading-[3.2rem]">
            Neutral third party manages the account, ensuring funds are released
            only when conditions are met.
          </li>
        </ul>
        <p className="text-[2rem] font-bold mb-[1rem] mt-[2rem] leading-[3.2rem]">
          Benefits of using an escrow:
        </p>
        <ul className="list-disc ml-[3rem]">
          <li className="text-[1.7rem] leading-[3.2rem]">
            Ensures funds or goods are safe until transaction terms are met.
          </li>
          <li className="text-[1.7rem] leading-[3.2rem]">
            Establishes trust between parties by protecting their interests.
          </li>
          <li className="text-[1.7rem] leading-[3.2rem]">
            Minimises the risk of non-payment for sellers and non-delivery for
            buyers.
          </li>
          <li className="text-[1.7rem] leading-[3.2rem]">
            Clear documentation and tracking of the transaction process.
          </li>
          <li className="text-[1.7rem] leading-[3.2rem]">
            Simplifies transactions by centralising payment and fund release.
          </li>
          <li className="text-[1.7rem] leading-[3.2rem]">
            Provides a legally binding framework for transaction security and
            dispute resolution.
          </li>
        </ul>
        <div
          className="bg-black flex justify-center items-center w-[48rem] mx-auto py-[1.6rem] rounded-[1rem] gap-x-[2rem] cursor-pointer mt-[9rem]"
          onClick={() => {
            route.push("/dashboard");
          }}
        >
          <p className="text-[1.6rem] text-white">Continue to escrow.com</p>
          <div>
            <Image src={linkIcon} alt="" height={20} width={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
