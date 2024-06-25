import FormGenerator from "@/components/forms/form-generator/sign-up-details";
import { domainSettingProp } from "@/schema/settings";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  name: string;
  register: UseFormRegister<domainSettingProp>;
  errors: FieldErrors<domainSettingProp>;
};

const DomainSettingsUpdate = ({ errors, name, register }: Props) => {
  return (
    <div className="flex gap-2 pt-5 items-end w-[400px] pl-3">
      <FormGenerator
        label="Domain Name"
        register={register}
        errors={errors}
        name="name"
        type="text"
        placeholder={name}
        inputType="input"
      />

    </div>
  );
};

export default DomainSettingsUpdate;
