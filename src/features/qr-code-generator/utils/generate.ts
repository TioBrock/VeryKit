import QRCode from "qrcode";

export async function generateQrCode(text: string): Promise<string> {
  return QRCode.toDataURL(text, { width: 256, margin: 2, color: { dark: "#000000", light: "#ffffff" } });
}

interface PixPayload {
  pixKey: string;
  receiverName: string;
  city: string;
  amount?: string;
}

function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function tlv(id: string, value: string): string {
  const len = value.length.toString().padStart(2, "0");
  return id + len + value;
}

function generateRandomTxid(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let txid = "";
  for (let i = 0; i < 23; i++) {
    txid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return txid;
}

export function buildPixPayload({ pixKey, receiverName, city, amount }: PixPayload): string {
  const merchantAccountInfo =
    tlv("00", "br.gov.bcb.pix") + tlv("01", pixKey);
  const truncatedName = receiverName.substring(0, 25);
  const truncatedCity = city.substring(0, 15);
  const txid = generateRandomTxid();

  let payload = "";
  payload += tlv("00", "01");
  payload += tlv("26", merchantAccountInfo);
  payload += tlv("52", "0000");
  payload += tlv("53", "986");
  if (amount && amount.trim()) {
    payload += tlv("54", amount.trim());
  }
  payload += tlv("58", "BR");
  payload += tlv("59", truncatedName);
  payload += tlv("60", truncatedCity);
  payload += tlv("62", tlv("05", txid));

  const payloadWithoutCrc = payload + "6304";
  const crc = crc16(payloadWithoutCrc);
  payload += "6304" + crc;

  return payload;
}
