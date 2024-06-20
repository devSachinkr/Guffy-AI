import { useDomain } from "@/hooks/sidebar/domain-hook";
import { cn } from "@/lib/utils";
import React from "react";
import AppDrawer from "./app-drawer";
import { Plus } from "lucide-react";
import { Loader } from "../global/loader";
import FormGenerator from "../forms/form-generator/sign-up-details";
import UplpoadButton from "../upload-button";
import { Button } from "../ui/button";
import { DomainSettingsSchema } from "@/schema/settings";
import Link from "next/link";
import Image from "next/image";

type Props = {
  min?: boolean;
  domain:
    | {
        id: string;
        name: string;
        icon: string;
      }[]
    | null
    | undefined;
};

const DomainMenu = ({ domain, min }: Props) => {
  const { addDomain, errors, isDomain, register, loading } = useDomain();
  return (
    <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
      <div className="flex justify-between w-full items-center">
        {!min && <p className="text-xs text-gray-500">DOMAINS</p>}
        <AppDrawer
          desc="add in your domain to get started"
          title="Add Domain"
          onOpen={
            <div className="cursor-pointer text-gray-500 rounded-full">
              <Plus />
            </div>
          }
        >
          <Loader loading={loading}>
            <form
              className="mt-3 w-6/12  flex flex-col gap-3"
              onSubmit={addDomain}
            >
              <FormGenerator
                inputType="input"
                register={register}
                errors={errors}
                name="domain"
                placeholder="myDomainExample.com"
                label="Domain"
                type="text"
              />
              <UplpoadButton register={register} label="Icon" errors={errors} />
              <Button type="submit" className="w-full">
                Add Domain
              </Button>
            </form>
          </Loader>
        </AppDrawer>
      </div>
      <div className="flex flex-col gap-1 text-ironside_solid font-medium">
        {domain &&
          domain.map((d) => (
            <Link
              key={d.id}
              href={`/settings/${d.name.split(".")[0]}`}
              className={cn(
                "flex gap-3 items-center hover:bg-white rounded-lg transition duration-100 ease-in-out cursor-pointer",
                !min ? "p-2" : "py-2",
                d.name.split(".")[0] === isDomain && "bg-white"
              )}
            >
              <Image
                src={`https://ucarecdn.com/${d.icon}/`}
                alt="logo"
                width={20}
                height={20}
              />
              {!min && <p className="text-sm">{d.name}</p>}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default DomainMenu;
