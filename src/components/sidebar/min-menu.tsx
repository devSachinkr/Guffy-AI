import React from "react";

import { LogOut, MonitorSmartphone } from "lucide-react";
import { MenuLogo } from "@/icons/menu-logo";
import MenuItem from "./menu-item";
import DomainMenu from "./domain-menu";
import { SIDEBAR_MENU } from "@/constants/menu-items";
import logo from "../../../public/fuffyLogo.png";
import Collapse from "@/icons/collapse";
type MinMenuProps = {
  onShrink(): void;
  current: string;
  onSignOut(): void;
  domains:
    | {
        id: string;
        name: string;
        icon: string;
      }[]
    | null
    | undefined;
};

export const MinMenu = ({
  onShrink,
  current,
  onSignOut,
  domains,
}: MinMenuProps) => {
  return (
    <div className="p-3 flex flex-col fixed bg-stone-800 items-center h-full">
      <span className="animate-fade-in delay-300 fill-mode-forwards cursor-pointer ">
        {/* <MenuLogo onClick={onShrink} /> */}
        <Collapse onclick={onShrink} />
      </span>
      <div className=" flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col">
          {SIDEBAR_MENU.map((menu, key) => (
            <MenuItem size="min" {...menu} key={key} current={current} />
          ))}
          <DomainMenu min domains={domains} />
        </div>
        <div className="flex flex-col">
          <MenuItem
            size="min"
            label="Sign out"
            icon={<LogOut className="text-white" />}
            onSignOut={onSignOut}
          />
          <MenuItem
            size="min"
            label="Mobile App"
            icon={<MonitorSmartphone className="text-white" />}
          />
        </div>
      </div>
    </div>
  );
};
