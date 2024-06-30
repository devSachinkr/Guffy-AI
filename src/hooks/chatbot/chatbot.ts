"use client";

import { aiChatbotAssistant, getChatBot } from "@/actions/chatbot";
import { upload } from "@/lib/upload-care";
import { postToParent } from "@/lib/utils";
import {
  ChatBotMessageProps,
  ChatBotMessageSchema,
} from "@/schema/conversations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export const useChatbot = () => {
  const { register, handleSubmit, reset } = useForm<ChatBotMessageProps>({
    resolver: zodResolver(ChatBotMessageSchema),
  });
  const [currentChatbot, setCurrentChatbot] = useState<
    | {
        name: string;
        chatBot: {
          id: string;
          icon: string | null;
          welcomeMessage: string | null;
          background: string | null;
          textColor: string | null;
          helpdesk: boolean;
        } | null;
        helpdesk: {
          id: string;
          question: string;
          answer: string;
          domainId: string | null;
        }[];
      }
    | undefined
  >(undefined);
  const messageRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const openChatBot = () => setOpen((prev) => !prev);
  const [loading, setLoading] = useState<boolean>(false);
  const [onChats, setOnChats] = useState<
    {
      role: Role | null;
      content: string;
      link?: string;
    }[]
  >([]);
  const [aiTyping, setAiTyping] = useState<boolean>(false);
  const [currBotId, setCurrBotId] = useState<string>("");
  const [realTimeMode, setRealTimeMode] = useState<
    | {
        chatRoom: string;
        mode: boolean;
      }
    | undefined
  >(undefined);

  const scrollToBottom = () => {
      messageRef?.current?.scroll({
        behavior: "smooth",
        left: 0,
        top: messageRef.current.scrollHeight,
      });
  };
  useEffect(() => {
    scrollToBottom();
  }, [onChats, messageRef]);

  useEffect(() => {
    postToParent(
      JSON.stringify({
        width: open ? 550 : 80,
        height: open ? 800 : 80,
      })
    );
  }, [open]);


  const getDomainChatBot = async (botId: string) => {
    console.log(botId)
    setLoading(true);
    setCurrBotId(botId);
    const res = await getChatBot(botId);
    console.log(res)
    if (res) {
      setOnChats((prev) => [
        ...prev,
        {
          role: "ASSISTANT",
          content: res.chatbot?.chatBot?.welcomeMessage || "",
        },
      ]);
      setCurrentChatbot(res.chatbot);
      setLoading(false);
    }
  };
  let limitReq = 0;
 
  useEffect(() => {
    window.addEventListener('message', (e) => {
      console.log(e.data)
      const botid = e.data
      if (limitReq < 1 && typeof botid == 'string') {
        getDomainChatBot(botid)
        limitReq++
      }
    })
  }, [])
  const startChating = handleSubmit(async (data: ChatBotMessageProps) => {
    reset();
    if (data.image.length) {
      const image = await upload.uploadFile(data.image[0]);
      setOnChats((prev) => [
        ...prev,
        {
          role: "USER",
          content: image.uuid,
        },
      ]);
      setAiTyping(true);
      const res = await aiChatbotAssistant(
        currBotId!,
        onChats,
        "USER",
        image.uuid
      );
      if (res) {
        setAiTyping(false);
        if (res.live) {
          setRealTimeMode((prev) => ({
            ...prev,
            chatRoom: res.chatRoom,
            mode: res.live,
          }));
        } else {
          setOnChats((prev: any) => [...prev, res.response]);
        }
      }
    }
    if (data.content) {
      setOnChats((prev:any) => [...prev, { role: "USER", content: data.content }]);
      setAiTyping(true);
      const res = await aiChatbotAssistant(currBotId!, onChats, "USER",data.content);
      if (res) {
        setAiTyping(false);
        if (res.live) {
          setRealTimeMode((prev) => ({
            ...prev,
            chatRoom: res.chatRoom,
            mode: res.live,
          }));
        } else {
          setOnChats((prev: any) => [...prev, res.response]);
        }
      }
    }
  });

  
  return {
    register,
    reset,
    currentChatbot,
    setCurrentChatbot,
    messageRef,
    open,
    setOpen,
    openChatBot,
    loading,
    setLoading,
    onChats,
    setOnChats,
    aiTyping,
    setAiTyping,
    currBotId,
    setCurrBotId,
    realTimeMode,
    setRealTimeMode,
    startChating,
  };
};
