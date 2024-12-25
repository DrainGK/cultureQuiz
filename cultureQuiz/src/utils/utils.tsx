export function slugify(input: string): string {
    return input
      .toLowerCase()            // 1. Tout en minuscules
      .trim()                   // 2. Retire les espaces en début/fin
      .replace(/\s+/g, "-")     // 3. Remplace les espaces multiples par un tiret
      .replace(/[^\w-]+/g, ""); // 4. Supprime les caractères non alphanumériques (sauf tiret)
  }

export function shuffleArray<T>(arr: T[]): T[] {
    // Créer une copie pour ne pas muter l’original
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Échange entre copy[i] et copy[j]
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  