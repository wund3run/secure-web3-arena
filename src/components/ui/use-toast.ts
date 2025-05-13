
// This file is a bridge for the toast functionality
import { useToast as useToastOriginal, toast as toastOriginal } from "@/hooks/use-toast";

// Re-export with proper typing
export const useToast = useToastOriginal;
export const toast = toastOriginal;
