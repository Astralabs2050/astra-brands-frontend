"use client";

import {
  astraCoin,
  creativeSpaceIcon,
  dashboardIcon,
  designsIcon,
  helpAndSupportIcon,
  logo,
  messageIcon,
  minimizeIcon,
  myStoreIcon,
  notificationIcon,
  settingsIcon,
} from "@/image";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Button from "./Button";

interface DashboardFrameProps {
  children: React.ReactNode;
  withSideBar?: boolean;
  noActions?: boolean;
}

export default function DashboardFrame({
  children,
  withSideBar,
  noActions,
}: DashboardFrameProps) {
  const route = useRouter();
  const pathname = usePathname();
  const [minimize, setMinimize] = useState<boolean>(false);
  return (
    <div className="w-[100vw] overflow-x-hidden">
      <div className="flex justify-between items-center py-[1.2rem] pr-[10rem] pl-[5rem] border-b">
        <div>
          <Image src={logo} alt="logo" height={30} width={150} />
        </div>
        <div className="flex items-center gap-x-[3rem]">
          <div>
            <Image src={notificationIcon} alt="logo" height={25} width={25} />
          </div>
          {noActions || (
            <div className="group relative flex items-center px-[3rem] py-[.8rem] rounded-full gap-x-[.8rem] bg-astraBorderGrey cursor-pointer overflow-hidden">
              <div>
                <Image src={astraCoin} alt="logo" height={30} width={30} />
              </div>
              <p className="text-[1.8rem]">
                0.00 <span className="text-[1.8rem] font-[500]">ASTRAS</span>
              </p>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-semibold">
                  Coin Launching Soon!
                </span>
              </div>
            </div>
          )}

          {noActions || (
            <Button
              action="Chat with agent"
              width="w-[17rem]"
              handleClick={() => route.push("/agent")}
              fontSize="text-[1.5rem]"
              rounded
              backgroundColor="bg-astraBlue"
            />
          )}
        </div>
      </div>
      <div className="flex">
        {withSideBar && (
          <div className="px-[1.6rem] pt-[2rem] pb-[5rem] border-r w-[max-content]">
            <Image
              src={minimizeIcon}
              alt="logo"
              height={24}
              width={24}
              onClick={() => {
                setMinimize((prev) => !prev);
              }}
              className={`cursor-pointer transition-all duration-200 ease-in ${
                minimize && "rotate-180"
              }`}
            />
            <div className="mt-[1.5rem]">
              {[
                {
                  name: "Dashboard",
                  icon: dashboardIcon,
                  activeIcon: dashboardIcon,
                  url: "/dashboard",
                  active: pathname === "/dashboard",
                },
                // {
                //   name: "My Creative Space",
                //   icon: creativeSpaceIcon,
                //   activeIcon: activeCreativeSpaceIcon,
                //   url: "/my-creative-space",
                //   active:
                //     pathname === "/my-creative-space" ||
                //     pathname === "/generate-designs",
                // },
                {
                  name: "AI agent",
                  icon: creativeSpaceIcon,
                  activeIcon: creativeSpaceIcon,
                  url: "/agent",
                  active: pathname === "/agent",
                },
                {
                  name: "My Designs",
                  icon: designsIcon,
                  activeIcon: designsIcon,
                  url: "/my-designs",
                  active:
                    pathname === "/my-designs" ||
                    pathname === "/applicants" ||
                    pathname === "/application-details",
                },
                {
                  name: "Store Analytics",
                  icon: myStoreIcon,
                  activeIcon: myStoreIcon,
                  url: "/store-analytics",
                  active: pathname === "/store-analytics",
                },
                {
                  name: "Messages",
                  icon: messageIcon,
                  activeIcon: messageIcon,
                  url: "/messages",
                  active: pathname === "/messages",
                },
                {
                  name: "Account Settings",
                  icon: settingsIcon,
                  activeIcon: settingsIcon,
                  url: "/account-settings",
                  active:
                    pathname === "/account-settings" ||
                    pathname === "/profile-settings" ||
                    pathname === "/security-settings" ||
                    pathname === "/notification-settings",
                },
                {
                  name: "Help & Support",
                  icon: helpAndSupportIcon,
                  activeIcon: helpAndSupportIcon,
                  url: "/support",
                  active: pathname === "/support",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-x-[2rem]  ${
                    minimize ? "w-[6rem]  pl-[2rem]" : "w-[24.8rem] pl-[2.5rem]"
                  }  py-[1.8rem] cursor-pointer mb-[1.5rem] ${
                    item.active ? "bg-[#ececed] rounded-[1rem]" : ""
                  } ${index === 7 && "mt-[10rem]"} `}
                  onClick={() => route.push(item.url)}
                >
                  <div>
                    <Image
                      src={item.active ? item.activeIcon : item.icon}
                      alt="logo"
                      height={20}
                      width={20}
                    />
                  </div>
                  {minimize || (
                    <p
                      className={`text-[1.6rem] ${
                        item.active
                          ? "text-black"
                          : index === 1
                          ? "text-astraBlue"
                          : "text-black"
                      }`}
                    >
                      {item.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
