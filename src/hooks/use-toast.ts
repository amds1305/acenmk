
import {
  Toast,
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast";
import { useToast as useToastOriginal } from "@/components/ui/use-toast";

type ToasterToast = Toast & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const useToast = () => {
  const { toast, ...rest } = useToastOriginal();

  return {
    toast,
    ...rest,
  };
};

export { useToast, toast };
