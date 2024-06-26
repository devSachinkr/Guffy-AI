import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TABS_MENU_PROPS } from "@/constants/menu-items";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  triggers: Array<TABS_MENU_PROPS>;
  children: React.ReactNode;
  className?: string;
  button?: JSX.Element;
};

const TabsMenu = ({ button, className, children, triggers }: Props) => {
  return (
    <Tabs defaultValue={triggers[0].label} className="w-full">
      <TabsList className={cn("p-5", className)}>
        {triggers.map((trigger) => (
          <TabsTrigger
            className="capitalize flex gap-2 font-semibold"
            key={trigger.label}
            value={trigger.label}
          >
            {trigger.icon && trigger.icon}
            {trigger.label}
          </TabsTrigger>
        ))}
        {button}
      </TabsList>
      {children}
    </Tabs>
  );
};

export default TabsMenu;
