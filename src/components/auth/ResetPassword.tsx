"use client";

import { logo } from "@/image";
import { resetPassword } from "@/network/auth";
import { RESET_PASSWORD_EMAIL } from "@/network/constant";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import * as Yup from "yup";

export default function ResetPasswordForm() {
  const route = useRouter();
  const [otp, setOtp] = useState<string>("");
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem(RESET_PASSWORD_EMAIL);
      if (storedEmail) {
        const parsedEmail = JSON.parse(storedEmail);
        setEmail(parsedEmail);
      }
    }
  }, []);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: resetPassword,
  });

  //Login form
  const resetPasswordForm = useFormik<{
    password: string;
    confirmPassword: string;
  }>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(
          /^(?=.*[0-9])(?=.*[A-Z]).{8,}$/,
          "Password must contain at least one uppercase letter and one number"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    validateOnMount: true,
    onSubmit: async (values) => {
      const res = await mutateAsync({
        otp: otp,
        email: email,
        password: values.confirmPassword,
      });
      if ((res && "error" in res) || (res && res.status === false)) {
        toast.error(res.message ?? "");
      } else {
        route.push("/");
      }
    },
  });

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
      <h1 className="text-center text-[30px] font-bold">Reset your password</h1>
      <div className="my-[3rem]">
        <p className="text-[1.8rem] text-astraLightBlack mb-[.5rem]">
          Enter otp
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
                width: "105px",
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
      </div>
      <InputField
        name="password"
        placeholder="Enter your password"
        onChange={resetPasswordForm.handleChange}
        onBlur={resetPasswordForm.handleBlur}
        error={
          resetPasswordForm.touched.password &&
          resetPasswordForm.errors.password
            ? resetPasswordForm.errors.password
            : null
        }
        value={resetPasswordForm.values.password}
        type="password"
        password
        marginBottom="mb-[1rem]"
      />
      <InputField
        name="confirmPassword"
        placeholder="Confirm password"
        onChange={resetPasswordForm.handleChange}
        onBlur={resetPasswordForm.handleBlur}
        error={
          resetPasswordForm.touched.confirmPassword &&
          resetPasswordForm.errors.confirmPassword
            ? resetPasswordForm.errors.confirmPassword
            : null
        }
        value={resetPasswordForm.values.confirmPassword}
        type="password"
        password
        marginBottom="mb-[1rem]"
      />
      <Button
        action="Reset Password"
        width="w-[100%] mt-[3rem] mb-[2rem]"
        handleClick={resetPasswordForm.handleSubmit}
        fontSize="text-[1.6rem]"
        animate={isPending}
        isDisabled={!resetPasswordForm.isValid || otp?.length < 4 || isPending}
      />
    </div>
  );
}
