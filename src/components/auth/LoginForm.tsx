"use client";

import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

export default function LoginForm() {
  const route = useRouter();

  //Login form
  const loginForm = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(
          /^(?=.*[0-9])(?=.*[A-Z]).{8,}$/,
          "Password must contain at least one uppercase letter and one number"
        ),
    }),
    validateOnMount: true,
    onSubmit: () => {
      route.push("/dashboard");
    },
  });

  return (
    <div className="py-[3rem] px-[14rem] w-[100%] bg-white">
      <h1 className="text-center text-[30px] font-bold">
        Log in to your Astra Dashboard
      </h1>
      <p className="text-[1.8rem] text-astraGray text-center mb-[5rem]">
        Log in to bring your fashion ideas to life
      </p>
      <InputField
        name="email"
        placeholder="Enter your email address"
        onChange={loginForm.handleChange}
        onBlur={loginForm.handleBlur}
        error={
          loginForm.touched.email && loginForm.errors.email
            ? loginForm.errors.email
            : null
        }
        value={loginForm.values.email}
        type="email"
        borderRadius="rounded-full"
      />
      <InputField
        name="password"
        placeholder="Enter your password"
        onChange={loginForm.handleChange}
        onBlur={loginForm.handleBlur}
        error={
          loginForm.touched.password && loginForm.errors.password
            ? loginForm.errors.password
            : null
        }
        value={loginForm.values.password}
        type="password"
        password
        marginBottom="mb-[1rem]"
        borderRadius="rounded-full"
      />
      <Button
        action="Log in"
        width="w-[100%] mt-[3rem] mb-[2rem]"
        handleClick={loginForm.handleSubmit}
        fontSize="text-[1.6rem]"
        isDisabled={!loginForm.isValid}
        rounded
      />
      <p className="text-[1.5rem] text-astraLightBlack text-center">
        Don&apos;t have an account? <br /> Sign up{" "}
        <span
          className="text-black text-[1.5rem] underline cursor-pointer"
          onClick={() => route.push("/signup")}
        >
          here
        </span>
      </p>
    </div>
  );
}
