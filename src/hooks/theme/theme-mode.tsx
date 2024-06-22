"use client";

import React, { useState } from "react";
import {UploadClient} from "@uploadcare/upload-client"
const upload=new UploadClient({
    publicKey:process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY!,
})
const useThemeMode = () => {
  const [theme, setTheme] = useState<boolean>(false);

  return {
    theme,
    setTheme,
  };
};

export default useThemeMode;
