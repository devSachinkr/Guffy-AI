import Section from "@/components/settings/section";
import UplpoadButton from "@/components/upload-button";
import { BotIcon } from "@/icons/bot-icon";
import { domainSettingProp } from "@/schema/settings";
import Image from "next/image";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  chatbot: {
    id: string;
    name: string;
    icon: string;
    welcomeMessage: string | null;
  } | null;
  register: UseFormRegister<domainSettingProp>;
  errors: FieldErrors<domainSettingProp>;
};

const UpdateChatbotIcon = ({ chatbot, errors, register }: Props) => {
  return (
    <div className="py-5 flex flex-col  gap-5 items-start">
      <Section label="Chatbot Icon" msg="Update your chatbot icon" />
      <UplpoadButton errors={errors} label="Upload Icon" register={register} />
      {chatbot?.icon ? (
        <div className=" ">
          <Image
            src={`https://ucarecdn.com/${chatbot.icon}/`}
            alt="chatbot icon"
            width={80}
            height={80}
            className="rounded-full cursor-pointer shadow-md aspect-square"
          />
        </div>
      ) : (
        <div className="rounded-full cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-lime-400 ">
            <BotIcon/>
        </div>
      )}
    </div>
  );
};

export default UpdateChatbotIcon;
