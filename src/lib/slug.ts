
export function getHabitSlug(name: string): string {
  return name
    .trim()                           // this remove leading/trailing spaces
    .toLowerCase()                    // this convert to lowercase
    .replace(/\s+/g, '-')            // this replaces one or more spaces with hyphen
    .replace(/[^a-z0-9-]/g, '');     // Remove non-alphanumeric except hyphens
}