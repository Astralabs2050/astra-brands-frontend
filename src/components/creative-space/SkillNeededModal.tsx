import Button from "@/shared/Button";

interface ConfirmationModalProps {
  isVisible: boolean;
  handleCancel: () => void;
  handleProceed: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function SkillNeededModal({
  isVisible,
  handleCancel,
  handleProceed,
  isLoading,
  children,
}: ConfirmationModalProps) {
  if (!isVisible) return null;
  return (
    <div
      className="fixed flex justify-center items-center inset-0 bg-black bg-opacity-20  z-[30]"
      onClick={handleCancel}
    >
      <div
        className="bg-white w-[50rem] p-[2.4rem] rounded-[1.8rem]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p className="text-[1.5rem]">
          Who would you need to bring your idea to life?
        </p>
        {/* <p className="text-astraLightBlack text-[1.2rem]">
          You can select more than one.
        </p> */}
        <div>{children}</div>
        <div className="mt-[5rem] flex justify-between w-[100%]">
          <div className="w-[48%]">
            <Button
              action="Cancel"
              fontSize="text-[1.4rem]"
              width="w-[100%]"
              handleClick={handleCancel}
              inverse
              rounded
            />
          </div>
          <div className="w-[48%]">
            <Button
              action="Continue"
              fontSize="text-[1.4rem]"
              width="w-[100%]"
              handleClick={handleProceed}
              animate={isLoading}
              isDisabled={isLoading}
              rounded
            />
          </div>
        </div>
      </div>
    </div>
  );
}
