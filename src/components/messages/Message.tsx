import Image from "next/image";
import React from "react";

function Message({
  message,
  sender,
  profile,
}: {
  message: string;
  sender: boolean;
  profile?: string;
}) {
  return (
    <div
      style={{
        justifyContent: sender ? "flex-end" : "flex-start",
      }}
      className="flex items-end gap-3 p-4"
    >
      <div className="w-[300px] text-[15px] bg-[#33333308] p-4 rounded-tl-lg rounded-tr-lg rounded-bl-lg ">
        {message}
      </div>
      {profile ? (
        <Image className="w-[30px] h-[30px]" src={profile} alt="profile" />
      ) : (
        <div className="w-[30px] h-[30px] bg-black rounded-[100%]"></div>
      )}
    </div>
  );
}

export default Message;
