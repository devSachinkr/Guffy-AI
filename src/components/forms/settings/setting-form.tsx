'use client';
import React from "react";

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

const SettingForm = ({chatbot,id,name,plan}: Props) => {
  return <div>SettingForm</div>;
};

export default SettingForm;
