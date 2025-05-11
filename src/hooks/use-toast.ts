
// Import directly from Radix UI
import { useToast as useRadixToast } from "@radix-ui/react-toast";
import { Toast, ToastProps } from "@/components/ui/toast";

export type { Toast, ToastProps };
export type ToastActionElement = React.ReactElement<typeof ToastAction>;

// Re-export the toast hook from Radix UI
export const useToast = useRadixToast;

// Import the ToastAction component
import { ToastAction } from "@/components/ui/toast";
