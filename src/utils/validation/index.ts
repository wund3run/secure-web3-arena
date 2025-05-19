
import { ValidationIssue } from "./types";
import { validateRoutes } from "./validators/route-validator";
import { validateResponsiveDesign } from "./validators/responsive-validator"; 
import { validateCurrentPage } from "./validators/page-validator";
import { validateConsistency } from "./validators/consistency-validator";
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
