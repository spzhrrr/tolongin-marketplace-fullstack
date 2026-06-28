export function validateEnvironment(env: Record<string, unknown>) {
  if (env.NODE_ENV !== 'production') return env;
  const required = [
    'DATABASE_URL',
    'JWT_SECRET',
    'CORS_ORIGIN',
    'APP_URL',
    'PAYMENT_WEBHOOK_SECRET',
  ];
  const missing = required.filter((key) => !String(env[key] || '').trim());
  if (missing.length) {
    throw new Error('Missing production environment: ' + missing.join(', '));
  }
  if (String(env.JWT_SECRET).length < 32) {
    throw new Error('JWT_SECRET must contain at least 32 characters');
  }
  if (String(env.CORS_ORIGIN).trim() === '*') {
    throw new Error('CORS_ORIGIN cannot be wildcard in production');
  }
  return env;
}
