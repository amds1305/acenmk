
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

// Define the toast function that was missing
const toast = (props: Omit<ToasterToast, "id">) => {
  const { toast: toastFn } = useToastOriginal();
  return toastFn(props);
};

export { useToast, toast };
