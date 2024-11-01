"use client";
import { logo } from "@/image";
import { resendOtp } from "@/network/auth";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function WrongEmail() {
  const route = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: resendOtp,
  });
  const emailForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    validateOnMount: true,
    onSubmit: async (values) => {
      if (typeof window !== "undefined") {
        const existingData = localStorage.getItem("storedOnboarding");
        const parsedData = existingData ? JSON.parse(existingData) : {};
        const updatedData = {
          ...parsedData,
          ...{ email: values.email },
        };
        localStorage.setItem("storedOnboarding", JSON.stringify(updatedData));
      }
      const res = await mutateAsync({
        email: values.email,
      });
      if ((res && "error" in res) || (res && res.status === false)) {
        toast.error(res.message ?? "");
      } else {
        route.push("/verification");
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
      <h1 className="text-center text-[3.2rem] font-bold mt-[3.2rem] mb-[1.6rem]">
        Enter Email
      </h1>
      <p className="text-[1.8rem] text-astraLightBlack text-center mb-[3.2rem]">
        We will send a verification code to email address
        <br />
      </p>
      <InputField
        name="email"
        placeholder="Enter your email address"
        onChange={emailForm.handleChange}
        onBlur={emailForm.handleBlur}
        error={
          emailForm.touched.email && emailForm.errors.email
            ? emailForm.errors.email
            : null
        }
        value={emailForm.values.email}
        type="email"
      />
      <Button
        action="Submit"
        width="w-[100%] mt-[3rem] mb-[2rem]"
        handleClick={emailForm.handleSubmit}
        fontSize="text-[1.6rem]"
        animate={isPending}
        isDisabled={isPending || !emailForm.isValid}
      />
    </div>
  );
}
