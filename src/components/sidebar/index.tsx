import useSideBar from "@/hooks/sidebar/sidebar-hook";
import { cn } from "@/lib/utils";
import React from "react";
import MainMenu from "./main-menu";

type Props = {
  domain:
    | {
        id: string;
        name: string;
        icon: string;
      }[]
    | null
    | undefined;
};

const Sidebar = ({ domain }: Props) => {
  const { expands, onExpand, currentPage, onSignOut } = useSideBar();
  return (
    <div
      className={cn(
        "bg-cream_solid h-full w-[60px] fill-mode-forwards fixed md:relative",
        expands == undefined && "",
        expands == true
          ? "animate-open-sidebar"
          : expands == false && "animate-close-sidebar"
      )}
    >
      {expands ? (
        <MainMenu
          domain={domain}
          onExpand={onExpand}
          currentPage={currentPage}
          onSignOut={onSignOut}
        />
      ) : (
        <MainMenu
          domain={domain}
          onExpand={onExpand}
          currentPage={currentPage}
          onSignOut={onSignOut}
        /> 
      )}
    </div>
  );
};

export default Sidebar;
