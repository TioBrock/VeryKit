export type LoremType = "paragraphs" | "words" | "lists";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "perspiciatis", "unde",
  "omnis", "iste", "natus", "error", "voluptatem", "accusantium", "doloremque",
  "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo",
  "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta",
  "explicabo", "nemo", "ipsam", "quia", "voluptas", "aspernatur", "aut", "odit",
  "fugit", "consequuntur", "magni", "dolores", "eos", "ratione", "sequi", "nesciunt",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSentence(): string {
  const length = 8 + Math.floor(Math.random() * 12);
  const words: string[] = [];
  for (let i = 0; i < length; i++) {
    words.push(pickRandom(LOREM_WORDS));
  }
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(): string {
  const sentences = 3 + Math.floor(Math.random() * 4);
  const parts: string[] = [];
  for (let i = 0; i < sentences; i++) {
    parts.push(generateSentence());
  }
  return parts.join(" ");
}

function generateListItem(): string {
  return generateSentence();
}

export function generateLoremIpsum(count: number, type: LoremType): string {
  const items: string[] = [];

  for (let i = 0; i < count; i++) {
    switch (type) {
      case "paragraphs":
        items.push(generateParagraph());
        break;
      case "words":
        items.push(pickRandom(LOREM_WORDS));
        break;
      case "lists":
        items.push(`- ${generateListItem()}`);
        break;
    }
  }

  return items.join(type === "paragraphs" ? "\n\n" : "\n");
}
