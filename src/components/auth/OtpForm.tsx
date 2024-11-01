"use client";
import { logo } from "@/image";
import Button from "@/shared/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";

export default function Otp() {
  const route = useRouter();
  const [otp, setOtp] = useState<string>("");
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedOnboarding = localStorage.getItem("storedOnboarding");
      if (storedOnboarding) {
        const parsedOnboarding = JSON.parse(storedOnboarding);
        setEmail(parsedOnboarding.email);
      }
    }
  }, []);

  return (
    <div className="w-[48rem]">
      <div className="w-[15rem] mx-auto">
        <Image
          src={logo}
          alt=""
          height={200}
          width={200}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <h1 className="text-center text-[3.2rem] font-bold mt-[3.2rem] mb-[1.6rem]">
        OTP Verification
      </h1>
      <p className="text-[1.8rem] text-astraLightBlack text-center mb-[3.2rem]">
        We have sent a verification code to email address
        <br />
        <span className="text-black text-[1.8rem] font-[500]">
          {email}.{" "}
          <span className="text-black text-[1.8rem] underline">
            Wrong Email?
          </span>
        </span>{" "}
      </p>
      <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={<span>-</span>}
        renderInput={(props, index) => (
          <input
            {...props}
            onFocus={() => setFocusedInput(index)}
            onBlur={() => setFocusedInput(null)}
            style={{
              fontSize: "24px",
              height: "58px",
              width: "102px",
              border:
                focusedInput === index
                  ? "2px solid black"
                  : "1px solid rgba(208, 213, 221, 1)",
              marginRight: "16px",
              borderRadius: "10px",
              textAlign: "left",
              paddingLeft: "20px",
              transition: "border 0.3s ease",
              outline: "none",
            }}
          />
        )}
      />
      <Button
        action="Submit"
        width="w-[100%] mt-[3rem] mb-[2rem]"
        handleClick={() => {
          route.push("/escrow");
        }}
        fontSize="text-[1.6rem]"
        isDisabled={otp?.length < 4}
      />
    </div>
  );
}
