"use client";
import { useChat } from "@/hooks/conversations/chat";
import { useChatWindow } from "@/hooks/conversations/chat-window";
import React from "react";
import { Loader } from "../global/loader";
import Bubble from "../chatbot/bubble";

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
              <div>NO!  ( Chat selected ).</div>
            )}
          </div>
        </Loader>
      </div>
    </div>
  );
};

export default Chats;
