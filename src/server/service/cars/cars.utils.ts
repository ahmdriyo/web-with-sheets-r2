export function generateSlug(
  brand: string,
  model: string,
  title: string,
  year: number,
): string {
  const combined = `${brand} ${model} ${title} ${year}`
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return combined;
}
