import React from "react";
import { FieldValue, FieldValues, UseFormRegister } from "react-hook-form";
import UserTypeCard from "./user-type-card";

interface Props {
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUserType: React.Dispatch<React.SetStateAction<"owner" | "student">>;
}

const TypeSelectionForm = ({ register, setUserType, userType }: Props) => {
  return (
    <>
      <div className="text-gravel md:text-4xl font-bold text-[#FFF5EE]">
        Create an account
      </div>
      <p className="text-iridium md:text-sm text-muted-foreground">
        Please share a bit about yourself and your current endeavors. {"We'd "}
        love to customize your experience to best align with your interests and
        needs.
      </p>
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        text="Setting up my account for my company"
        title="I own a business"
        value="owner"
      />
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        text="Looking to learn about the tool."
        title="Im a student"
        value="student"
      />
    </>
  );
};

export default TypeSelectionForm;
