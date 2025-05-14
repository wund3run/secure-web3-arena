
// This file is a bridge for the toast functionality
// Re-export the sonner toast functionality for consistent usage throughout the app
import { toast } from "sonner";

// Re-export the hook from local hooks folder
import { useToast } from "@/hooks/use-toast";

// Export both the toast function and the useToast hook
export { toast, useToast };
