export function generateSlug(
  brand: string,
  model: string,
  title: string,
): string {
  const combined = `${brand} ${model} ${title}`
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen

  return combined;
}
