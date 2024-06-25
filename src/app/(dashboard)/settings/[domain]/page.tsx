import { getDomainData } from "@/actions/settings";
import InfoBar from "@/components/dashboard/infobar";
import SettingForm from "@/components/forms/settings/setting-form";
import GradientText from "@/components/global/gradient-text";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    domain: string;
  };
};

const page = async ({ params: { domain } }: Props) => {
  const domainData = await getDomainData(domain);
  if (!domainData.data || !domainData.data.subscription || !domainData.data.domains) return redirect("/dashboard");
  return (
    <div>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 ">
        <SettingForm
          plan={domainData.data.subscription.plan}
          // @ts-ignore
          chatbot={domainData.data.domains[0].chatBot}
          id={domainData.data.domains[0].id}
          name={domainData.data.domains[0].name}
        />
      </div>
    </div>
  );
};

export default page;
