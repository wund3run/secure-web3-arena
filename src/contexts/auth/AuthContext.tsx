
import React, { createContext, useContext } from "react";
import { useAuthProvider } from "./useAuthProvider";
import { AuthContextProps } from "./types";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthProvider();

  // Ensure all required functions are present with proper fallbacks
  const authWithRequiredFunctions: AuthContextProps = {
    ...auth,
    forgotPassword: auth.forgotPassword || (async (email: string) => {
      console.warn("forgotPassword not implemented");
      throw new Error("Password reset not implemented");
    }),
    resetPassword: auth.resetPassword || (async (newPassword: string) => {
      console.warn("resetPassword not implemented");
      throw new Error("Password reset not implemented");
    }),
  };

  return (
    <AuthContext.Provider value={authWithRequiredFunctions}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
