"use client";

import { login } from "@/network/auth";
import { TOKEN_NAME, USER_PROFILE } from "@/network/constant";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function LoginForm() {
  const route = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
  });

  //Login form
  const loginForm = useFormik({
    initialValues: {
      email: "",
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
    onSubmit: async (values) => {
      const res = await mutateAsync({
        email: values.email,
        password: values.password,
      });
      if ((res && "error" in res) || (res && res.status === false)) {
        toast.error(res.message ?? "");
      } else if (res && res.data) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem(TOKEN_NAME, res.data?.token);
          sessionStorage.setItem(USER_PROFILE, JSON.stringify(res.data));
        }
        route.push("/dashboard");
      }
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
        animate={isPending}
        isDisabled={!loginForm.isValid || isPending}
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
