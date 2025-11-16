export const ageRange = Array.from({ length: 81 })
  .map((_, i) => ({
    label: String(i + 10),
    value: String(i + 10)
  }));
