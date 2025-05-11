
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import {
  useToast as useToastUI
} from "@/components/ui/use-toast";

export type { Toast, ToastActionElement, ToastProps };

export const useToast = useToastUI;
export { toast } from "@/components/ui/use-toast";
