export function encodeUrl(text: string): string {
  return encodeURIComponent(text);
}

export function decodeUrl(text: string): string {
  return decodeURIComponent(text);
}

export function encodeUrlFull(text: string): string {
  return encodeURI(text);
}

export function decodeUrlFull(text: string): string {
  return decodeURI(text);
}
