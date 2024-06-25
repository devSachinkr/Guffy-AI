"use client";
import DomainSettingsUpdate from "@/components/dashboard/settings/domain-settings-update";

import GradientText from "@/components/global/gradient-text";
import { Separator } from "@/components/ui/separator";
import { useDomainSettings } from "@/hooks/settings/domain-setting";
import React from "react";
import CodeSnippet from "./code-snippet";
import PremiumBadge from "@/icons/premium-badge";
import UpdateChatbotIcon from "./update-chatbot-icon";
import WelcomeMessage from "./welcome-message";
import Image from "next/image";
import phonelogo from "../../../../public/iphone-frame.png";
import Phone from "@/components/global/phone";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/global/loader";
type Props = {
  plan: "STANDARD" | "PRO" | "ULTIMATE";
  chatbot: {
    id: string;
    name: string;
    icon: string;
    welcomeMessage: string | null;
  } | null;
  id: string;
  name: string;
};

const SettingForm = ({ chatbot, id, name, plan }: Props) => {
  const {
    deleteDomain,
    deleting,
    formState,
    loading,
    updateSetting,
    register,
  } = useDomainSettings({ id });
  return (
    <form className="flex flex-col gap-8 pb-10" onSubmit={updateSetting}>
      <div className="flex flex-col gap-3">
        <GradientText size="text-[1.5rem]">Domain Setting</GradientText>
        <Separator orientation="horizontal" />
        <DomainSettingsUpdate
          name={name}
          register={register}
          errors={formState.errors}
        />
        <CodeSnippet id={id} />
      </div>
      <div className="flex flex-col  gap-3 mt-5">
        <div className="flex gap-4 items-center ">
          <GradientText classes="font-bold text-2xl">
            Chatbot Setting
          </GradientText>
          <div className="flex gap-1 border-[1px] border-lime-500 rounded-full px-3 py-1 text-xs items-center font-bold glassMorPhism">
            <PremiumBadge />
            Premium
          </div>
        </div>
        <Separator orientation="horizontal" />
        <div className="grid md:grid-cols-2">
          <div className="col-span-1 flex flex-col gap-5">
            <UpdateChatbotIcon
              chatbot={chatbot}
              register={register}
              errors={formState.errors}
            />
            <WelcomeMessage
              message={chatbot?.welcomeMessage}
              register={register}
              errors={formState.errors}
            />
          </div>
          <div className="col-span-1 relative">
            <Phone/>
          </div>
        </div>
      </div>
      <div className="flex gap-5 justify-end">
        <Button variant={"destructive"} type="button"
        className="px-10 h-[50px]" onClick={deleteDomain}>
            <Loader loading={loading}>Delete Domain</Loader>
        </Button>
        <Button type="submit" className="w-[100px] h-[50px] bg-white text-black font-semibold">
             <Loader loading={loading}>Save changes</Loader>
        </Button>
      </div>
    </form>
  );
};

export default SettingForm;
