"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Socket } from "@/network/socket";
import { paymentIcon, searchIcon } from "@/image";
import LoaderSvg from "@/shared/LoaderSvg";
import ChatControl from "./ChatControl";
import ChatBox from "./ChatBox";
import User from "./User";
import { USER_PROFILE } from "@/network/constant";
import { Media, UserP } from "./MessageTypes";

import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";

export default function NewMessageFrame() {
  // Existing states
  const [isConnected, setIsConnected] = useState(false);
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
  const getUserId = () => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const userProfile = sessionStorage.getItem(USER_PROFILE);
      return userProfile ? JSON.parse(userProfile)?.id : null;
    } catch (error) {
      console.error("Error parsing USER_PROFILE from sessionStorage:", error);
      return null;
    }
  };

  const userId = getUserId();
  const isCreator = brandId?.user?.id === userId;

  useEffect(() => {
    Socket.emit("get_brands");

    Socket.on("brands", (data) => {
      console.log("data from the brands", data);
      setBrands(data);
    });
  }, []);
  // Existing useEffect for socket connections
  useEffect(() => {
    Socket.emit("connection");
    Socket.on("connection_status", (data: boolean) => {
      setIsConnected(data);
      console.log(data);
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

    // Clean up socket listeners
    return () => {
      Socket.off("connection_status");
      Socket.off("get_brands");
      Socket.off("previous_messages");
    };
  }, [brandId, userId]);

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
  //test

  const useFetchPreviousMessages = (userId: string, brandId: UserP | null) => {
    useEffect(() => {
      const fetchMessages = () => {
        if (!userId || !brandId) return;

        // alert("refreshed");
        const receiverId =
          brandId?.maker?.id === userId ? brandId?.userId : brandId?.maker?.id;

        Socket.emit("get_previous_messages", {
          senderId: userId,
          receiverId,
        });

        Socket.on("previous_messages", (data: []) => {
          const allMessages = data.map(
            (msg: {
              message: string;
              senderId: string;
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
      };

      // Trigger the function every 15 seconds
      const interval = setInterval(fetchMessages, 5000);

      // Call immediately on mount
      fetchMessages();

      // Clean up on component unmount
      return () => {
        clearInterval(interval);
        Socket.off("previous_messages");
      };
    }, [userId, brandId]);
  };

  // Rest of your existing code...
  useFetchPreviousMessages(userId, brandId);
  const client = useSuiClient();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const [isLoadingCM, setIsLoadingCM] = useState(false);
  const [walletBalance, setWalletBalance] = useState<string>("0");
  const [status, setStatus] = useState<string>("");
  console.log(isConnected, status);

  const escrowId =
    "0x728ec8fb40ac4cf68518472c9f9452b8c267ae2a6dc972a3f94600afd1a18caf";
  const PACKAGE_ID =
    "0xf4ce55ec4e19767b2b36f6928d687f9c781c2621453cb2714f9dfc4603bc64ac";
  const USDC_TYPE =
    "0xa1ec7fc00a6f40db9693ad1415d0c193ad3906494428cf252621037bd7117e29::usdc::USDC";

  const getEscrowBalance = async () => {
    if (!escrowId) {
      setStatus("No escrow ID available. Please create an escrow first.");
      return;
    }

    try {
      setStatus("Fetching escrow balance...");

      console.log("Fetching object state for escrow:", escrowId);
      const objectState = await client.getObject({
        id: escrowId,
        options: { showContent: true },
      });

      console.log("Received object state:", objectState);
      const content = objectState?.data?.content as
        | undefined
        | { fields: { usdc: string } };
      console.log("Content fields:", content?.fields);

      const balance = content?.fields?.usdc;
      console.log("Retrieved balance:", balance);

      if (balance !== undefined) {
        setWalletBalance(balance);
        setStatus(`Balance retrieved successfully: ${balance} USDC`);
      } else {
        console.error("Balance field not found in object structure");
        setStatus("Error: Could not locate balance field in escrow object");
      }
    } catch (error) {
      console.error("Error getting escrow balance:", error);
      setStatus("Error getting balance: ");
    }
  };

  const completeMilestone = async () => {
    if (!escrowId) {
      setStatus("No escrow ID available. Please create an escrow first.");
      return;
    }

    try {
      setIsLoadingCM(true);
      setStatus("Completing milestone...");

      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::escrow::complete_milestone`,
        typeArguments: [USDC_TYPE],
        arguments: [tx.object(escrowId)],
      });

      await new Promise((resolve, reject) => {
        signAndExecuteTransaction(
          { transaction: tx, chain: "sui:testnet" },
          {
            onSuccess: async (result) => {
              setStatus("Milestone completed successfully!");

              // Wait for transaction finality
              await new Promise((resolve) => setTimeout(resolve, 2000));

              // Fetch the updated balance
              await getEscrowBalance();
              resolve(result);
            },
            onError: (error) => {
              console.error("Transaction failed:", error);
              setStatus(
                "Error completing milestone. Check console for details."
              );
              reject(error);
            },
          }
        );
      });
    } catch (error) {
      console.error("Error completing milestone:", error);
      setStatus("Error completing milestone. Check console for details.");
    } finally {
      setIsLoadingCM(false);
    }
  };

  useEffect(() => {
    getEscrowBalance();
  }, []);

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
                  {brandId?.maker?.creator?.fullName}
                </p>
                <p className="text-[1.4rem]">Maker</p>
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
              {isLoadingCM ? (
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
              {isLoadingCM ? (
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
