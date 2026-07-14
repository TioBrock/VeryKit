export interface ParsedCurl {
  url: string;
  method: string;
  headers: Record<string, string>;
  data?: string;
  cookies?: Record<string, string>;
}

export function parseCurl(curl: string): ParsedCurl {
  const cleaned = curl.replace(/\\\n/g, " ").replace(/\\/g, "").trim();

  // Remove common terminal flags that don't affect the HTTP request
  const ignored = /\s-(?:O|L|i|v|s|k|S|g|f|u|U|e|x|H|:)\b/g;
  const ignoredLong = /\s--(?:silent|insecure|location|include|verbose|output|secure|get|compressed|head|list-only|no-keepalive|raw|stderr|proxy|proxy-user|anyauth|digest|negotiate|ntlm|basic|ftp-create-dirs|ssl-allow-beast|ssl-no-revoke|ssl-reqd|tlsv1|tlsv1_0|tlsv1_1|tlsv1_2|tlsv1_3|no-alpn|no-npn|no-sslv2|no-sslv3|no-tls1|no-tls1_1|no-tls1_2|no-tls1_3|proxytunnel|post301|post302|post303|keepalive|no-location|next|fail|help|version|write-out|time-cond|connect-timeout|max-time|retry|max-redirs|limit-rate|resolve|interface|dns-servers|abstract-unix-socket|unix-socket|path-as-is|haproxy-protocol|expect100-timeout|happy-eyeballs-timeout-ms|alpn|no-alpn|compressed|tr-encoding|no-clobber|no-progress-meter|no-buffer|buffer|max-filesize|continue-at|crlf|dns-ipv4-addr|dns-ipv6-addr|engine|etag-save|etag-compare|function|--max-time|--connect-timeout|--retry|--max-redirs|--limit-rate|--resolve|--interface|--dns-servers|--unix-socket|--abstract-unix-socket|--path-as-is|--haproxy-protocol|--expect100-timeout|--happy-eyeballs-timeout-ms|--alpn|--compressed|--tr-encoding|--no-clobber|--no-progress-meter|--no-buffer|--buffer|--max-filesize|--continue-at|--crlf|--dns-ipv4-addr|--dns-ipv6-addr|--engine|--etag-save|--etag-compare|--next|--fail|--help|--version|--write-out|--time-cond|--data-binary|--data-raw)\b/g;
  let cleanedFlags = cleaned.replace(ignored, "").replace(ignoredLong, "");

  // Also remove -d, --data, -H, --header, -b, --cookie, -X as standalone flags
  // (we extract their values separately below, but the flag itself can confuse URL extraction)
  // Remove isolated flag letters without values (common in curl snippets)
  cleanedFlags = cleanedFlags.replace(/\bcurl\s+/, " ");

  // URL extraction - handle URLs with and without quotes, with flags before URL
  let url = "";
  // Try quoted URL first
  const quotedUrlMatch = cleanedFlags.match(/(['"])(https?:\/\/[^\s'"]+)\1/);
  if (quotedUrlMatch) {
    url = quotedUrlMatch[2];
  } else {
    // Try unquoted URL - must come after a space or at start
    const unquotedUrlMatch = cleanedFlags.match(/(?:^|\s)(https?:\/\/[^\s'"]+)/);
    if (unquotedUrlMatch) {
      url = unquotedUrlMatch[1];
    }
  }

  let method = "GET";
  const methodMatch = cleaned.match(/-X\s+(\w+)/);
  if (methodMatch) {
    method = methodMatch[1].toUpperCase();
  }

  const headers: Record<string, string> = {};
  const headerRegex = /(?:-H\s+|--header\s+)(['"]?)(.*?)\1(?:\s|$)/g;
  let headerMatch;
  while ((headerMatch = headerRegex.exec(cleaned)) !== null) {
    const headerValue = headerMatch[2];
    const colonIndex = headerValue.indexOf(":");
    if (colonIndex !== -1) {
      const key = headerValue.slice(0, colonIndex).trim();
      const value = headerValue.slice(colonIndex + 1).trim();
      headers[key] = value;
    }
  }

  let data: string | undefined;
  const dataMatch = cleaned.match(/(?:--data-raw|--data-binary|-d|--data)\s+(['"]?)(.*?)\1(?:\s+-|$)/);
  if (dataMatch) {
    data = dataMatch[2];
    if (!method || method === "GET") {
      method = "POST";
    }
  }

  const cookies: Record<string, string> = {};
  const cookieMatch = cleaned.match(/(?:-b\s+|--cookie\s+)(['"]?)(.*?)\1(?:\s|$)/);
  if (cookieMatch) {
    const cookieStr = cookieMatch[2];
    cookieStr.split(";").forEach((pair) => {
      const [key, value] = pair.split("=").map((s) => s.trim());
      if (key && value) {
        cookies[key] = value;
      }
    });
  }

  if (!url) {
    throw new Error("No URL found in cURL command");
  }

  return { url, method, headers, data, cookies };
}

export function toFetchCode(parsed: ParsedCurl): string {
  const lines: string[] = [];

  lines.push(`const response = await fetch("${parsed.url}", {`);
  lines.push(`  method: "${parsed.method}",`);

  const headerEntries = Object.entries(parsed.headers);
  if (headerEntries.length > 0) {
    lines.push(`  headers: {`);
    headerEntries.forEach(([key, value]) => {
      lines.push(`    "${key}": "${value}",`);
    });
    lines.push(`  },`);
  }

  if (parsed.data) {
    lines.push(`  body: JSON.stringify(${parsed.data}),`);
  }

  lines.push(`});`);
  lines.push(``);
  lines.push(`const data = await response.json();`);
  lines.push(`console.log(data);`);

  return lines.join("\n");
}

export function toPythonCode(parsed: ParsedCurl): string {
  const lines: string[] = [];

  lines.push(`import requests`);
  lines.push(``);

  const headerEntries = Object.entries(parsed.headers);
  if (headerEntries.length > 0) {
    lines.push(`headers = {`);
    headerEntries.forEach(([key, value]) => {
      lines.push(`    "${key}": "${value}",`);
    });
    lines.push(`}`);
    lines.push(``);
  }

  const methodLower = parsed.method.toLowerCase();
  let kwargs: string[] = [];

  if (headerEntries.length > 0) {
    kwargs.push(`headers=headers`);
  }

  if (parsed.data) {
    kwargs.push(`data=${parsed.data}`);
  }

  if (parsed.cookies && Object.keys(parsed.cookies).length > 0) {
    const cookieEntries = Object.entries(parsed.cookies);
    lines.push(`cookies = {`);
    cookieEntries.forEach(([key, value]) => {
      lines.push(`    "${key}": "${value}",`);
    });
    lines.push(`}`);
    lines.push(``);
    kwargs.push(`cookies=cookies`);
  }

  const kwargsStr = kwargs.length > 0 ? `, ${kwargs.join(", ")}` : "";
  lines.push(`response = requests.${methodLower}("${parsed.url}"${kwargsStr})`);
  lines.push(``);
  lines.push(`print(response.json())`);

  return lines.join("\n");
}
