"use client";
import { useAuthContext } from "@/context/use-auth-context";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import { cn } from "@/lib/utils";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {};

const StepTracker = (props: Props) => {
  const { currentStep, setCurrentStep } = useAuthContext();
  return (
    <div className="grid grid-cols-3 gap-3 mt-3">
      <div
        onClick={() => setCurrentStep(1)}
        className={cn(
          "rounded-full h-2 col-span-1 cursor-pointer",
          currentStep === 1 ? "bg-limeGreen" : "bg-white"
        )}
      ></div>
      <div
        onClick={() => setCurrentStep(2)}
      
        className={cn(
          "rounded-full h-2 col-span-1 cursor-pointer",
          currentStep === 2 ? "bg-limeGreen" : "bg-white"
        )}
      ></div>
      <div
        className={cn(
          "rounded-full h-2 col-span-1 cursor-pointer",
          currentStep === 3 ? "bg-limeGreen" : "bg-white"
        )}
      ></div>
    </div>
  );
};

export default StepTracker;
