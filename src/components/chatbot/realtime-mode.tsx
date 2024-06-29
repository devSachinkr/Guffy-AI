"use client";
import { useRealtime } from "@/hooks/chatbot/realtime";
import { $Enums } from "@prisma/client";
import React, { Dispatch, SetStateAction } from "react";
import { Card } from "../ui/card";

type Props = {
  setChats: Dispatch<
    SetStateAction<
      {
        role: $Enums.Role | null;
        content: string;
        link?: string | undefined;
      }[]
    >
  >;
  chatRoomId: string;
};

const RealtimeMode = ({ chatRoomId, setChats }: Props) => {
  useRealtime({ chatRoomId, setChats });
  return <Card className="px-3 rounded-full py-1 bg-lime-500 foont-bold text-white text-sm">
    Real Time
  </Card>;
};

export default RealtimeMode;
