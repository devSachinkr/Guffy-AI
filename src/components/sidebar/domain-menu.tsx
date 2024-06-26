import { cn } from "@/lib/utils";
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import AppDrawer from "./app-drawer";
import { Loader } from "../global/loader";
import FormGenerator from "../forms/form-generator/sign-up-details";
import UplpoadButton from "../upload-button";
import { useDomain } from "@/hooks/sidebar/domain-hook";

type Props = {
  min?: boolean;
  domains:
    | {
        id: string;
        name: string;
        icon: string | null;
      }[]
    | null
    | undefined;
};

const DomainMenu = ({ domains, min }: Props) => {
  const { register, addDomain, loading, errors, isDomain } = useDomain();

  return (
    <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
      <div className="flex justify-between w-full items-center">
        {!min && <p className="text-xs text-gray-500">DOMAINS</p>}
        <AppDrawer
          desc="add in your domain address to integrate your chatbot"
          title="Add your business domain"
          onOpen={
            <div className="cursor-pointer text-gray-500 rounded-full border-2">
              <Plus className="text-white" />
            </div>
          }
        >
          <Loader loading={loading}>
            <form
              className="mt-3 w-6/12 flex flex-col gap-3"
              onSubmit={addDomain}
            >
              <FormGenerator
                inputType="input"
                register={register}
                label="Domain"
                name="domain"
                errors={errors}
                placeholder="mydomain.com"
                type="text"
              />
              <UplpoadButton
                register={register}
                label="Upload Icon"
                errors={errors}
              />
              <Button type="submit" className="w-full">
                Add Domain
              </Button>
            </form>
          </Loader>
        </AppDrawer>
      </div>
      <div className="flex flex-col gap-1 text-ironside font-medium justify-center items-center">
        {domains &&
          domains.map((domain) => (
            <Link
              href={`/settings/${domain.name.split(".")[0]}`}
              key={domain.id}
              className={cn(
                "flex gap-3 rounded-full transition duration-100 ease-in-out cursor-pointer ",
                !min ? "p-2" : "py-2",
                domain.name.split(".")[0] == isDomain &&
                  `border-dashed border-[1px] border-stone-400 rounded-full aspect-square justify-center ${
                    !min && "w-[50px] flex justify-center items-center relative"
                  }`
              )}
            >
              <Image
                src={`${domain.icon}/`}
                alt="logo"
                width={30}
                height={30}
                className={`${!min && ""}`}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default DomainMenu;
