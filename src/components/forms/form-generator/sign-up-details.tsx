import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
interface Props {
  type: "text" | "email" | "password";
  inputType: "select" | "input" | "textarea";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder?: string;
  lines?: number;
  form?: string;
  register: UseFormRegister<FieldValues|any>;
  errors: FieldErrors<FieldValues>;
  name: string;
}

const FormGenerator = ({
  errors,
  name,
  register,
  inputType,
  type,
  form,
  label,
  lines,
  options,
  placeholder,
}: Props) => {
  switch (inputType) {
    case "input":
      return (
        <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
          {label && label}
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            {...register(name)}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-500">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    case "select":
      <Label htmlFor={`select-${label}`}>
        {label && label}
        <select {...register(name)} id={`select-${label}`} form={form}>
          {options?.length &&
            options.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <p className="text-red-500">
              {message === "Required" ? "" : message}
            </p>
          )}
        />
      </Label>;

    case "textarea":
      return (
        <Label htmlFor={`textarea-${label}`}>
          {label && label}
          <Textarea
            id={`textarea-${label}`}
            placeholder={placeholder}
            {...register(name)}
            rows={lines}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-500">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    default:
      return <></>;
  }
  return <div>FormGenerator</div>;
};

export default FormGenerator;
