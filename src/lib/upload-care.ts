import { UploadClient } from "@uploadcare/upload-client";

if (!process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY) {
  console.log("NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY undefined");
  process.exit(1);
}
export const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY,
});
