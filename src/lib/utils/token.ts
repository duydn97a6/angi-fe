export function isValidToken(token: unknown): token is string {
  return typeof token === 'string' && token.trim().length > 0 && token !== 'undefined' && token !== 'null';
}

export function normalizeToken(token: unknown) {
  return isValidToken(token) ? token : null;
}
