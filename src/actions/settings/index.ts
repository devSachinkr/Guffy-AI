"use server";

import { currentUser } from "@clerk/nextjs";
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
