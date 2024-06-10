import { X } from "lucide-react";
import { toast } from "sonner";

interface props {
  title: "Success" | "Oopse!";
  desc: string;
}
export const ToastNotify = ({ desc, title }: props) => {
  return toast(title, {
    description: desc,
    action:{
        label:"X",
        onClick:()=>{toast.dismiss()}
    }
  });
};
