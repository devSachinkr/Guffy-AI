import Section from "@/components/settings/section";
import { domainSettingProp } from "@/schema/settings";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import FormGenerator from "../form-generator/sign-up-details";

type Props = {
  message: string | null | undefined;
  register: UseFormRegister<domainSettingProp>;
  errors: FieldErrors<domainSettingProp>;
};

const WelcomeMessage = ({ errors, message, register }: Props) => {
  return (
    <div className="flex flex-col gap-2 pl-2">
      <Section label="Welcome Message" msg="Customize your welcome message" />
      <div className="lg:w-[500px]">
        <FormGenerator
          errors={errors}
          inputType="textarea"
          lines={5}
          name="welcomeMessage"
          placeholder={message||"Welcome to Guffy"}
          register={register}
          type="text"
        />
      </div>
    </div>
  );
};

export default WelcomeMessage;
