"use client";
import useThemeMode from "@/hooks/theme/theme-mode";
import React from "react";

type Props = {};

const DarkModeSetting = (props: Props) => {
  const {setTheme,theme} = useThemeMode();
  return <div>DarkModeSetting</div>;
};

export default DarkModeSetting;
