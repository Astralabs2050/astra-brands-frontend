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
  if (sender) {
    return (
      <div className="flex gap-3 p-4 justify-end">
        <div className="w-[300px] text-[15px] bg-[#33333308] p-4 rounded-tl-lg rounded-tr-lg rounded-bl-lg overflow-x-auto break-words">
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
  return (
    <div className="gap-3 p-4 flex">
      {profile ? (
        <Image className="w-[30px] h-[30px]" src={profile} alt="profile" />
      ) : (
        <div className="w-[30px] h-[30px] bg-black rounded-[100%]"></div>
      )}
      <div className="w-[300px] text-[15px] bg-[#33333308] p-4 rounded-tl-lg rounded-tr-lg rounded-bl-lg overflow-x-auto break-words">
        {message}
      </div>
    </div>
  );
}

export default Message;
