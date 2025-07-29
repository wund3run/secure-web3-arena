export interface SecurityToolConfig {
  name: string;
  description: string;
  version: string;
  supportedLanguages: string[];
  supportedFileTypes: string[];
  defaultArgs: string[];
  timeout: number;
  enabled: boolean;
  category: 'static-analysis' | 'symbolic-execution' | 'dependency-analysis' | 'linting';
  severityLevels: string[];
  documentation: string;
  installationCommand: string;
  usageExample: string;
}

export const SECURITY_TOOLS: Record<string, SecurityToolConfig> = {
  slither: {
    name: 'Slither',
    description: 'Static analysis framework for Solidity smart contracts',
    version: '0.9.3',
    supportedLanguages: ['Solidity'],
    supportedFileTypes: ['.sol'],
    defaultArgs: [
      '--exclude-low',
      '--exclude-informational',
      '--exclude-optimization',
      '--exclude-code-quality'
    ],
    timeout: 300,
    enabled: true,
    category: 'static-analysis',
    severityLevels: ['critical', 'high', 'medium', 'low', 'info'],
    documentation: 'https://github.com/crytic/slither',
    installationCommand: 'pipx install slither-analyzer',
    usageExample: 'slither contracts/ --exclude-low --exclude-informational'
  },
  solhint: {
    name: 'Solhint',
    description: 'Linter for Solidity that provides security, style guide and best practice rules',
    version: '4.0.0',
    supportedLanguages: ['Solidity'],
    supportedFileTypes: ['.sol'],
    defaultArgs: [
      '--config',
      'solhint.json',
      '--max-warnings',
      '0'
    ],
    timeout: 120,
    enabled: true,
    category: 'linting',
    severityLevels: ['error', 'warning', 'info'],
    documentation: 'https://protofire.github.io/solhint/',
    installationCommand: 'npm install -g solhint',
    usageExample: 'solhint contracts/ --config solhint.json'
  },
  mythril: {
    name: 'Mythril',
    description: 'Symbolic execution tool for smart contract security analysis',
    version: '0.23.0',
    supportedLanguages: ['Solidity', 'Vyper'],
    supportedFileTypes: ['.sol', '.vy'],
    defaultArgs: [
      '--max-depth',
      '10',
      '--solver-timeout',
      '10000',
      '--execution-timeout',
      '86400'
    ],
    timeout: 600,
    enabled: true,
    category: 'symbolic-execution',
    severityLevels: ['high', 'medium', 'low', 'info'],
    documentation: 'https://mythril-classic.readthedocs.io/',
    installationCommand: 'pipx install mythril',
    usageExample: 'myth analyze contracts/Token.sol --max-depth 10'
  },
  'cargo-audit': {
    name: 'Cargo Audit',
    description: 'Audit Rust dependencies for security vulnerabilities',
    version: '0.18.0',
    supportedLanguages: ['Rust'],
    supportedFileTypes: ['.rs', '.toml'],
    defaultArgs: [
      '--deny',
      'warnings',
      '--format',
      'json'
    ],
    timeout: 60,
    enabled: true,
    category: 'dependency-analysis',
    severityLevels: ['critical', 'high', 'medium', 'low'],
    documentation: 'https://github.com/RustSec/cargo-audit',
    installationCommand: 'cargo install cargo-audit',
    usageExample: 'cargo audit --deny warnings'
  }
};

export const TOOL_CATEGORIES = {
  'static-analysis': {
    name: 'Static Analysis',
    description: 'Analyze code without executing it',
    tools: ['slither']
  },
  'symbolic-execution': {
    name: 'Symbolic Execution',
    description: 'Execute code symbolically to find vulnerabilities',
    tools: ['mythril']
  },
  'dependency-analysis': {
    name: 'Dependency Analysis',
    description: 'Check dependencies for known vulnerabilities',
    tools: ['cargo-audit']
  },
  'linting': {
    name: 'Linting',
    description: 'Check code style and best practices',
    tools: ['solhint']
  }
};

export const SEVERITY_WEIGHTS = {
  critical: 10,
  high: 7,
  medium: 4,
  low: 1,
  info: 0.5,
  warning: 2,
  error: 8
};

export const DEFAULT_TOOL_CONFIG = {
  slither: {
    enabled: true,
    timeout: 300,
    customArgs: ['--exclude-low', '--exclude-informational'],
    severityThreshold: 'medium' as const
  },
  solhint: {
    enabled: true,
    timeout: 120,
    customArgs: ['--config', 'solhint.json'],
    severityThreshold: 'medium' as const
  },
  mythril: {
    enabled: true,
    timeout: 600,
    customArgs: ['--max-depth', '10'],
    severityThreshold: 'high' as const
  },
  'cargo-audit': {
    enabled: true,
    timeout: 60,
    customArgs: ['--deny', 'warnings'],
    severityThreshold: 'medium' as const
  }
};

export const SUPPORTED_FILE_TYPES = {
  'Solidity': ['.sol'],
  'Rust': ['.rs', '.toml'],
  'JavaScript': ['.js', '.ts'],
  'Python': ['.py'],
  'Go': ['.go']
};

export const ANALYSIS_PRESETS = {
  'quick-scan': {
    name: 'Quick Scan',
    description: 'Fast analysis with basic security checks',
    tools: ['solhint'],
    timeout: 60
  },
  'comprehensive': {
    name: 'Comprehensive Analysis',
    description: 'Full security analysis with all tools',
    tools: ['slither', 'solhint', 'mythril', 'cargo-audit'],
    timeout: 1200
  },
  'production-ready': {
    name: 'Production Ready',
    description: 'Strict analysis for production deployment',
    tools: ['slither', 'mythril'],
    timeout: 900
  },
  'dependency-check': {
    name: 'Dependency Check',
    description: 'Focus on dependency vulnerabilities',
    tools: ['cargo-audit'],
    timeout: 120
  }
}; 