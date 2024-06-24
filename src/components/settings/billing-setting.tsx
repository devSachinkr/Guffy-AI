import { getSubscriptionPlan } from "@/actions/settings";
import React from "react";
import Section from "./section";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Plus, Star } from "lucide-react";
import GradientText from "../global/gradient-text";
import { subscriptionCards } from "@/constants/subscriptions";
type Props = {};

const BillingSetting = async (props: Props) => {
  const plan = await getSubscriptionPlan();
  const planFeatures =
    subscriptionCards.find((card) => card.title.toUpperCase() === plan)
      ?.features || [];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Billing Settings"
          msg="Add payment info, upgrade and modify your plan"
        />
      </div>
      <div className="lg:col-span-2 flex justify-start lg:justify-center">
        <Card className="border-dashed bg-stone-800  border-lime-400 w-full cursor-pointer h-[270px] flex justify-center items-center">
          <CardContent className="flex gap-2 items-center">
            <div className="rounded-full border-2 p-1 ">
              <Plus className="text-gray-400" />
            </div>
            <CardDescription className="font-semibold">
              Upgrade Plan
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <h3 className="text-xl font-semibold mb-2">
          <GradientText size="text-[2rem]" from="red" to="blue">
            Current Plan
          </GradientText>
        </h3>
        <p className="text-sm font-semibold mb-2 flex gap-x-2">
          {plan}
          <span className="text-sm font-semi-bold text-lime-400"> $</span>
        </p>
        <p className="text-sm font-light">
          {planFeatures.map((f) => (
            <span key={f} className="flex items-center gap-x-2">
              <Star size={14} className="text-lime-400" />
              {f}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default BillingSetting;
