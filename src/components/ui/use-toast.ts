
// This file now just re-exports from the hook
import { useToast as useToastHook, toast as toastFunction } from "@/hooks/use-toast";
import type { Toast, ToastProps, ToastActionElement } from "@/hooks/use-toast";

export const useToast = useToastHook;
export type { Toast, ToastProps, ToastActionElement };

// Export toast function
export const toast = toastFunction;
