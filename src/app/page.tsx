import LoginForm from "@/components/auth/LoginForm";
import AuthRight from "@/shared/AuthRight";

export default function Home() {
  return (
    <div className="flex bg-white">
      <div className="flex justify-center items-center w-[55%]">
        <LoginForm />
      </div>
      <div className="w-[45%]">
        <AuthRight />
      </div>
    </div>
  );
}
