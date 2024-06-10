import React, { Dispatch } from "react";
import OTPField from "./otp-field";

type Props = {
  setOtp: Dispatch<React.SetStateAction<string>>;
  otp: string;
};

const OTPForm = ({ otp, setOtp }: Props) => {
  return (
    <div>
      <h2 className="text-limeGreen md:text-4xl font-bold">Enter OTP</h2>
      <p className="md:text-sm text-muted-foreground">
        Enter the code that was sent to your email
      </p>
      <div className="w-full justify-center flex py-5">
         <OTPField otp={otp} setOtp={setOtp}/>
      </div>
    </div>
  );
};

export default OTPForm;
