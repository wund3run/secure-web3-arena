
import { ValidationIssue } from "./types";
import { validateRoutes, validateResponsiveDesign, validateCurrentPage, validateConsistency } from "./validators";
import { usePlatformValidator } from "./hooks/usePlatformValidator";
import { PlatformValidatorWidget } from "./components/PlatformValidatorWidget";

export {
  usePlatformValidator,
  PlatformValidatorWidget,
  validateRoutes,
  validateResponsiveDesign,
  validateCurrentPage,
  validateConsistency,
  type ValidationIssue
};
