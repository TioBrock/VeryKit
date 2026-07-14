function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function calculateAspectRatio(
  width?: number,
  height?: number,
  ratioW?: number,
  ratioH?: number,
): { width: number; height: number; ratio: string } | null {
  if (ratioW && ratioH && ratioW > 0 && ratioH > 0) {
    if (width && !height) {
      return { width, height: Math.round((width / ratioW) * ratioH), ratio: `${ratioW}:${ratioH}` };
    }
    if (height && !width) {
      return { width: Math.round((height / ratioH) * ratioW), height, ratio: `${ratioW}:${ratioH}` };
    }
  }

  if (width && height && width > 0 && height > 0) {
    const g = gcd(width, height);
    const rw = width / g;
    const rh = height / g;
    return { width, height, ratio: `${rw}:${rh}` };
  }

  return null;
}

export const COMMON_RATIOS = ["16:9", "4:3", "1:1", "21:9", "3:2", "5:4"];
