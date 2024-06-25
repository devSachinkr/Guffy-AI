"use client";
import DomainSettingsUpdate from "@/components/dashboard/settings/domain-settings-update";
import GradientText from "@/components/global/gradient-text";
import { Separator } from "@/components/ui/separator";
import { useDomainSettings } from "@/hooks/settings/domain-setting";
import React from "react";
import CodeSnippet from "./code-snippet";

type Props = {
  plan: "STANDARD" | "PRO" | "ULTIMATE";
  chatbot: {
    id: string;
    name: string;
    icon: string;
  };
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
      </div>  
        <CodeSnippet id={id}/>
    </form>
  );
};

export default SettingForm;
