import Register from "@/components/auth/Regitster";
import AuthRight from "@/shared/AuthRight";

export default function Home() {
  return (
    <div className="flex bg-white">
      <div className="flex justify-center w-[55%]">
        <Register />
      </div>
      <div className="w-[45%]">
        <AuthRight />
      </div>
    </div>
  );
}
