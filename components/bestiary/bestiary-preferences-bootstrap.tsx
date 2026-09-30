"use client";

import * as React from "react";

const REVEAL_KEY = "mundinho.bestiary.revealAll";
const MIGRATION_KEY = "mundinho.bestiary.revealAll.defaultOn.v2";

export function BestiaryPreferencesBootstrap() {
  React.useLayoutEffect(() => {
    try {
      const migrated = localStorage.getItem(MIGRATION_KEY) === "true";
      if (!migrated) {
        localStorage.setItem(REVEAL_KEY, "true");
        localStorage.setItem(MIGRATION_KEY, "true");
        return;
      }

      if (localStorage.getItem(REVEAL_KEY) === null) {
        localStorage.setItem(REVEAL_KEY, "true");
      }
    } catch {
      // Sem storage disponível, o Bestiário continua funcional com o estado local da sessão.
    }
  }, []);

  return null;
}
