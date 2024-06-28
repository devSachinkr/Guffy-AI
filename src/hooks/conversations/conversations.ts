"use client";

import { getDomainChat, getDomainChatRooms } from "@/actions/conversation";
import { useChatContext } from "@/context/chat-context";
import { ConversationSearchSchema } from "@/schema/conversations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useConversations = () => {
  const { register, watch } = useForm({
    resolver: zodResolver(ConversationSearchSchema),
    mode: "onChange",
  });
  const {
    setLoading: loadingMessage,
    setChats,
    setChatRoom,
  } = useChatContext();
  const [chatRooms, setChatRooms] = useState<
    {
      chatRoom: {
        id: string;
        createdAt: Date;
        message: {
          message: string;
          createdAt: Date;
          seen: boolean;
        }[];
      }[];
      email: string | null;
    }[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const search = watch(async (data) => {
      setLoading(true);
      try {
        const rooms = await getDomainChatRooms(data.domain);
        if (rooms) {
          setChatRooms(rooms.chatRoom?.customer ?? []);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    });
    return () => search.unsubscribe();
  }, [watch]);
  const getActiveChatMessages = async (id: string) => {
    try {
      loadingMessage(true);
      const chat = await getDomainChat(id);
      if (chat) {
        setChatRoom(id);
        loadingMessage(false);
        // @ts-ignore
        setChats(chat?.chatRoom[0]?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    register,
    chatRooms,
    getActiveChatMessages,
    loading,
  };
};
