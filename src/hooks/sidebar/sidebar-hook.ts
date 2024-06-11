"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useChatContext } from "../../context/chat-context";
import { ToastNotify } from "@/components/global/ToastNotify";
import { getConversationMode, toogleRealTime } from "@/actions/conversation";
import { useClerk } from "@clerk/nextjs";

const useSideBar = () => {
  const [expands, setExpands] = useState<boolean | undefined>(undefined);
  const router = useRouter();
  const pathName = usePathname();
  const [realTime, setRealtime] = useState(false);
  const [loading, setLoading] = useState(false);
  const { chatRoom } = useChatContext();

  const activateRealtime = async (e: any) => {
    let realtime;
    try {
      realtime = await toogleRealTime(
        chatRoom!,
        e.target.ariaChecked == "true" ? false : true
      );
      if (realtime.status == 200) {
        setRealtime(realtime.chatRoom!);
        ToastNotify({
          title: "Success",
          desc: `${realtime.message}`,
        });
      }
    } catch (error) {
      console.log(error);
      ToastNotify({
        title: "Success",
        desc: `${realtime?.message ?? "Something went wrong"}`,
      });
    }
  };
  const getCurrentMode = async () => {
    setLoading(true);
    const res = await getConversationMode(chatRoom!);
    if (res.status == 200) {
      setRealtime(res.chatRoom!);
      setLoading(false);
    } else {
      setLoading(false);
      console.log(res.status, res.message);
    }
  };
  useEffect(() => {
    if (chatRoom) {
      getCurrentMode();
    }
  }, [chatRoom]);

  const currentPage = pathName.split("/").pop();
  const { signOut } = useClerk();
  const onSignOut = () => {
    signOut(() => {
      router.push("/");
    });
  };
  const expand = () => setExpands(!expands);
  return {
    expands,
    onExpand: expand,
    currentPage,
    onSignOut,
    activateRealtime,
    realTime,
    loading,
  }
};

export default useSideBar;
