export function slugify(input: string): string {
    return input
      .toLowerCase()            // 1. Tout en minuscules
      .trim()                   // 2. Retire les espaces en début/fin
      .replace(/\s+/g, "-")     // 3. Remplace les espaces multiples par un tiret
      .replace(/[^\w-]+/g, ""); // 4. Supprime les caractères non alphanumériques (sauf tiret)
  }
  