import { acceptApplicantIcon } from "@/image";
import Button from "@/shared/Button";
import Image from "next/image";
interface WalletModalProps {
  isVisible: boolean;
  handleCancel: () => void;
  handleProceed: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
}
export default function WalletModal({
  isVisible,
  handleCancel,
  handleProceed,
  isLoading,
  children,
}: WalletModalProps) {
  if (!isVisible) return null;
  return (
    <div
      className="fixed flex justify-center items-center inset-0 bg-black bg-opacity-20  z-[30]"
      onClick={handleCancel}
    >
      <div
        className="bg-white w-[50rem]  rounded-[1.8rem]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex items-center bg-black justify-center gap-x-[2rem] rounded-t-[1.8rem] py-[2.4rem]">
          <Image src={acceptApplicantIcon} alt="" width={30} height={30} />
          <p className="text-white text-[2rem] font-bold">
            Application Accepted
          </p>
        </div>
        <div className="p-[2.4rem]">
          <p className="text-[2.4rem]">Escrow Payment</p>
          <p className="text-[1.8rem] text-astraTextGrey">
            Setup escrow payment with this client to pay them in installments as
            each milestone is completed.
          </p>
          {children}
          <div className=" flex justify-between w-[100%]">
            <div className="w-[48%]">
              <Button
                action="Make Payment"
                fontSize="text-[1.4rem]"
                width="w-[100%]"
                handleClick={handleProceed}
                animate={isLoading}
                isDisabled={isLoading}
                rounded
              />
            </div>
            <div className="w-[48%]">
              <Button
                action="Decline"
                fontSize="text-[1.4rem]"
                width="w-[100%]"
                handleClick={handleCancel}
                inverse
                rounded
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
