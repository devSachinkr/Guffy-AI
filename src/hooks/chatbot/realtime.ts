"use client";
// import { pusherClient } from "@/lib/pusher";
import { $Enums } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect } from "react";

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
export const useRealtime = ({ chatRoomId, setChats }: Props) => {
//   useEffect(() => {
//     pusherClient.subscribe(chatRoomId);
//     pusherClient.bind("realtime-mode", (data: any) => {
//       setChats((prev) => [
//         ...prev,
//         {
//           role: data.chat.role,
//           content: data.chat.content,
//         },
//       ]);
//     });
//     return () => {
//       pusherClient.unsubscribe("realtime-mode");
//     };
//   }, []);
};
