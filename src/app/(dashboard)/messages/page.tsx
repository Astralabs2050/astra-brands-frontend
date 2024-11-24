import NewMessageFrame from "@/components/messages/NewMessageFrame";
import DashboardFrame from "@/shared/DashboardFrame";

export default function Messages() {
  return (
    <DashboardFrame withSideBar noActions>
      {/* <MessageFrame /> */}
      <NewMessageFrame />
    </DashboardFrame>
  );
}
