// import LoaderSvg from "./LoaderSvg";

// interface ButtonProps {
//   width: string;
//   action: string;
//   fontSize: string;
//   handleClick: () => void;
//   inverse?: boolean;
//   rounded?: boolean;
//   isDisabled?: boolean;
//   animate?: boolean;
//   borderColor?: string;
//   textColor?: string;
// }
// export default function Button({
//   width,
//   action,
//   inverse,
//   rounded,
//   fontSize,
//   handleClick,
//   isDisabled,
//   animate,
//   textColor,
//   borderColor,
// }: ButtonProps) {
//   return (
//     <button
//       className={`py-[1.6rem] ${width}  ${
//         rounded ? "rounded-full" : "rounded-[1rem]"
//       } ${fontSize}  ${
//         inverse
//           ? isDisabled
//             ? "border-astraLightBlack bg-white text-astraLightBlack"
//             : borderColor
//             ? `${borderColor} border`
//             : `border-black border bg-white ${
//                 textColor ? textColor : "text-black"
//               }`
//           : isDisabled
//           ? "bg-astraLightBlack text-white"
//           : "bg-black text-white"
//       } flex justify-center items-center`}
//       onClick={handleClick}
//       disabled={isDisabled}
//     >
//       {animate ? <LoaderSvg color={inverse ? "#000000" : "#ffffff"} /> : action}
//     </button>
//   );
// }

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
    : "bg-black text-white";

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
