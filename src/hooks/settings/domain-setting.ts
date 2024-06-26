"use client";
import { useForm } from "react-hook-form";
import { Resolver, zodResolver } from "@hookform/resolvers/zod";
import { DomainSettingsSchema, domainSettingProp } from "@/schema/settings";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastNotify } from "@/components/global/ToastNotify";
import {
  chatBotImageUpdate,
  delDomain,
  updateDomain,
  updateWelcomeMessage,
} from "@/actions/settings";
import { upload } from "@/lib/upload-care";

export const useDomainSettings = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<domainSettingProp>({
    resolver: zodResolver(DomainSettingsSchema),
    mode: "onChange",
    defaultValues: {},
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const updateSetting = handleSubmit(async (data: domainSettingProp) => {
    setLoading(true);
    if (data.domain) {
      const domain = await updateDomain(id, data.domain);
      if (domain) {
        reset();
        setLoading(false);
        ToastNotify({
          title: "Success",
          desc: `${domain.message}`,
        });
        router.refresh();
      }
    }
    if (data.image && data.image[0]) {
      const uploadFile = await upload.uploadFile(data.image[0]);
      console.log("upload care : ", uploadFile);
      const imageUpdateOfChatBot = await chatBotImageUpdate(
        id,
        uploadFile.uuid
      );
      if (imageUpdateOfChatBot) {
        setLoading(false);
        ToastNotify({
          title: "Success",
          desc: `${imageUpdateOfChatBot.message}`,
        });
        reset();
        router.refresh();
      }
    }
    if (data.welcomeMessage) {
      const message = await updateWelcomeMessage(id, data.welcomeMessage);
      if (message) {
        setLoading(false);
        ToastNotify({
          title: "Success",
          desc: `${message.message}`,
        });
        reset();
        router.refresh();
      }
    }
  });

  const deleteDomain = async () => {
    setDeleting(true);
    const res = await delDomain(id);
    if (res) {
      setDeleting(false);
      ToastNotify({
        title: "Success",
        desc: `${res.message}`,
      });
      router.refresh();
    }
  };
  return {
    register,
    formState: { errors },
    updateSetting,
    loading,
    deleting,
    deleteDomain,
  };
};
