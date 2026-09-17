export function parseSetCookie(cookieStr: string) {
  if (!cookieStr) return null;
  const parts = cookieStr.split(';').map(part => part.trim());
  const [nameValuePair, ...optionsParts] = parts;
  const [name, value] = nameValuePair.split('=');
  if (!name || !value) return null;

  const options: Record<string, any> = {};
  optionsParts.forEach(part => {
    const [key, val] = part.split('=');
    const lowerKey = key.toLowerCase();
    if (lowerKey === 'path') options.path = val || '/';
    if (lowerKey === 'domain') options.domain = val;
    if (lowerKey === 'max-age') options.maxAge = Number(val);
    if (lowerKey === 'expires') options.expires = new Date(val);
    if (lowerKey === 'httponly') options.httpOnly = true;
    if (lowerKey === 'secure') options.secure = true;
    if (lowerKey === 'samesite') options.sameSite = val.toLowerCase() as any;
  });

  return { name: name.trim(), value: value.trim(), options };
}