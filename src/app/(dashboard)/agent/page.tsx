import AgentChatUI from "@/components/agent/AgentMessage";
import DashboardFrame from "@/shared/DashboardFrame";

export default function AgentChat() {
  return (
    <DashboardFrame withSideBar noActions>
      <AgentChatUI />
    </DashboardFrame>
  );
}

// "use client";
// import { TOKEN_NAME } from "@/network/constant";
// import React, { useState, useEffect } from "react";
// import { io, Socket } from "socket.io-client";

// interface ChatLogEntry {
//   type: "ask" | "success" | "error" | "user";
//   data: any;
// }

// function Page() {
//   const [message, setMessage] = useState<string>("");
//   const [chatLog, setChatLog] = useState<ChatLogEntry[]>([]);
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [nextEvent, setNextEvent] = useState<string>("greeting");
//   useEffect(() => {
//     // Initialize Socket.IO client with token in headers
//     const token = sessionStorage.getItem(TOKEN_NAME) ?? "";
//     const newSocket: Socket = io("https://render-backend-drm4.onrender.com", {
//       extraHeaders: {
//         token: token,
//       },
//     });
//     setSocket(newSocket);

//     // Listen for events
//     newSocket.on("ask", (data: any) => {
//       console.log("Ask event received:", data?.nextevent);
//       if (data?.nextevent !== "") {
//         setNextEvent(data?.nextevent);
//       }
//       setChatLog((prev) => [...prev, { type: "ask", data }]);
//     });

//     newSocket.on("success", (data: any) => {
//       console.log("Success event received:", data);
//       if (data?.nextevent !== "") {
//         setNextEvent(data?.nextevent);
//       }
//       setChatLog((prev) => [...prev, { type: "success", data }]);
//     });

//     newSocket.on("error", (data: any) => {
//       console.log("Error event received:", data);
//       if (data?.nextevent !== "") {
//         setNextEvent(data?.nextevent);
//       }
//       setChatLog((prev) => [...prev, { type: "error", data }]);
//     });

//     // Cleanup on component unmount
//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   const handleSend = (): void => {
//     if (socket) {
//       const newMessage = { response: message||selectedImage };
//       // Emit a custom event with JSON data
//       socket.emit(nextEvent, newMessage);
//       // Add the message to the chat log
//       setChatLog((prev) => [...prev, { type: "user", data: newMessage }]);
//       setMessage(""); // Clear input after sending
//     }
//   };

//   useEffect(() => {
//     if (socket) {
//       socket.emit("greeting");
//     }
//   }, [socket]);

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h1>Chat App</h1>

//       {/* Chat Log */}
//       <div
//         style={{
//           border: "1px solid #ccc",
//           padding: "10px",
//           height: "300px",
//           overflowY: "scroll",
//           marginBottom: "20px",
//         }}
//       >
//         {chatLog.map((entry, index) => (
//           <div key={index} style={{ marginBottom: "10px" }}>
//             <strong>{entry.type}:</strong>{" "}
//             {JSON.stringify(entry.data?.content) ||
//               JSON.stringify(entry.data?.response)}
//           </div>
//         ))}
//       </div>

//       {/* Input and Send Button */}
//       <div style={{ display: "flex", gap: "10px" }}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message"
//           style={{ flex: "1", padding: "10px", fontSize: "16px" }}
//         />
//         <button
//           onClick={handleSend}
//           style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Page;
