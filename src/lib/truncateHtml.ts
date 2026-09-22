// Cuts HTML text to `maxWords` words and keeps the tags working.
// We count only words, not tags. A tag is never cut in the middle.
// If a tag stays open (for example <strong>), the browser closes it itself.
export function truncateHtml(html: string, maxWords: number): string {
  // "(<[^>]+>)" splits the text into tags and plain text parts.
  const parts = html.split(/(<[^>]+>)/);
  let words = 0;
  let result = "";

  for (const part of parts) {
    if (part.startsWith("<")) {
      result += part;
      continue;
    }
    const partWords = part.split(/(\s+)/);
    for (const piece of partWords) {
      const isWord = piece.trim() !== "";
      if (isWord && words === maxWords) return result.trimEnd() + "...";
      if (isWord) words++;
      result += piece;
    }
  }
  return result;
}
