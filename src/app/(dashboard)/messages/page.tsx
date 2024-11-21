import MessageFrame from "@/components/messages/MessageFrame";
import DashboardFrame from "@/shared/DashboardFrame";

export default function Messages() {
  return (
    <DashboardFrame withSideBar noActions>
      <MessageFrame />
    </DashboardFrame>
  );
}
