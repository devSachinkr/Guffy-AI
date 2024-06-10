import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import React, { Dispatch } from "react";

type Props = {
  setOtp: Dispatch<React.SetStateAction<string>>;
  otp: string;
};
const OTPField = ({ otp, setOtp }: Props) => {
  return (
    <>
      <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
        <div className="flex gap-3">
          <div>
            <InputOTPSlot index={0} />
          </div>
          <div>
            <InputOTPSlot index={1} />
          </div>
          <div>
            <InputOTPSlot index={2} />
          </div>
          <div>
            <InputOTPSlot index={3} />
          </div>
          <div>
            <InputOTPSlot index={4} />
          </div>
          <div>
            <InputOTPSlot index={5} />
          </div>
        </div>
      </InputOTP>
    </>
  );
};

export default OTPField;
