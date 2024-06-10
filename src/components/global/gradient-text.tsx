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
      className={`bg-gradient-to-r from-${`${from}`}-500 to-${`${to}`}-200 text-transparent bg-clip-text relative`}
    >
      {text} {children && children}
    </div>
  );
};

export default GradientText;
