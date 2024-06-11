import React from "react";

type Props = {
  label: string;
  msg: string;
};

const Section = ({ label, msg }: Props) => {
  return (
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm font-light">{msg}</p>
    </div>
  );
};

export default Section;
