"use client";

import { viewUnreadMessages } from "@/actions/conversation";
import { useChatContext } from "@/context/chat-context";
import { getMonthName } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useChat = (createdAt: Date, roomId: string) => {
  const { chatRoom } = useChatContext();
  const [messageSentAt, setMessageSentAt] = useState<string>();
  const [urgent, setUrgent] = useState<boolean>(false);

  const setMessageReceived = () => {
    const dt = new Date(createdAt);
    const now = new Date();
    const currentDate = now.getDate();
    const hr = now.getHours();
    const min = now.getMinutes();
    const date = dt.getDate();
    const month = dt.getMonth();
    const diff = currentDate - date;
    if (diff <= 0) {
      setMessageSentAt(`${hr}:${min}${hr > 12 ? "PM" : "AM"}`);
      if (now.getHours() - dt.getHours() < 2) {
        setUrgent(true);
      }
    } else {
      setMessageSentAt(`${date}${getMonthName(month)}`);
    }
  };
  const seenChat = async () => {
    if (chatRoom === roomId && urgent) {
      await viewUnreadMessages(roomId);
      setUrgent(false);
    }
  };
  useEffect(() => {
    seenChat();
  }, [chatRoom]);
  useEffect(() => {
    setMessageReceived();
  }, []);

  return { messageSentAt, urgent, seenChat };
};
