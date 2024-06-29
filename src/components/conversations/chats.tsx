"use client";
import { useChat } from "@/hooks/conversations/chat";
import { useChatWindow } from "@/hooks/conversations/chat-window";
import React from "react";
import { Loader } from "../global/loader";
import Bubble from "../chatbot/bubble";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Paperclip } from "lucide-react";

type Props = {};

const Chats = (props: Props) => {
  const { chatRoom, chats, loading, handelSentMessage, messageRef, register } =
    useChatWindow();
  return (
    <div className="flex-1 flex flex-col h-0 relative">
      <div className="flex-1 h-0 w-full flex flex-col">
        <Loader loading={loading}>
          <div
            ref={messageRef}
            className="w-full flex-1 h-0 flex flex-col gap-3 pl-5 py-5 chat-window overflow-y-auto"
          >
            {chats.length ? (
              chats.map((chat, index) => (
                <Bubble
                  key={index}
                  message={{
                    role: chat.role,
                    message: chat.message,
                  }}
                  createdAt={chat.createdAt}
                />
              ))
            ) : (
              <div>NO! ( Chat selected ).</div>
            )}
          </div>
        </Loader>
      </div>
      <form
        onSubmit={handelSentMessage}
        className="flex px-3 pt-3 pb-10  flex-col backdrop-blur-sm bg-muted w-full"
      >
        <div className="flex justify-between">
          <Input
            {...register("content")}
            placeholder="Send a message..."
            className="focus-visible:ring-0 flex-1 p-0
        focus-visible:ring-offset-0 bg-muted rounded-none outline-none border-none
        "
          />
          <Button type="submit" className="mt-3 px-7
          bg-stone-800 hover:bg-stone-700
          text-white"
           disabled={!chatRoom}>
            Send
          </Button>
        </div>
        <span>
          <Paperclip className="text-muted-foreground" />
        </span>
      </form>
    </div>
  );
};

export default Chats;
