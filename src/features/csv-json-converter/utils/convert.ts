export function csvToJson(csv: string): object[] {
  if (!csv.trim()) return [];

  const lines: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];

    if (char === '"') {
      if (inQuotes && csv[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "\n" && !inQuotes) {
      if (current.trim()) {
        lines.push(current);
      }
      current = "";
    } else if (char === "\r" && !inQuotes) {
      // skip
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    lines.push(current);
  }

  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const result: object[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const obj: Record<string, string> = {};

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[j] ?? "";
    }

    result.push(obj);
  }

  return result;
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      fields.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  fields.push(current);
  return fields;
}

function escapeCSVField(field: string): string {
  if (field.includes(",") || field.includes('"') || field.includes("\n")) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

export function jsonToCsv(json: string): string {
  const data = JSON.parse(json);

  if (!Array.isArray(data) || data.length === 0) return "";

  const headers = Array.from(new Set(data.flatMap((obj) => Object.keys(obj))));

  const rows = data.map((obj) =>
    headers.map((header) => escapeCSVField(String(obj[header] ?? ""))).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}
