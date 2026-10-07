// Guardian ids contain slashes, so links carry them URL-encoded ("world%2F2026%2F...").
// The database keeps the original id. null = a broken "%" sequence.
export function decodeGuardianId(id: string): string | null {
  try {
    return decodeURIComponent(id);
  } catch {
    return null;
  }
}
