
/**
 * This file is kept for backward compatibility.
 * For new code, import directly from '@/utils/validation'
 */

import { usePlatformValidator } from './hooks/usePlatformValidator';
import PlatformValidatorWidget from './components/PlatformValidatorWidget';

// Re-export for backward compatibility
export { usePlatformValidator, PlatformValidatorWidget };
export default PlatformValidatorWidget;
