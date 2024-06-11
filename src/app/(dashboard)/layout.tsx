import { getLoginUser } from "@/actions/dashboard";
import { ChatProvider } from "@/context/chat-context";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const user = await getLoginUser();
  if (!user) return;
  return <ChatProvider>
    <div className="flex flex-col h-screen w-full">{children}</div>
  </ChatProvider>;
};

export default layout;
