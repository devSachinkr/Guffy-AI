import React from "react";
import Breadcrumb from "./bread-crumb";
import { Card } from "@/components/ui/card";
import { Headphones, Star, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {};

const InfoBar = (props: Props) => {
  return (
    <div className="flex w-full justify-between items-center py-1 mb-8">
      <Breadcrumb />
      <div className="flex gap-3 items-center">
        <div>
          <Card className="rounded-xl flex gap-3 py-3 px-4 text-ghost_solid">
            <Trash />
            <Star />
          </Card>
        </div>
        <Avatar>
          <AvatarFallback className="bg-lime-400 text-white">
            <Headphones />
          </AvatarFallback>
        </Avatar>
        <Avatar>
           <AvatarImage
           src="https://github.com/shadcn.png"
           alt="Shadcn"
           />
            <AvatarFallback>CN</AvatarFallback>  
        </Avatar>
      </div>
    </div>
  );
};

export default InfoBar;
