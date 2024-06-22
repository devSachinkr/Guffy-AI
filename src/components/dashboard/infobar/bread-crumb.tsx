"use client";
import { Loader } from "@/components/global/loader";
import { useChatContext } from "@/context/chat-context";
import useSideBarContext from "@/context/sidebar-context";
import { Switch } from "@radix-ui/react-switch";
// import useSideBar from "@/hooks/sidebar/sidebar-hook";
import React from "react";

type Props = {};

const Breadcrumb = (props: Props) => {
  const {
    chatRoom,
    expand,
    loading,
    onActivateRealtime,
    onExpand,
    onSignOut,
    page,
    realtime,
  } = useSideBarContext();
  return (
    <div className="flex flex-col">
      <div className="flex gap-5 items-center">
        <h2 className="text-3xl font-bold capitalize">{page}</h2>
        {page === "conversations"  && (
          <Loader loading={loading} className="p-0 inline">
            <Switch
              defaultChecked={realtime}
              onClick={(e) => onActivateRealtime(e)}
              className="data-[slate=checked]:bg-lime-400 data-[slate=unchecked]:bg-peach_solid"
            />
          </Loader>
        )}
      </div>
      <p className="text-gray-500 text-sm">
        {page == "settings"
          ? "Oversee and customize your account settings, preferences, and integrations."
          : page == "dashboard"
          ? "A comprehensive overview of your metrics, usage patterns, customer insights, and more."
          : page == "appointements"
          ? "Review your appointments and seamlessly schedule new ones"
          : page == "email-marketing"
          ? "send emails to customers"
          : page == "intergations"
          ? "Integrate third-party applications with Guffy AI effortlessly."
          : "Adjust domains and various settings, customize chatbot options, input sales queries, and train your chatbot to perform tasks according to your preferences."}
      
      </p>
    </div>
  );
};

export default Breadcrumb;
