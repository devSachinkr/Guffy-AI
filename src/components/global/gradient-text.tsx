import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  text?: string;
  to?: string;
  from?: string;
  classes?: string;
  size?: string;
  children?: React.ReactNode;
};

const GradientText = ({ text, from, to, classes, size, children }: Props) => {
  return (
    <div
      className={`bg-gradient-to-r from-red-500 via-blue-500 to-blue-700 text-transparent bg-clip-text relative`}
    >
      <p className={cn(classes, size)}>
        {text} {children && children}
      </p>
    </div>
  );
};

export default GradientText;
