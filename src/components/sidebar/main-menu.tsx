import React, { Dispatch } from "react";

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
  onExpand: Dispatch<React.SetStateAction<boolean>>;
  currentPage: string | undefined;
};

const MainMenu = ({ currentPage, domain, onExpand, onSignOut }: Props) => {
  return <div>MainMenu</div>;
};

export default MainMenu;
