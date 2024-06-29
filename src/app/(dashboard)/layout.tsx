import { getLoginUser } from "@/actions/dashboard";
import Sidebar from "@/components/sidebar";
import { ChatProvider } from "@/context/chat-context";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const user = await getLoginUser();
  if (!user) return;
  return (
    <ChatProvider>
      <div className="flex  w-full">
        <Sidebar domains={user.domains} />
        <div className="w-full  h-screen flex flex-col pl-20 md:pl-4">
          {children}
        </div>
      </div>
    </ChatProvider>
  );
};

export default layout;
