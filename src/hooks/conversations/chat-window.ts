"use client";

import { messageOwner, realTimeChat } from "@/actions/conversation";
import { useChatContext } from "@/context/chat-context";
import { pusherClient } from "@/lib/pusher";
import { ChatBotMessageSchema } from "@/schema/conversations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
export const useChatWindow = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(ChatBotMessageSchema),
    mode: "onChange",
  });
  const { chatRoom, chats, loading, setChats } = useChatContext();
  const messageRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scroll({
        top: messageRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chats, messageRef]);

  const handelSentMessage = handleSubmit(
    async (values: z.infer<typeof ChatBotMessageSchema>) => {
      try {
        const res = await messageOwner(chatRoom!, values.content!, "ASSISTANT");
        if (res.status === 200 && res.chatRoom) {
          setChats((prev) => [...prev, res.chatRoom.message[0]]);
          await realTimeChat(
            chatRoom!,
            res.chatRoom.message[0].message,
            res.chatRoom.message[0].id,
            "ASSISTANT"
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  //   useEffect(() => {
  //       if(chatRoom){
  //         pusherClient.subscribe(chatRoom)
  //         pusherClient.bind('realtime-mode',(data:any)=>{
  //             setChats((prev)=>[...prev,data.chat])
  //         })
  //        return pusherClient.unsubscribe('realtime-mode')
  //       }
  //   },[chatRoom])
  return {
    handelSentMessage,
    messageRef,
    loading,
    register,
    chatRoom,
    chats,
  };
};
