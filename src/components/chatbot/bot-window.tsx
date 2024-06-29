import { ChatBotMessageProps } from "@/schema/conversations";
import { $Enums } from "@prisma/client";
import React, {
  BaseSyntheticEvent,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  forwardRef,
} from "react";
import { UseFormRegister } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RealtimeMode from "./realtime-mode";
import Image from "next/image";

type Props = {
  setChat: Dispatch<
    SetStateAction<
      {
        role: $Enums.Role | null;
        content: string;
        link?: string | undefined;
      }[]
    >
  >;
  realTimeMode:
    | {
        chatRoom: string;
        mode: boolean;
      }
    | undefined;
  helpDesk:
    | {
        id: string;
        question: string;
        answer: string;
        domainId: string | null;
      }[]
    | undefined;
  domainName: string | undefined;
  ref: MutableRefObject<HTMLDivElement | null>;
  help: boolean | undefined;
  theme: string | null | undefined;
  textColor: string | null | undefined;
  chats: {
    role: $Enums.Role | null;
    content: string;
    link?: string | undefined;
  }[];
  register: UseFormRegister<ChatBotMessageProps>;
  onChat: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  onResponding: boolean;
};

export const BotWindow = forwardRef<HTMLDivElement, Props>(
  ({
    setChat,
    realTimeMode,
    helpDesk,
    domainName,
    ref,
    help,
    theme,
    textColor,
    chats,
    register,
    onChat,
    onResponding,
  }) => {
    return (
      <div
        className="h-[670px] w-[450px]
    flex flex-col bg-white text-black rounded-xl mr-[80px] border-[1px] overflow-hidden"
      >
        <div className="flex justify-between px-4 pt-4">
          <div className="flex-gap-2">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex items-start flex-col">
              <h3 className="text-lg leading-none font-bold ">
                Sales Rep - Guffy AI
              </h3>
              <p className="text-sm">{domainName?.split(".com")[0]}</p>
              {realTimeMode?.mode && (
                <RealtimeMode
                  setChats={setChat}
                  chatRoomId={realTimeMode?.chatRoom}
                />
              )}
            </div>
          </div>
          <div className="relative w-16 h-16 ">
            <Image
              src={"/image/prop-user.png"}
              fill
              alt="users"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    );
  }
);

export default BotWindow;
BotWindow.displayName = "BotWindow";
