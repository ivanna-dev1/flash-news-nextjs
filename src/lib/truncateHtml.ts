// Cuts HTML to maxWords words without breaking tags.
export function truncateHtml(html: string, maxWords: number): string {
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
