"use client";
import { googleLogo } from "@/image";
import { signup } from "@/network/auth";
import Button from "@/shared/Button";
import InputField from "@/shared/InputField";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface RegisterProps {
  email: string;
  userName: string;
  password: string;
}

export default function Register() {
  const route = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: signup,
  });

  const register = useFormik<RegisterProps>({
    initialValues: {
      email: "",
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      userName: Yup.string()
        .min(2, "Full Name must be at least 2 characters")
        .required("Full Name is required"),

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
      const onboardingData = {
        email: values.email,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "storedOnboarding",
          JSON.stringify(onboardingData)
        );
      }
      const res = await mutateAsync({
        email: values.email,
        password: values.password,
        username: values.userName,
      });
      if (res && "error" in res) {
        toast.error(res.error);
      } else {
        route.push("/otp-verification");
      }
    },
  });

  return (
    <div className="py-[8rem] px-[14rem] w-[100%] bg-white">
      <h1 className="text-center text-[30px] font-bold">Create an account</h1>
      <p className="text-[1.8rem] text-astraGray text-center">
        Create an account to bring your fashion ideas to life
      </p>
      <button className="flex justify-center items-center gap-x-[2rem] border border-black rounded-full py-[1.6rem] w-[100%] mt-[3rem]">
        <div>
          <Image src={googleLogo} alt="" height={20} width={20} />
        </div>
        <p className="text-black text-[1.6rem] font-bold">
          Continue with Google
        </p>
      </button>
      <hr className="w-[100%] border-[#E0E0E0] my-[4rem]" />
      <InputField
        name="email"
        placeholder="Enter your email address"
        onChange={register.handleChange}
        onBlur={register.handleBlur}
        error={
          register.touched.email && register.errors.email
            ? register.errors.email
            : null
        }
        value={register.values.email}
        type="email"
        borderRadius="rounded-full"
      />
      <InputField
        name="userName"
        placeholder="@ Choose your username"
        onChange={register.handleChange}
        onBlur={register.handleBlur}
        error={
          register.touched.userName && register.errors.userName
            ? register.errors.userName
            : null
        }
        value={register.values.userName}
        type="text"
        borderRadius="rounded-full"
      />
      <InputField
        name="password"
        placeholder="Enter your password"
        onChange={register.handleChange}
        onBlur={register.handleBlur}
        error={
          register.touched.password && register.errors.password
            ? register.errors.password
            : null
        }
        value={register.values.password}
        type="password"
        password
        borderRadius="rounded-full"
        marginBottom="mb-[.5rem]"
      />
      <p className="text-[1.3rem] text-astraLightBlack text-center">
        Password must have at least 8 characters, 1 uppercase letter and 1
        number.
      </p>
      <Button
        action="Create Account"
        width="w-[100%] mt-[3rem] mb-[2rem]"
        handleClick={register.handleSubmit}
        fontSize="text-[1.6rem]"
        isDisabled={!register.isValid || isPending}
        animate={isPending}
        rounded
      />
      <p className="text-[1.5rem] text-astraLightBlack text-center">
        You acknowledge that you read, and agree to our <br />
        <span className="text-black text-[1.5rem] underline">
          Terms of Service
        </span>{" "}
        and our{" "}
        <span className="text-black text-[1.5rem] underline">
          Privacy Policy
        </span>
      </p>
    </div>
  );
}
