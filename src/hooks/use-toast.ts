
import {
  Toast,
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast";
import { useToast as useToastOriginal } from "@radix-ui/react-toast";

type ToasterToast = Toast & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// Create a custom hook that extends the original hook
const useToast = () => {
  const methods = useToastOriginal();
  
  return {
    ...methods,
    toast: (props: Omit<ToasterToast, "id">) => {
      const id = crypto.randomUUID();
      methods.toast({ id, ...props });
      return id;
    }
  };
};

// Define the toast function
const toast = (props: Omit<ToasterToast, "id">) => {
  const { toast: toastFn } = useToast();
  return toastFn(props);
};

export { useToast, toast };
