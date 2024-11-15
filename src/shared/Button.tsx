import LoaderSvg from "./LoaderSvg";

interface ButtonProps {
  width: string;
  action: string;
  fontSize: string;
  handleClick: () => void;
  inverse?: boolean;
  rounded?: boolean;
  isDisabled?: boolean;
  animate?: boolean;
  borderColor?: string;
  textColor?: string;
  backgroundColor?: string;
}

export default function Button({
  width,
  action,
  inverse,
  rounded,
  fontSize,
  handleClick,
  isDisabled,
  animate,
  textColor,
  borderColor,
  backgroundColor,
}: ButtonProps) {
  const baseStyles = `py-[1.6rem] ${width} ${fontSize} flex justify-center items-center`;
  const shapeStyles = rounded ? "rounded-full" : "rounded-[1rem]";

  const disabledStyles = isDisabled
    ? inverse
      ? "border-astraLightBlack bg-white text-astraLightBlack"
      : "bg-astraLightBlack text-white"
    : "";

  const normalStyles = inverse
    ? `${borderColor ? borderColor : "border-black"} border bg-white ${
        textColor || "text-black"
      }`
    : `${backgroundColor || "bg-black"} ${textColor || "text-white"}`;

  const buttonStyles = `${baseStyles} ${shapeStyles} ${
    disabledStyles || normalStyles
  }`;

  return (
    <button
      className={buttonStyles}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {animate ? <LoaderSvg color={inverse ? "#000000" : "#ffffff"} /> : action}
    </button>
  );
}
