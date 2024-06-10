import { z } from "zod";

export interface userLoginProps {
  email: string;
  password: string;
}
export const userLoginSchema = z.object({
  email: z.string().email({ message: "Incorrect email format" }),
  password: z
    .string()
    .min(8, { message: "password must be atleast 8 characters long" })
    .max(64, { message: "password can not be longer then 64 characters long" })
    .max(64, { message: "password can not be longer then 64 characters " }),
});
