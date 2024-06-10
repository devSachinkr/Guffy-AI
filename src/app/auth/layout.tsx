import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import guffyLogo from "../../../public/fuffyLogo.png";
type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const user = await currentUser();
  if (user) return redirect("/dashboard");
  return (
    <div className="h-screen flex w-full justify-center">
       <div className="w-[600px] ld:w-full flex flex-col items-start p-6">
        <div className="flex items-center justify-center gap-x-2">
        <Image
          src={guffyLogo}
          alt="LOGO"
          sizes="100vw"
          style={{
            width: '20%',
            height: 'auto',
          }}
          width={0}
          height={0}
        />
        <span className="md:text-[2rem] font-thin">Guffy <i className="text-[#FFD700] font-bold">AI</i></span>
        </div>
        {children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative bg-cream  flex-col pt-10 pl-24 gap-3">
        <h2 className="text-gravel md:text-4xl font-bold">
          Hi, I’m your AI powered sales assistant, Guffy!
        </h2>
        <p className="text-iridium md:text-sm mb-10 text-[#FFD700]">
          Guffy is capable of capturing lead information without a form...{' '}
          <br />
          something never done before <span className="text-red-600">❤</span>
        </p>
        <Image
          src="/images/app-ui.png"
          alt="app image"
          loading="lazy"
          sizes="30"
          className="absolute shrink-0 !w-[1600px] top-48"
          width={0}
          height={0}
        />
      </div>
    </div>
  );
};

export default layout;
