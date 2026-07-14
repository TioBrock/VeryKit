const firstNames = ["James","Mary","John","Patricia","Robert","Jennifer","Michael","Linda","William","Elizabeth","David","Barbara","Richard","Susan","Joseph","Jessica","Thomas","Sarah","Charles","Karen","Emma","Liam","Olivia","Noah","Ava","Sophia","Isabella","Mia","Charlotte","Amelia"];
const lastNames = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin","Lee","Perez","Thompson","White","Harris"];
const cities = ["New York","Los Angeles","Chicago","Houston","Phoenix","San Antonio","San Diego","Dallas","Austin","Seattle","Portland","Miami","Denver","Boston","Nashville"];
const streets = ["Main St","Oak Ave","Pine Rd","Maple Dr","Cedar Ln","Elm St","Park Ave","1st Ave","2nd St","3rd Blvd"];
const domains = ["example.com","test.io","sample.org","demo.net","mail.com"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateDate(): string {
  const y = randInt(2020, 2025);
  const m = String(randInt(1, 12)).padStart(2, "0");
  const d = String(randInt(1, 28)).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function generatePhone(): string {
  return `(${randInt(100, 999)}) ${randInt(100, 999)}-${randInt(1000, 9999)}`;
}

function generateEmail(): string {
  const first = pick(firstNames).toLowerCase();
  const last = pick(lastNames).toLowerCase();
  return `${first}.${last}@${pick(domains)}`;
}

function generateAddress(): string {
  return `${randInt(100, 9999)} ${pick(streets)}, ${pick(cities)}`;
}

const generators: Record<string, () => string> = {
  name: () => `${pick(firstNames)} ${pick(lastNames)}`,
  email: generateEmail,
  phone: generatePhone,
  address: generateAddress,
  number: () => String(randInt(1, 10000)),
  date: generateDate,
  uuid: generateId,
};

export type ColumnDef = { name: string; type: string };
export type OutputFormat = "csv" | "json" | "sql";

export function generateTestData(columns: ColumnDef[], rows: number, format: OutputFormat): string {
  const data: Record<string, string>[] = [];

  for (let i = 0; i < rows; i++) {
    const row: Record<string, string> = {};
    for (const col of columns) {
      const gen = generators[col.type] || (() => "N/A");
      row[col.name] = gen();
    }
    data.push(row);
  }

  if (format === "json") {
    return JSON.stringify(data, null, 2);
  }

  if (format === "csv") {
    const headers = columns.map((c) => c.name).join(",");
    const lines = data.map((row) =>
      columns.map((c) => {
        const val = row[c.name] || "";
        return val.includes(",") || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
      }).join(",")
    );
    return [headers, ...lines].join("\n");
  }

  // SQL
  const table = "test_data";
  const cols = columns.map((c) => c.name).join(", ");
  const inserts = data.map((row) => {
    const vals = columns.map((c) => {
      const val = row[c.name] || "";
      return `'${val.replace(/'/g, "''")}'`;
    }).join(", ");
    return `INSERT INTO ${table} (${cols}) VALUES (${vals});`;
  });
  return inserts.join("\n");
}
