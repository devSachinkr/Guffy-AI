"use client";
import { integrateDomain } from "@/actions/settings";
import { addDomainSchema } from "@/schema/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadClient } from "@uploadcare/upload-client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
const client = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY!,
});

export const useDomain = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(addDomainSchema),
  });
  const pathName = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const [isDomain, setIsDomain] = useState<string | undefined>(undefined);
  const router = useRouter();
  useEffect(() => {
    setIsDomain(pathName.split("/").pop());
  }, [pathName]);

  const addDomain = handleSubmit(async (values: FieldValues) => {
    setLoading(true);
    const upload = await client.uploadFile(values.image[0]);
    const domain = await integrateDomain(values.domain, upload.cdnUrl!);
  });
};
