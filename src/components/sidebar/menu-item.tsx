import React from "react";

type Props = {
  currentPage: string | undefined;
  size: string;
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const MenuItem = (props: Props) => {
  return <div>MenuItem</div>;
};

export default MenuItem;
