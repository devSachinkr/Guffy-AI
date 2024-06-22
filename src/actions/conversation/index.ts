"use server";
import { prisma } from "@/lib/prisma";

export const toggleRealTime = async (id: string, state: boolean) => {
  try {
    const res = await prisma.chatRoom.update({
      where: { id },
      data: {
        live: state,
      },
      select: {
        id: true,
        live: true,
      },
    });
    if (!res)
      return {
        status: 404,
        message: "Room not found",
      };
    return {
      status: 200,
      message: `${res.live ? "Realtime mode started" : "Stopped"} `,
      chatRoom: res.live,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};

export const getConversationMode = async (id: string) => {
  try {
    const res = await prisma.chatRoom.findUnique({
      where: { id },
      select: {
        live: true,
      },
    });
    if (!res)
      return {
        status: 404,
        message: "Room not found",
      };
    return {
      status: 200,
      message: `${res.live ? "Realtime mode started" : "Realtime mode Stopped"} `,
      chatRoom: res.live,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};
