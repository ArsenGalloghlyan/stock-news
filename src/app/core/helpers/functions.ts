export function jsonParse<T>(jsonStr: string | null): T | null {
  if (!jsonStr) {
    return null;
  }
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error('Error parsing JSON', e);
    return null;
  }
}
