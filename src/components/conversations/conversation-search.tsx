import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  domains:
    | {
        id: string;
        name: string;
        icon: string;
      }[]
    | undefined;
  register: UseFormRegister<FieldValues>;
};

const ConversationSearch = ({ domains, register }: Props) => {
  return (
    <div className="flex flex-col py-3">
      <select
        {...register("domain")}
        className="px-3 py-4 text-sm border-[1px] rounded-lg mr-5 bg-stone-900"
      >
        <option disabled selected>
          Domain Name
        </option>
        {domains?.map((d, i) => (
          <option key={i} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ConversationSearch;
