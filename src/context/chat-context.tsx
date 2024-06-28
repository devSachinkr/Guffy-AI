"use client";

import { Role } from "@prisma/client";
import React, { useState } from "react";

type ChatInitialValuesProps = {
  realtime: boolean;
  setRealtime: React.Dispatch<React.SetStateAction<boolean>>;
  chatRoom: string | undefined;
  setChatRoom: React.Dispatch<React.SetStateAction<string | undefined>>;
  chats: {
    message: string;
    id: string;
    role: Role | null;

    createdAt: Date;
    seen: boolean;
  }[];
  setChats: React.Dispatch<
    React.SetStateAction<
      {
        message: string;
        id: string;
        role: Role | null;
        createdAt: Date;
        seen: boolean;
      }[]
    >
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialValue: ChatInitialValuesProps = {
  chatRoom: undefined,
  chats: [],
  realtime: false,
  setRealtime: () => {},
  setChatRoom: () => {},
  setChats: () => {},
  loading: false,
  setLoading: () => {},
};

const chatContext = React.createContext(initialValue);

const { Provider } = chatContext;

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(initialValue.loading);
  const [realtime, setRealtime] = useState(initialValue.realtime);
  const [chatRoom, setChatRoom] = useState(initialValue.chatRoom);
  const [chats, setChats] = useState(initialValue.chats);

  const value = {
    loading,
    setLoading,
    realtime,
    setRealtime,
    chatRoom,
    setChatRoom,
    chats,
    setChats,
  };
  return <Provider value={value}>{children}</Provider>;
};

export const useChatContext = () => {
  const context = React.useContext(chatContext);

  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }

  return context;
};
