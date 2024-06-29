import { cn, extractUUIDFromString, getMonthName } from "@/lib/utils";
import { Role } from "@prisma/client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  message: {
    role: Role | null;
    message: string;
    link?: string;
  };
  createdAt?: Date;
};

const Bubble = ({ createdAt, message: { link, role, message } }: Props) => {
  const date = new Date();
  const image = extractUUIDFromString(message);
  return (
    <div
      className={cn(
        "flex gap-2 items-end",
        role == "ASSISTANT" ? "self-start" : "self-end flex-row-reverse"
      )}
    >
      {role === "ASSISTANT" ? (
        <Avatar className="w-5 h-5">
          <AvatarImage src={"https://github.com/shadcn.png"} alt="Shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="w-5 h-5">
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      )}
       <div
        className={cn( 
          'flex flex-col gap-3 min-w-[200px] max-w-[300px] p-4 rounded-t-md',
          role == 'ASSISTANT'
            ? 'bg-muted rounded-r-md'
            : 'bg-grandis_solid rounded-l-md'
        )}
      >  
        {createdAt ? (
          <div className="flex gap-2 text-xs text-gray-600">
            <p>
              {createdAt.getDate()} {getMonthName(createdAt.getMonth())}
            </p>
            <p>
              {createdAt.getHours()}:{createdAt.getMinutes()}
              {createdAt.getHours() > 12 ? 'PM' : 'AM'}
            </p>
          </div>
        ) : (
          <p className="text-xs">
            {`${date.getHours()}:${date.getMinutes()} ${
              date.getHours() > 12 ? 'pm' : 'am'
            }`}
          </p>
        )}
        {image ? (
          <div className="relative aspect-square">
            <Image
              src={`https://ucarecdn.com/${image[0]}/`}
              fill
              alt="image"
            />
          </div>
        ) : (
          <p className="text-sm">
            {message.replace('(complete)', ' ')}
            {link && (
              <Link
                className="underline font-bold pl-2"
                href={link}
                target="_blank"
              > 
                Your Link
              </Link>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default Bubble;
