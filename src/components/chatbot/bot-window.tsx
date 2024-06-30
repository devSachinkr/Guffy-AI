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
import TabsMenu from "../dashboard/settings/tabs-menu";
import { BOT_TABS_MENU } from "@/constants/menu-items";
import { TabsContent } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Paperclip, Send } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CardDescription, CardTitle } from "../ui/card";
import Bubble from "./bubble";
import Accordion from "../dashboard/settings/Accordion";
import Responding from "./responding";
// import Responding from "./responding";

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
    // console.log("chat : ",chats)
    return (
      <div className="h-[670px] w-[450px] flex flex-col rounded-xl mr-[80px] border-[1px] overflow-hidden">
        <div className="flex justify-between px-4 pt-4">
          <div className="flex gap-2">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex items-start flex-col">
              <h3 className="text-lg font-bold leading-none">
                Sales Rep - Web Prodigies
              </h3>
              <p className="text-sm">{domainName?.split(".com")[0]}</p>
              {realTimeMode?.mode && (
                <RealtimeMode
                  setChats={setChat}
                  chatRoomId={realTimeMode.chatRoom}
                />
              )}
            </div>
          </div>
          <div className="relative w-16 h-16">
            <Image
              src="https://ucarecdn.com/019dd17d-b69b-4dea-a16b-60e0f25de1e9/propuser.png"
              fill
              alt="users"
              objectFit="contain"
            />
          </div>
        </div>
        <TabsMenu
          triggers={BOT_TABS_MENU}
          className=" bg-transparent border-[1px] border-border m-2"
        >
          <TabsContent value="chat">
            <Separator orientation="horizontal" />
            <div className="flex flex-col h-full">
              <div
                style={{
                  background: theme || "",
                  color: textColor || "",
                }}
                className="px-3 flex h-[400px] flex-col py-5 gap-3 chat-window overflow-y-auto"
                ref={ref}
              >
                {chats.map((chat, key) => (
                  <Bubble key={key} message={chat} />
                ))}
                {onResponding && <Responding />}
              </div>
              <form
                onSubmit={onChat}
                className="flex px-3 py-1 flex-col flex-1 bg-porcelain"
              >
                <div className="flex justify-between items-center">
                  <Input
                    {...register("content")}
                    placeholder="Type your message..."
                    className="focus-visible:ring-0 flex-1 p-0 focus-visible:ring-offset-0 bg-porcelain 
                    rounded-xl pl-3 outline-none border-none font-semibold  text-black mr-2"
                  />
                  <Button type="submit">
                    <Send />
                  </Button>
                </div>
                <Label htmlFor="bot-image">
                  <Paperclip />
                  <Input
                    {...register("image")}
                    type="file"
                    id="bot-image"
                    className="hidden"
                  />
                </Label>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="helpdesk">
            <div className="h-[485px] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4">
              <div>
                <CardTitle>Help Desk</CardTitle>
                <CardDescription>
                  Browse from a list of questions people usually ask.
                </CardDescription>
              </div>
              <Separator orientation="horizontal" />

              {helpDesk?.map((desk) => (
                <Accordion
                  key={desk.id}
                  trigger={desk.question}
                  content={desk.answer}
                />
              ))}
            </div>
          </TabsContent>
        </TabsMenu>
        <div className="flex justify-center ">
          <p className="text-gray-400 text-xs">Powered By Guffy</p>
        </div>
      </div>
    );
  }
);

export default BotWindow;
BotWindow.displayName = "BotWindow";
