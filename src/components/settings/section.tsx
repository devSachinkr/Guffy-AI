import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  label: string;
  msg: string;
  titleClass?: string;
  descClass?: string;
};

const Section = ({ label, msg, descClass, titleClass }: Props) => {
  return (
    <div>
      <p className={cn("text-sm font-medium", titleClass)}>{label}</p>
      <p className={cn("text-sm font-light", descClass)}>{msg}</p>
    </div>
  );
};

export default Section;
