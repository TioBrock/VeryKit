export interface UserAgentInfo {
  os: string;
  browser: string;
  version: string;
  device: "Mobile" | "Desktop" | "Tablet" | "Unknown";
}

export function parseUserAgent(ua: string): UserAgentInfo {
  const result: UserAgentInfo = {
    os: "Unknown",
    browser: "Unknown",
    version: "Unknown",
    device: "Unknown",
  };

  // Detect OS
  if (ua.includes("Windows NT 10.0")) {
    result.os = "Windows 10/11";
  } else if (ua.includes("Windows NT 6.3")) {
    result.os = "Windows 8.1";
  } else if (ua.includes("Windows NT 6.2")) {
    result.os = "Windows 8";
  } else if (ua.includes("Windows NT 6.1")) {
    result.os = "Windows 7";
  } else if (ua.includes("Windows")) {
    result.os = "Windows";
  } else if (ua.includes("Mac OS X")) {
    const macMatch = ua.match(/Mac OS X (\d+[._]\d+[._]?\d*)/);
    result.os = macMatch ? `macOS ${macMatch[1].replace(/_/g, ".")}` : "macOS";
  } else if (ua.includes("iPhone OS")) {
    const iosMatch = ua.match(/iPhone OS (\d+_\d+)/);
    result.os = iosMatch ? `iOS ${iosMatch[1].replace("_", ".")}` : "iOS";
  } else if (ua.includes("iPad")) {
    const iosMatch = ua.match(/OS (\d+_\d+)/);
    result.os = iosMatch ? `iPadOS ${iosMatch[1].replace("_", ".")}` : "iPadOS";
  } else if (ua.includes("Android")) {
    const androidMatch = ua.match(/Android (\d+[\.\d]*)/);
    result.os = androidMatch ? `Android ${androidMatch[1]}` : "Android";
  } else if (ua.includes("Linux")) {
    result.os = "Linux";
  } else if (ua.includes("CrOS")) {
    result.os = "Chrome OS";
  }

  // Detect Browser
  if (ua.includes("Edg/")) {
    const edgeMatch = ua.match(/Edg\/(\d+[\.\d]*)/);
    result.browser = "Microsoft Edge";
    result.version = edgeMatch ? edgeMatch[1] : "Unknown";
  } else if (ua.includes("OPR/") || ua.includes("Opera")) {
    const operaMatch = ua.match(/(?:OPR|Opera)\/(\d+[\.\d]*)/);
    result.browser = "Opera";
    result.version = operaMatch ? operaMatch[1] : "Unknown";
  } else if (ua.includes("Chrome/") && !ua.includes("Edg/")) {
    const chromeMatch = ua.match(/Chrome\/(\d+[\.\d]*)/);
    result.browser = "Chrome";
    result.version = chromeMatch ? chromeMatch[1] : "Unknown";
  } else if (ua.includes("Firefox/")) {
    const firefoxMatch = ua.match(/Firefox\/(\d+[\.\d]*)/);
    result.browser = "Firefox";
    result.version = firefoxMatch ? firefoxMatch[1] : "Unknown";
  } else if (ua.includes("Safari/") && ua.includes("Version/")) {
    const safariMatch = ua.match(/Version\/(\d+[\.\d]*)/);
    result.browser = "Safari";
    result.version = safariMatch ? safariMatch[1] : "Unknown";
  }

  // Detect Device
  if (/Mobi|Android.*Mobile|iPhone/i.test(ua)) {
    result.device = "Mobile";
  } else if (/iPad|Tablet|Android(?!.*Mobile)/i.test(ua)) {
    result.device = "Tablet";
  } else if (ua.includes("Mozilla/5.0") || ua.includes("Windows") || ua.includes("Mac") || ua.includes("Linux")) {
    result.device = "Desktop";
  }

  return result;
}
