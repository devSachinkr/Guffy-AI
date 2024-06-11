"use server";

import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { onGetAllAccDomain } from "../settings";
export const getLoginUser = async () => {
  const user = await currentUser();
  if (!user) return redirectToSignIn();
  try {
    const res = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        type: true,
        fullName: true,
        id: true,
      },
    });
    if (!user) throw new Error("user not found");
    const domains = await onGetAllAccDomain();
    return { user: res, domains: domains?.domains, status: 200 };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal server error",
      error: error,
    };
  }
};
