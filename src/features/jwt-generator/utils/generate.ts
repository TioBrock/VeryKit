import { SignJWT } from 'jose';

export interface JwtGeneratorInput {
  header: string;
  payload: string;
  secret: string;
}

export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

export async function generateJwt(input: JwtGeneratorInput): Promise<string> {
  const header = JSON.parse(input.header);
  const payload = JSON.parse(input.payload);
  const secret = new TextEncoder().encode(input.secret);

  const jwt = await new SignJWT(payload)
    .setProtectedHeader(header)
    .sign(secret);

  return jwt;
}
