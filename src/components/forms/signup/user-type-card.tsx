"use client";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { User, User2 } from "lucide-react";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  value: string;
  text: string;
  title: string;
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: React.Dispatch<React.SetStateAction<"owner" | "student">>;
}

const UserTypeCard = ({
  text,
  title,
  value,
  register,
  setUserType,
  userType,
}: Props) => {
  return (
    <Label htmlFor={value}>
      <Card
        className={cn(
          "w-full cursor-pointer",
          userType == value && " border-[1px] border-[#63840f]"
        )}
      >
        <CardContent className="flex justify-between p-2">
          <div className="flex items-center gap-3">
            <Card
              className={cn(
                " cursor-pointer rounded-md p-2",
                userType == value && " border-[1px] border-[#63840f]"
              )}
            >
              <User
                size={30}
                className={cn(
                  userType == value ? "text-orange_solid" : "text-gray-500"
                )}
              />
            </Card>
            <div className="">
              <CardDescription
                className={cn(
                  userType == value ? "text-[#fff]" : "text-gray-500"
                )}
              >
                {title}
              </CardDescription>
              <CardDescription
                className={cn(
                  userType == value ? "text-[#fff]" : "text-gray-500"
                )}
              >
                {text}
              </CardDescription>
            </div>
          </div>
          <div>
            <div
              className={cn(
                "w-3 h-3 rounded-full",
                userType == value
                  ? "bg-gradient-to-t from-red-500 to-blue-500"
                  : "bg-transparent"
              )}
            >
              <Input
                {...register("type", {
                  onChange: (e) =>
                    setUserType(e.target.value as "owner" | "student"),
                })}
                value={value}
                id={value}
                className="hidden"
                type="radio"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Label>
  );
};

export default UserTypeCard;
