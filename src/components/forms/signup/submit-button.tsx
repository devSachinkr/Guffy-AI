"use client";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/use-auth-context";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import Link from "next/link";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {};
const SubmitButton = (props: Props) => {
  const { currentStep, setCurrentStep } = useAuthContext();
  const { formState, getFieldState, getValues } = useFormContext();
  const { generateOtp } = useSignUpForm();
  const { isDirty: isName } = getFieldState("fullName", formState);
  const { isDirty: isEmail } = getFieldState("email", formState);
  const { isDirty: isPassword } = getFieldState("password", formState);
  if (currentStep === 3) {
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button type="submit" className="w-full rounded-md text-lime-800">
          Create an Account
        </Button>
        <p>Already have an account?</p>
        <Link href={"/auth/sign-in"} className="font-bold text-limeGreen">
          Sign In
        </Link>
      </div>
    );
  }
  if (currentStep === 2) {
     console.log(isName,isEmail,isPassword)
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button
          type="submit"
          className="w-full"
          {...(isName &&
            isEmail &&
            isPassword && {
              onClick: () =>
                generateOtp(
                  getValues("email"),
                  getValues("password"),
                  setCurrentStep
                ),
            })}
        >
          Continue
        </Button>
        <p>Already have an account?</p>
        <Link href={"/auth/sign-in"} className="font-bold text-limeGreen">
          Sign In
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <Button
        type="submit"
        className="w-full rounded-md text-lime-800"
        onClick={() => setCurrentStep((prev) => prev + 1)}
      >
        continue
      </Button>
      <p>Already have an account?</p>
      <Link href={"/auth/sign-in"} className="font-bold text-limeGreen">
        Sign In
      </Link>
    </div>
  );
};

export default SubmitButton;
