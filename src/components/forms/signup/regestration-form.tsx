"use client";
import { useAuthContext } from "@/context/use-auth-context";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import TypeSelectionForm from "./type-selection-form";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/global/spinner";
const OTPForm = dynamic(() => import("./otp-form"), {
  ssr: false,
  loading: Spinner,
});
const AccountDetailsForm = dynamic(() => import("./account-details-form"), {
  ssr: false,
  loading: Spinner,
});
type Props = {};

const RegestrationForm = (props: Props) => {
  const {
    formState: { errors },
    register,
    setValue,
  } = useFormContext();
  const { currentStep, setCurrentStep } = useAuthContext();
  const [otp, setOtp] = useState<string>("");
  const [userType, setUserType] = useState<"owner" | "student">("owner");
  setValue("otp", otp);

  switch (currentStep) {
    case 1:
      return (
        <TypeSelectionForm
          register={register}
          setUserType={setUserType}
          userType={userType}
        />
      );
    case 2:
      return <AccountDetailsForm register={register} errors={errors} />;
    case 3:
      return <OTPForm otp={otp} setOtp={setOtp} />;
  }

  return <div>RegestrationForm</div>;
};

export default RegestrationForm;
