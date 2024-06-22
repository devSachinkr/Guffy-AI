import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Edit } from "lucide-react";
import { ErrorMessage } from "@hookform/error-message";

type Props = {
  register: UseFormRegister<FieldValues>;
  label: string;
  errors: any;
};

const UplpoadButton = ({ register, label, errors }: Props) => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <Label
          htmlFor={"upload-button"}
          className=" flex gap-2 p-3 rounded-lg bg-cream_solid text-gray-600 cursor-pointer font-semibold items-center"
        >
        <Input
            {...register('image')}
            className="hidden"
            type="file"
            id="upload-button"
          />
          <Edit />
          {label}
        </Label>
        <p className="text-sm text-gray-400 ml-6">
          Recommended size: 300x300 <br /> less than 2mb
        </p>
      </div>
      <ErrorMessage
        errors={errors}
        name="image"
        render={({ message }) => (
          <p className="text-red-500 mt-2">
            {message === "Required" ? "" : message}
          </p>
        )}
      />
    </>
  );
};

export default UplpoadButton;
