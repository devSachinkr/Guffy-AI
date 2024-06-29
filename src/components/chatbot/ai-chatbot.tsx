"use client";
import { useChatbot } from "@/hooks/chatbot/chatbot";
import BotWindow from "./bot-window";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BotIcon } from "@/icons/bot-icon";

type Props = {};

const AiChatbot = (props: Props) => {
  const {
    register,
    currentChatbot,
    messageRef,
    open,
    onChats,
    setOnChats,
    aiTyping,
    realTimeMode,
    startChating,
    loading,
    openChatBot
  } = useChatbot();
  return (
    <div className="h-screen flex flex-col justify-end items-end gap-4">
      {open && (
        <BotWindow
          setChat={setOnChats}
          realTimeMode={realTimeMode}
          helpDesk={currentChatbot?.helpdesk}
          domainName={currentChatbot?.name}
          ref={messageRef}
          help={currentChatbot?.chatBot?.helpdesk}
          theme={currentChatbot?.chatBot?.background}
          textColor={currentChatbot?.chatBot?.textColor}
          chats={onChats}
          register={register}
          onChat={startChating}
          onResponding={aiTyping}
        />
      )}
      <div
        className={cn(
          "rounded-full relative cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-lime-500",
          loading ? "invisible" : "visible"
        )}
        onClick={openChatBot}
      >
        {currentChatbot?.chatBot?.icon ? (
          <Image
            src={`https://ucarecdn.com/${currentChatbot.chatBot.icon}/`}
            alt="chatbot icon"
            width={80}
            height={80}
            className="rounded-full cursor-pointer shadow-md aspect-square"
          />
        ):(
          <BotIcon/>
        )}
      </div>
    </div>
  );
};

export default AiChatbot;
