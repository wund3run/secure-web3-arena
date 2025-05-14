
// This file is a bridge for the toast functionality
// Re-export the sonner toast functionality for consistent usage throughout the app
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";

export { toast, useToast };
