export interface ChmodPermissions {
  owner: { r: boolean; w: boolean; x: boolean };
  group: { r: boolean; w: boolean; x: boolean };
  public: { r: boolean; w: boolean; x: boolean };
}

function bitsToNum(r: boolean, w: boolean, x: boolean): number {
  return (r ? 4 : 0) + (w ? 2 : 0) + (x ? 1 : 0);
}

function numToBits(n: number): { r: boolean; w: boolean; x: boolean } {
  return { r: !!(n & 4), w: !!(n & 2), x: !!(n & 1) };
}

export function calculateChmod(permissions: ChmodPermissions): { octal: string; symbolic: string } {
  const owner = bitsToNum(permissions.owner.r, permissions.owner.w, permissions.owner.x);
  const group = bitsToNum(permissions.group.r, permissions.group.w, permissions.group.x);
  const pub = bitsToNum(permissions.public.r, permissions.public.w, permissions.public.x);

  const octal = `${owner}${group}${pub}`;

  const toSym = (b: { r: boolean; w: boolean; x: boolean }) =>
    `${b.r ? "r" : "-"}${b.w ? "w" : "-"}${b.x ? "x" : "-"}`;

  const symbolic = `${toSym(permissions.owner)}${toSym(permissions.group)}${toSym(permissions.public)}`;

  return { octal, symbolic };
}

export function octalToPermissions(octal: string): ChmodPermissions | null {
  if (!/^[0-7]{3}$/.test(octal)) return null;
  const [o, g, p] = octal.split("").map(Number);
  return {
    owner: numToBits(o),
    group: numToBits(g),
    public: numToBits(p),
  };
}

export const PRESETS: { label: string; octal: string }[] = [
  { label: "755", octal: "755" },
  { label: "644", octal: "644" },
  { label: "777", octal: "777" },
  { label: "600", octal: "600" },
  { label: "666", octal: "666" },
  { label: "400", octal: "400" },
];
