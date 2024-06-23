"use server";
import { prisma } from "@/lib/prisma";
export const completeUserReg = async (
  fullName: string,
  clerkId: string,
  type: string
) => {
  try {
    const res = await prisma.user.create({
      data: {
        clerkId,
        fullName,
        type,
        subscription: {
          create: {
            plan: "STANDARD",
          },
        },
      },
      select: {
        fullName: true,
        id: true,
        type: true,
      },
    });
    if (res) return { status: 200, user: res };
  } catch (error: any) {
    return { status: 400, message: error?.message || "Something went wrong" };
  }
};
