import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  currentPage?: string | undefined;
  size: "max" | "min";
  label?: string;
  icon?: React.ReactNode;
  path?: string;
  onSignOut?(): void;
  onClick?: () => void;
};

const MenuItem = ({
  currentPage,
  size,
  icon,
  label,
  onClick,
  onSignOut,
  path,
}: Props) => {
  switch (size) {
    case "max":
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            "flex items-center gap-2 px-1 py-2 rounded-lg my-1",
            !currentPage
              ? "text-gray-500"
              : currentPage == path
              ? "bg-white font-bold text-black"
              : "text-gray-500"
          )}
          href={path ? `/${path}` : ""}
        >
          {icon}
          {label}
        </Link>
      );
    case "min":
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            !currentPage
              ? "text-gray-500"
              : currentPage == path
              ? "bg-white font-bold text-black"
              : "text-gray-500",
            "rounded-lg py-2 my-1"
          )}
          href={path ? `/${path}` : ""}
        >
          {icon}
        </Link>
      );
    default:
      return null;
  }
  return <div></div>;
};

export default MenuItem;
