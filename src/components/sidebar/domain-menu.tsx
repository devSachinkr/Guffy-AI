import React from "react";

type Props = {
  min?: boolean;
  domain:
    | {
        id: string;
        name: string;
        icon: string;
      }[]
    | null
    | undefined;
};

const DomainMenu = ({ domain }: Props) => {
  return <div>DomainMenu</div>;
};

export default DomainMenu;
