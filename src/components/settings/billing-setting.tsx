import { getSubscriptionPlan } from "@/actions/settings";
import React from "react";
import Section from "./section";
type Props = {};

const BillingSetting = async (props: Props) => {
  const plan = await getSubscriptionPlan();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Billing Settings"
          msg="Add payment info, upgrade and modify your plan"
        />
      </div>
      <div className="lg:col-span-2">
        <h3 className="text-xl font-semibold mb-2">Current Plan</h3>
        <p className="text-sm font-semibold mb-2">{plan}</p>
        <p className="text-sm font-light">
          {plan === "PRO"
            ? "Start growing your business today."
            : plan === "ULTIMATE"
            ? "The ultimate growth plan that you up for success"
            : "Perfect if you're just getting started with Guffy AI"}
        </p>
      </div>
    </div>
  );
};

export default BillingSetting;
