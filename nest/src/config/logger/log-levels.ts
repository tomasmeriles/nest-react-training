export const LOG_LEVEL_MAP = {
  fatal: ['fatal'] as const,
  error: ['fatal', 'error'] as const,
  warn: ['fatal', 'error', 'warn'] as const,
  log: ['fatal', 'error', 'warn', 'log'] as const,
  debug: ['fatal', 'error', 'warn', 'log', 'debug'] as const,
  verbose: ['fatal', 'error', 'warn', 'log', 'debug', 'verbose'] as const,
};
