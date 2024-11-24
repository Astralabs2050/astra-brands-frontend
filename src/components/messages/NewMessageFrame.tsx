"use client";

import { paymentIcon, searchIcon } from "@/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWalletBalance } from "@/network/messaging";
import LoaderSvg from "@/shared/LoaderSvg";
import { Socket } from "@/network/socket";
import toast from "react-hot-toast";
import ChatControl from "./ChatControl";
import ChatBox from "./ChatBox";
import User from "./User";
import { USER_PROFILE } from "@/network/constant";
import { Media, UserP } from "./MessageTypes";

export default function NewMessageFrame() {
  const shopperAddress =
    "GDL5LVUDI2GEA765TFFMEHH3KVLR63IE3OCRIJAZM7N3LM6NYADAYKBG";
  const [isConnected, setIsConnected] = useState(false);
  console.log(isConnected);
  const [messageBox, setMessageBox] = useState("");
  const [chatMessages, setChatMessages] = useState<
    {
      message: string;
      receiverProfile?: string;
      senderProfile?: string;
      sender: boolean;
    }[]
  >([]);
  const [brands, setBrands] = useState<UserP[]>([]);
  const [brandId, setBrandId] = useState<UserP | null>(null);
  const [isLoadingMileStone, setIsLoadingMileStone] = useState(false);
  console.log(brandId);
  // Wallet balance query
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["balance", shopperAddress],
    queryFn: () => getWalletBalance(shopperAddress),
  });
  const walletBalance =
    data && !error === true && !("error" in data) ? data.balance : null;

  useEffect(() => {
    Socket.emit("connection");

    Socket.on("connection_status", (data: boolean) => {
      setIsConnected(data);
    });

    Socket.on("privateMessage", () => {
      Socket.emit("get_previous_messages", {
        senderId: userId,
        receiverId:
          brandId?.maker?.id === userId ? brandId?.userId : brandId?.maker?.id,
      });
    });

    Socket.emit("get_previous_messages", {
      senderId: userId,
      receiverId:
        brandId?.maker?.id === userId ? brandId?.userId : brandId?.maker?.id,
    });

    Socket.on("previous_messages", (data: []) => {
      const allMessages = data.map(
        (msg: {
          message: string;
          senderId: { media: Media[] };
          receiver: { media: Media };
          sender: { media: Media };
        }) => ({
          message: msg?.message,
          sender: msg?.senderId === userId,
          receiverProfile: msg?.receiver?.media?.link,
          senderProfile: msg?.sender?.media?.link,
        })
      );
      setChatMessages(allMessages);
    });

    return () => {
      Socket.off("connection_status");
      Socket.off("get_brands");
      Socket.off("previous_messages");
    };
  }, [brandId]);

  useEffect(() => {
    Socket.emit("get_brands");

    Socket.on("brands", (data) => {
      setBrands(data);
    });
  }, []);

  const sendMessage = () => {
    const tempMessage = {
      message: messageBox,
      sender: true,
    };

    setChatMessages((prevMessages) => [...prevMessages, tempMessage]);
    setMessageBox("");

    Socket.emit(
      "privateMessage",
      {
        receiverId:
          brandId?.maker?.id === userId ? brandId?.userId : brandId?.maker?.id,
        senderId: userId,
        createdAt: Date.now(),
        type: "text",
        message: tempMessage.message,
      },
      (response: { success: boolean; error?: string }) => {
        if (!response.success) {
          setChatMessages((prevMessages) =>
            prevMessages.filter((msg) => msg !== tempMessage)
          );
          console.error("Failed to send message:", response.error);
        }
      }
    );
  };

  const completeMilestone = async () => {
    setIsLoadingMileStone(true);
    try {
      const response = await fetch("/api/complete-milestone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: shopperAddress,
        }),
      });
      const data = await response.json();
      toast.success(data.status);
      setIsLoadingMileStone(false);
      refetch();
    } catch (err) {
      console.error("Failed to complete milestone", err);
      toast.error("Failed to complete milestone");
      setIsLoadingMileStone(false);
    }
  };
  const getUserId = () => {
    try {
      const userProfile = window && sessionStorage.getItem(USER_PROFILE);
      return userProfile ? JSON.parse(userProfile)?.id : null;
    } catch (error) {
      console.error("Error parsing USER_PROFILE from sessionStorage:", error);
      return null;
    }
  };

  const userId = getUserId();
  const isCreator = brandId?.user?.id === userId;
  return (
    <div className="flex w-[100%] bg-white">
      <div className="w-[25%] px-[2rem] py-[4rem] border-r">
        <div className="px-[2rem] py-[1.6rem] rounded-full border flex items-center justify-between w-[100%]">
          <input
            placeholder="Search Messages"
            className="text-[1.6rem] bg-transparent outline-none"
          />
          <Image src={searchIcon} alt="Search" width={24} height={24} />
        </div>
        <div className="h-[80vh] mt-2 overflow-y-auto">
          {brands.map((brand, i) => (
            <User
              key={i}
              user={brand}
              brandId={brandId}
              setBrandId={setBrandId}
            />
          ))}
        </div>
      </div>
      {brandId && (
        <div className="w-[75%] flex flex-col justify-between">
          <div className="flex items-center justify-between px-[3.2rem] py-[1.6rem] border-b">
            <div className="flex items-center ">
              {isCreator && brandId?.user?.media[0]?.link ? (
                <Image
                  src={brandId?.user?.media[0]?.link}
                  alt=""
                  width={56}
                  height={56}
                  className="rounded-full mr-[1.2rem]"
                />
              ) : brandId?.maker?.media?.link || brandId?.maker?.media?.link ? (
                <Image
                  src={
                    brandId?.maker?.media?.link || brandId?.maker?.media?.link
                  }
                  alt=""
                  width={56}
                  height={56}
                  className="rounded-full mr-[1.2rem]"
                />
              ) : null}
              <div>
                <p className="font-bold text-[1.8rem]">
                  {isCreator
                    ? brandId?.user?.creator?.fullName ||
                      brandId?.user?.brand?.username
                    : brandId?.maker?.creator?.fullName ||
                      brandId?.maker?.brand?.username}
                </p>
                <p className="text-[1.4rem]">
                  {isCreator
                    ? brandId?.user?.creator?.category[0] || "Creator"
                    : brandId?.maker?.creator?.category[0] || "Brand"}
                </p>
              </div>
            </div>
            <div className="flex px-[2rem] py-[1rem] items-center bg-[radial-gradient(44.96%_391.37%_at_49.64%_50%,_#3F37C9_2.67%,_#4361EE_100%)] rounded-full w-[max-content]">
              <Image
                src={paymentIcon}
                alt=""
                width={24}
                height={24}
                className="rounded-full mr-[1.2rem]"
              />
              {isPending ? (
                <LoaderSvg color="#ffffff" />
              ) : (
                <p className="text-[1.8rem] text-white">${walletBalance}</p>
              )}
            </div>
          </div>
          <ChatBox messages={chatMessages} />
          <div className="flex items-center justify-between px-[3rem] py-[1.6rem] border-t">
            <ChatControl
              sendMessage={sendMessage}
              messageBox={messageBox}
              setMessageBox={setMessageBox}
            />
            <button
              onClick={completeMilestone}
              className="border rounded-full text-[1.4rem] py-[1.5rem] px-[1.2rem] border-black min-w-[18rem]"
            >
              {isLoadingMileStone ? (
                <div className="flex items-center justify-center">
                  <LoaderSvg color="#000000" />
                </div>
              ) : (
                "Milestone Completed"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
