"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { AlertCircle, Check, Send, Image, Loader } from "lucide-react";
import { TOKEN_NAME } from "@/network/constant";
import LoaderSvg from "@/shared/LoaderSvg";

// Types
interface DesignData {
  designId?: string;
  images?: string[];
}

// Define the nested data structure
interface ResponseData {
  data: DesignData;
  message?: string;
  status?: boolean;
}

// Update the socket response interface
interface SocketResponse {
  content?: string;
  response?: string;
  nextevent?: string;
  data?: ResponseData;
  status?: boolean;
}

// Message interface remains the same since it represents how we want to store the data
interface Message {
  id: string;
  type: "ask" | "success" | "error" | "user";
  data: {
    response: string;
    images?: string[];
    designId?: string;
  };
  timestamp: Date;
}
const AgentChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [nextEvent, setNextEvent] = useState<string>("greeting");
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Socket initialization code remains the same
  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_NAME) ?? "";
    if (!token) {
      setError("Authentication token not found");
      return;
    }

    const newSocket = io("https://render-backend-drm4.onrender.com", {
      extraHeaders: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      setIsConnecting(false);
      setError(null);
      newSocket.emit("create", { response: "start" });
    });

    newSocket.on("connect_error", (err) => {
      setError(`Connection error: ${err.message}`);
      setIsConnecting(false);
    });

    newSocket.on("disconnect", () => {
      setError("Disconnected from server");
    });

    const handleSocketEvent =
      (type: Message["type"]) => (data: SocketResponse) => {
        if (data?.nextevent) {
          setNextEvent(data.nextevent);
        }
        console.log("Received data:", data);

        // Handle design response with images
        const newMessage: Message = {
          id: crypto.randomUUID(),
          type,
          data: {
            response: data?.content || data?.response || "",
            // Handle nested data structure
            images: data?.data?.data?.images || [],
            designId: data?.data?.data?.designId || "",
          },
          timestamp: new Date(),
        };

        console.log("Processed message:", newMessage); // Debug log
        setMessages((prev) => [...prev, newMessage]);
      };

    newSocket.on("ask", handleSocketEvent("ask"));
    newSocket.on("success", handleSocketEvent("success"));
    newSocket.on("error", handleSocketEvent("error"));

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("greeting");
    }
  }, [socket]);

  const MessageContent = ({ message }: { message: Message }) => {
    // First check if it's a user-uploaded image
    if (message.type === "user" && isBase64Image(message.data.response)) {
      return (
        <img
          src={message.data.response}
          alt="User uploaded"
          className="max-w-full h-auto rounded-md mb-2"
          onError={(e) => {
            console.error("Image failed to load:", e);
            e.currentTarget.src = "/placeholder-image.jpg"; // Add a placeholder image
          }}
        />
      );
    }

    // Then check for AI-generated design images
    if (message.data.images && message.data.images.length > 0) {
      return (
        <div className="space-y-4">
          {message.data.response && (
            <p className="break-words text-[1.4rem]">{message.data.response}</p>
          )}
          <div className="grid grid-cols-2 gap-4">
            {message.data.images.map((imageUrl, index) => (
              <div
                key={`${message.id}-image-${index}`}
                className="relative border rounded-lg overflow-hidden"
              >
                <img
                  src={imageUrl}
                  alt={`Design option ${index + 1}`}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    console.error("Design image failed to load:", e);
                    e.currentTarget.src = "/placeholder-image.jpg";
                  }}
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  Option {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Regular text message
    return <p className="break-words text-[1.4rem]">{message.data.response}</p>;
  };

  // Other handler functions remain the same
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Add file size check
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setSelectedImage(result);
        }
      };
      reader.onerror = (e) => {
        console.error("Error reading file:", e);
        alert("Error reading image file");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = useCallback(() => {
    if (!socket || (!inputMessage && !selectedImage)) return;

    const response = selectedImage || inputMessage;
    const newMessage: Message = {
      id: crypto.randomUUID(),
      type: "user",
      data: {
        response,
        images: selectedImage ? [selectedImage] : undefined,
      },
      timestamp: new Date(),
    };

    socket.emit(nextEvent, { response });
    setMessages((prev) => [...prev, newMessage]);

    setInputMessage("");
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [socket, inputMessage, nextEvent, selectedImage]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const MessageIcon = ({ type }: { type: Message["type"] }) => {
    switch (type) {
      case "success":
        return <Check className="w-4 h-4 text-green-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };
  const isBase64Image = (str: string) => {
    return str.startsWith("data:image");
  };

  console.log(selectedImage);

  return (
    <div className="flex flex-col h-screen bg-gray-50 w-[100%]">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <h1 className="text-2xl font-bold">Astra AI</h1>
      </div>

      {/* Connection Status */}
      {(isConnecting || error) && (
        <div className="bg-white border-b">
          {isConnecting && (
            <div className="flex items-center gap-2 text-blue-500 p-4">
              <Loader className="w-4 h-4 animate-spin" />
              <span>Connecting...</span>
            </div>
          )}

          {error && <div className="bg-red-50 text-red-500 p-4">{error}</div>}
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <MessageIcon type={message.type} />
            <div
              className={`max-w-[70%] rounded-lg py-3 px-4 ${
                message.type === "user" ? "bg-[#1d40c8] text-white" : "bg-white"
              }`}
            >
              <MessageContent message={message} />
              <span className="opacity-70 mt-1 block text-[1.1rem]">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
            {nextEvent === "" && <LoaderSvg color="#000000" />}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Fixed Input Area */}
      <div className="bg-white border-t p-8">
        {/* Image Preview */}
        {selectedImage && (
          <div className="mb-4 relative inline-block">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-h-32 rounded-md"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        )}

        {/* Input Controls */}
        <div className="flex gap-2">
          <label className="min-w-[5rem] cursor-pointer bg-gray-100 p-2 rounded-md hover:bg-gray-200 flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              ref={fileInputRef}
            />
            <Image className=" h-6 text-gray-600" />
          </label>
          <input
            type={nextEvent === "timeline" ? "date" : "text"}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 text-[1.4rem] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!socket || isConnecting}
          />

          <button
            onClick={handleSend}
            disabled={
              !socket ||
              isConnecting ||
              (!inputMessage.trim() && !selectedImage)
            }
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentChat;
