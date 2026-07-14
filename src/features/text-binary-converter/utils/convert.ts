export function textToBinary(text: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  return Array.from(bytes)
    .map((b) => b.toString(2).padStart(8, "0"))
    .join(" ");
}

export function binaryToText(binary: string): string {
  const cleaned = binary.trim().replace(/\s+/g, " ");
  const bits = cleaned.split(" ");
  const bytes = new Uint8Array(
    bits.map((b) => {
      const trimmed = b.trim();
      if (!/^[01]+$/.test(trimmed) || trimmed.length > 8) {
        throw new Error("Invalid binary input");
      }
      return parseInt(trimmed, 2);
    })
  );
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}
