"use client";

import { passwordEye } from "@/image";
import Image from "next/image";
import { ChangeEventHandler, useState } from "react";
interface InputFieldProps {
  password?: boolean;
  placeholder?: string;
  type?: string;
  isDisabled?: boolean;
  error: string | null;
  name: string;
  value: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onKeydown?: React.KeyboardEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
  borderRadius?: string;
  fontSize?: string;
  marginBottom?: string;
}

export default function InputField({
  password,
  error,
  type,
  placeholder,
  name,
  onChange,
  onBlur,
  onKeydown,
  value,
  isDisabled,
  borderRadius,
  fontSize,
  marginBottom,
  children,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  if (password) {
    return (
      <div className={`${marginBottom ? marginBottom : "mb-[3rem]"} w-[100%]`}>
        <div
          className={`${
            error ? "border-astraRed" : "border-astraGrey "
          } border-[0.1rem] py-[1.8rem] px-[2.4rem] ${
            borderRadius ? borderRadius : "rounded-[.8rem]"
          } w-[100%] flex items-center`}
        >
          <div className="w-[100%] mr-[1rem]">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              name={name}
              onChange={onChange as ChangeEventHandler<HTMLInputElement>}
              onBlur={onBlur}
              value={value}
              className="text-[1.6rem] text-black w-[100%] outline-none bg-transparent"
              disabled={isDisabled}
            />
          </div>
          <div className="w-[2.4rem]" onClick={togglePasswordVisibility}>
            <Image
              src={showPassword ? passwordEye : passwordEye}
              alt={"input icon"}
              style={{
                width: "100%",
                height: "auto",
              }}
              height={20}
              width={70}
            />
          </div>
        </div>
        {error && <div className="text-[1.3rem] text-astraRed ">{error}</div>}
      </div>
    );
  }
  return (
    <div className={`${marginBottom ? marginBottom : "mb-[3rem]"} w-[100%]`}>
      <div
        className={`${
          error ? "border-astraRed" : "border-astraGrey "
        } border-[0.1rem] py-[1.7rem] px-[2.4rem] ${
          borderRadius ? borderRadius : "rounded-[.8rem]"
        } w-[100%]`}
      >
        {children && (
          <div className="w-[100%] flex flex-wrap gap-[1.2rem]">{children}</div>
        )}
        <div className="w-[100%]">
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange as ChangeEventHandler<HTMLInputElement>}
            onBlur={onBlur}
            onKeyDown={onKeydown}
            value={value}
            className={`${
              fontSize ? fontSize : "text-[1.6rem]"
            } text-black w-[100%] outline-none bg-transparent`}
            disabled={isDisabled}
          />
        </div>
      </div>
      {error && <div className="text-[1.3rem] text-astraRed">{error}</div>}
    </div>
  );
}
