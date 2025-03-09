"use client";
import DashboardFrame from "@/shared/DashboardFrame";
import dynamic from "next/dynamic";
const NewMessageFrame = dynamic(
  () => import("@/components/messages/NewMessageFrame"),
  {
    ssr: false,
  }
);

export default function Messages() {
  return (
    <DashboardFrame withSideBar noActions>
      <NewMessageFrame />
    </DashboardFrame>
  );
}
