import md5 from "md5";

export type HashAlgorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-512";

async function shaHash(algorithm: string, text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function generateHash(text: string, algorithm: HashAlgorithm): Promise<string> {
  switch (algorithm) {
    case "MD5":
      return md5(text);
    case "SHA-1":
      return shaHash("SHA-1", text);
    case "SHA-256":
      return shaHash("SHA-256", text);
    case "SHA-512":
      return shaHash("SHA-512", text);
  }
}

export const HASH_ALGORITHMS: HashAlgorithm[] = ["MD5", "SHA-1", "SHA-256", "SHA-512"];
