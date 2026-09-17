export function parseSetCookie(cookieStr: string) {
  const [cookiePart] = cookieStr.split(';');
  const [name, ...rest] = cookiePart.split('=');
  const value = rest.join('=');
  if (!name || !value) return null;

  const options: Record<string, any> = {};
  const parts = cookieStr.split(';').slice(1);

  parts.forEach((part) => {
    const [key, val] = part.trim().split('=');
    const lowerKey = key.toLowerCase();
    if (lowerKey === 'path') options.path = val || '/';
    if (lowerKey === 'domain') options.domain = val;
    if (lowerKey === 'max-age') options.maxAge = Number(val);
    if (lowerKey === 'expires') options.expires = new Date(val);
    if (lowerKey === 'httponly') options.httpOnly = true;
    if (lowerKey === 'secure') options.secure = true;
    if (lowerKey === 'samesite') options.sameSite = (val.toLowerCase() as any);
  });

  return { name: name.trim(), value: value.trim(), options };
}