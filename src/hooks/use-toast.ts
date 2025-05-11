
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import {
  useToast as useToastUI,
  toast as toastFunction
} from "@radix-ui/react-toast";

export type { Toast, ToastActionElement, ToastProps };

export const useToast = useToastUI;
export const toast = toastFunction;
