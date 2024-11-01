import Image from "next/image";
import LoaderSvg from "./LoaderSvg";

interface ButtonProps {
  action: string;
  handleClick: () => void;
  isDisabled?: boolean;
  animate?: boolean;
  loaderColor: string;
  icon: string;
  containerStyle: string;
  fontStyle: string;
  iconWidth: string;
}
export default function ButtonWithIcon({
  action,
  handleClick,
  isDisabled,
  fontStyle,
  animate,
  loaderColor,
  icon,
  iconWidth,
  containerStyle,
}: ButtonProps) {
  return (
    <button
      className={`${containerStyle}`}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {animate ? (
        <div>
          <LoaderSvg color={loaderColor} />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-x-[1rem]">
          <div className={`${iconWidth}`}>
            <Image
              src={icon}
              alt="logo"
              height={200}
              width={200}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <p className={`${fontStyle}`}>{action}</p>
        </div>
      )}
    </button>
  );
}
