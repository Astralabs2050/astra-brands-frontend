"use client";
import { logo } from "@/image";
import { forgotPassword } from "@/network/auth";
import { RESET_PASSWORD_EMAIL } from "@/network/constant";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function ForgotPasswordForm() {
  const route = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: forgotPassword,
  });
  const forgotPasswordForm = useFormik<{ email: string }>({
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
      const res = await mutateAsync({
        email: values.email,
      });
      if ((res && "error" in res) || (res && res.status === false)) {
        toast.error(res.message ?? "");
      } else {
        route.push("/reset-password");
        if (typeof window !== "undefined") {
          localStorage.setItem(
            RESET_PASSWORD_EMAIL,
            JSON.stringify(values.email)
          );
        }
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
        Forgot Password
      </h1>
      <p className="text-[1.8rem] text-astraLightBlack text-center mb-[3.2rem]">
        Please enter the email address associated with your account
      </p>
      <InputField
        name="email"
        placeholder="Enter your email address"
        onChange={forgotPasswordForm.handleChange}
        onBlur={forgotPasswordForm.handleBlur}
        error={
          forgotPasswordForm.touched.email && forgotPasswordForm.errors.email
            ? forgotPasswordForm.errors.email
            : null
        }
        value={forgotPasswordForm.values.email}
        type="email"
      />
      <Button
        action="Submit"
        width="w-[100%] mt-[3rem] mb-[2rem]"
        handleClick={forgotPasswordForm.handleSubmit}
        fontSize="text-[1.6rem]"
        animate={isPending}
        isDisabled={!forgotPasswordForm.isValid || isPending}
      />
    </div>
  );
}
