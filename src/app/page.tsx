import GradientText from "@/components/global/gradient-text";
import NavBar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import frame from "../../public/iphone-frame.png";
import { subscriptionCards } from "@/constants/subscriptions";
import SubscriptionCard from "@/components/subscription/subscription-card";
type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <NavBar />
      <section>
        <div className="flex items-center justify-center flex-col mt-[80px] gap-4">
          <span className="text-lime-400 bg-limeGreen/20 px-4 py-2 rounded-full text-sm">
            An AI powred sales assistant chatbot{" "}
          </span>
        </div>
        <h1 className="w-full flex items-center justify-center mt-7 text-[5rem] md:text-[8rem] font-bold">
          <p
            className="
           bg-gradient-to-r from-limeGreen to-lime-200 text-transparent bg-clip-text relative

           "
          >
            Guffy AI
          </p>
        </h1>

        <p className="text-muted-foreground/95 flex items-center justify-center w-[80%] mx-auto text-center">
          Transform your website with Guffy AI, your AI-powered sales assistant,
          in just a few lines of code!
        </p>
        <div className="w-full flex items-center justify-center mt-5">
          <Link
            href={"/auth/sign-in"}
            className="p-3 border-[1px] border-lime-600 rounded-full text-lime-400 hover:text-white  "
          >
            Start For Free
          </Link>
        </div>
        <div className="flex w-full justify-center items-center">
          <Image src={frame} alt="phone frame" width={250} />
        </div>
      </section>

      <section>
        <h2 className="text-center text-[2rem] md:text-[3rem]
         bg-gradient-to-r from-limeGreen to-lime-200 text-transparent bg-clip-text relative">Subscriptions Made Simple</h2>
         <p className="text-center w-[80%] mx-auto">Effortlessly manage your subscriptions. Sign up, renew, and access your services with ease. Subscription made simple!</p>
         <div className="flex items-center justify-center w-full flex-col md:flex-row">
          {
            subscriptionCards.map((plan)=>(
              <SubscriptionCard key={plan.priceId} {...plan}/>
            ))
          }
         </div>
      </section>
    </div>
  );
};

export default page;
