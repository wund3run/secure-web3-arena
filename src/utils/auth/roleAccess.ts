
import { User } from "@supabase/supabase-js";

/**
 * Check if a user has a specific role
 * @param user The authenticated user object
 * @param role The role to check ("auditor", "project_owner", or "admin")
 * @param userProfile Optional user profile with additional user data
 * @returns Boolean indicating if the user has the specified role
 */
export const hasRole = (
  user: User | null,
  role: "auditor" | "project_owner" | "admin",
  userProfile?: any
): boolean => {
  if (!user) return false;

  // First check userProfile if available
  if (userProfile?.user_type) {
    return userProfile.user_type === role;
  }

  // Fall back to user_metadata
  return user.user_metadata?.user_type === role;
};

/**
 * Get the user's role from user object or profile
 * @param user The authenticated user object
 * @param userProfile Optional user profile with additional user data
 * @returns The user's role as "auditor", "project_owner", or "admin"
 */
export const getUserRole = (
  user: User | null,
  userProfile?: any
): "auditor" | "project_owner" | "admin" => {
  if (!user) return "project_owner"; // Default role

  // First check userProfile if available
  if (userProfile?.user_type) {
    return userProfile.user_type as "auditor" | "project_owner" | "admin";
  }

  // Fall back to user_metadata
  return (user.user_metadata?.user_type as "auditor" | "project_owner" | "admin") || "project_owner";
};

/**
 * Filter content based on user role
 * @param user The authenticated user object
 * @param contentMap Object with content mapped to roles
 * @param userProfile Optional user profile with additional user data
 * @returns The appropriate content for the user's role
 */
export const roleBasedContent = <T>(
  user: User | null,
  contentMap: {
    auditor?: T;
    project_owner?: T;
    admin?: T;
    default: T;
  },
  userProfile?: any
): T => {
  if (!user) return contentMap.default;
  
  const role = getUserRole(user, userProfile);
  
  if (role === "auditor" && contentMap.auditor) {
    return contentMap.auditor;
  }
  
  if (role === "project_owner" && contentMap.project_owner) {
    return contentMap.project_owner;
  }

  if (role === "admin" && contentMap.admin) {
    return contentMap.admin;
  }
  
  return contentMap.default;
};
