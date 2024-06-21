import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import React from "react";

type Props = {
  name?: string;
  desc: string;
  children?: React.ReactNode;
};

const ToolTip = ({ desc, name ,children}: Props) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>{name}{children && children}</TooltipTrigger>
        <TooltipContent>
          <p>{desc}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTip;
