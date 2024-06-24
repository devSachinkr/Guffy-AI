"use server";

import { clerkClient, currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
export const getSubscriptionPlan = async () => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Sign in required");
    const res = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (res) return res.subscription?.plan;
    else return null;
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllAccDomain = async () => {
  const user = await currentUser();
  if (!user) return null;
  try {
    const res = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        domains: {
          select: {
            name: true,
            icon: true,
            id: true,
            customer: {
              select: {
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!res) throw new Error("user not found");
    return { ...res };
  } catch (error) {
    console.log(error);
  }
};

export const integrateDomain = async (domain: string, icon: string) => {
  const user = await currentUser();
  if (!user) return;
  try {
    const res = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        _count: {
          select: {
            domains: true,
          },
        },
      },
    });

    const domianAlreadyExist = await prisma.user.findFirst({
      where: { clerkId: user.id, domains: { some: { name: domain } } },
    });
    if (!domianAlreadyExist) {
      console.log(res?.subscription?.plan, res?._count?.domains);
      if (
        (res?.subscription?.plan === "STANDARD" && res?._count?.domains < 1) ||
        (res?.subscription?.plan === "PRO" && res?._count?.domains < 5) ||
        (res?.subscription?.plan === "ULTIMATE" && res?._count?.domains < 10)
      ) {
        const newDomain = await prisma.user.update({
          where: {
            clerkId: user.id,
          },
          data: {
            domains: {
              create: {
                name: domain,
                icon: icon,
                chatBot: {
                  create: {
                    welcomeMessage:
                      "Hey there! you have a question? Text us here ",
                  },
                },
              },
            },
          },
        });
        if (newDomain) {
          return { status: 200, message: "Domain added successfully" };
        }
      }
      return {
        status: 400,
        message:
          "You have reached the maximum number of domains | Try upgrading your plan",
      };
    }

    return {
      status: 400,
      message: "Domain already exist",
    };
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (password: string) => {
  if (!password) return { status: 400, message: "Password is required" };
  const user = await currentUser();
  if (!user) {
    return { status: 404, message: "sign in required" };
  }
  try {
    const res = await clerkClient.users.updateUser(user.id, { password });
    if (!res) {
      return { status: 400, message: "Failed to change password" };
    }
    return { status: 200, message: "Password changed successfully" };
  } catch (error: any) {
    console.log(error);
    return { status: 500, message: error.errors[0].message };
  }
};

export const getDomainData = async (domain: string) => {
  const user = await currentUser();
  if (!user) {
    return { status: 404, message: "sign in required" };
  }
  try {
    const res = await prisma.user.findUnique({
      where: {
        clerkId: user?.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        domains: {
          where: {
            name: { contains: domain },
          },
          select: {
            id: true,
            name: true,
            icon: true,
            userId: true,
            chatBot: {
              select: {
                welcomeMessage: true,
                id: true,
                icon: true,
              },
            },
          },
        },
      },
    });
    if (!res) {
      return { status: 404, message: "domain not found" };
    }
    return { status: 200, message: "domain found", data: res };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal server error" };
  }
};
