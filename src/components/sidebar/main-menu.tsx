import { SIDEBAR_MENU } from "@/constants/menu-items";
import { LogOut, Menu, Smartphone } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/fuffyLogo.png";
import DomainMenu from "./domain-menu";
import MenuItem from "./menu-item";
type Props = {
  domain:
    | {
        id: string;
        name: string;
        icon: string;
      }[]
    | null
    | undefined;
  onSignOut: () => void;
  onExpand: () => void;
  currentPage: string | undefined;
};

const MainMenu = ({ currentPage, domain, onExpand, onSignOut }: Props) => {
  return (
    <div className="py-3 px-4 flex flex-col h-full">
      <div className="flex justify-between items-center">
        <Image
          src={logo}
          alt="logo"
          sizes="100vw"
          className="animate-fade-in opacity-0 delay-300 fill-mode-forwords"
          style={{
            width: "50%",
            height: "auto",
          }}
          width={0}
          height={0}
        />
        <Menu
          className="cursor-pointer animate-fade-in opacity-0 delay-300 fill-mode-forwords"
          onClick={onExpand}
        />
      </div>
      <div className="animate-fade-in opacity-0 delay-300 fill-mode-forwords flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col">
          <p className="text-xs text-gray-500 mb-3">MENU</p>
          {SIDEBAR_MENU.map((item, idx) => (
            <MenuItem
              size="max"
              {...item}
              key={idx}
              current={currentPage}
            />
          ))}
          <DomainMenu domains={domain} />
        </div>
        <div className="flex flex-col">
          <div className="text-xs text-gray-500 mb-3">OPTIONS</div>
          <MenuItem
          size="max"
          label="Sign Out"
          icon={<LogOut/>}
          onSignOut={onSignOut}
          current={currentPage}
          />
          <MenuItem
          size="max"
          label="Mobile App"
          icon={<Smartphone/>}
          />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
