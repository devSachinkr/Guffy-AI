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
    </div>
  );
};

export default BillingSetting;
