"use server";
import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";

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
      message: `${
        res.live ? "Realtime mode started" : "Realtime mode Stopped"
      } `,
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

export const getDomainChatRooms = async (id: string) => {
  const user = await currentUser();
  if (!user) {
    return { status: 404, message: "sign in required" };
  }
  try {
    const res = await prisma.domain.findUnique({
      where: { id },
      select: {
        customer: {
          select: {
            email: true,
            chatRoom: {
              select: {
                id: true,
                createdAt: true,
                message: {
                  select: {
                    message: true,
                    createdAt: true,
                    seen: true,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
    if (!res)
      return {
        status: 404,
        message: "Room not found",
      };
    return {
      status: 200,
      message: "success",
      chatRoom: res,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};

export const getDomainChat = async (id: string) => {
  const user = await currentUser();
  if (!user) {
    return { status: 404, message: "sign in required" };
  }
  try {
    const res = await prisma.chatRoom.findMany({
      where: { id },
      select: {
        id: true,
        live: true,
        message: {
          select: {
            message: true,
            seen: true,
            id: true,
            createdAt: true,
            role: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    if (!res)
      return {
        status: 404,
        message: "Room not found",
      };
    return {
      status: 200,
      message: "success",
      chatRoom: res,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};

export const viewUnreadMessages = async (id: string) => {
  try {
    await prisma.chatMessage.updateMany({
      where: {
        chatRoomId: id,
      },
      data: {
        seen: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const messageOwner = async (id: string, content: string, role: Role) => {
  const user = await currentUser();
  if (!user) {
    return { status: 404, message: "sign in required" };
  }

  try {
    const res = await prisma.chatRoom.update({
      where: {
        id,
      },
      data: {
        message: {
          create: {
            role,
            message: content,
          },
        },
      },
      select: {
        message: {
          select: {
            id: true,
            role: true,
            seen: true,
            createdAt: true,
            message: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (!res)
      return {
        status: 404,
        message: "Room not found",
      };
    return {
      status: 200,
      message: "Success",
      chatRoom: res,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};

export const realTimeChat = async (
  chatRoomId: string,
  message: string,
  id: string,
  role: Role|null
) => {
  // pusherServer.trigger(chatRoomId, "realtime-mode", {
  //   chat: {
  //     message,
  //     id,
  //     role,
  //   },
  // });
};
