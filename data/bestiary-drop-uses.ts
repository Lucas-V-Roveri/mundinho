import type { BestiaryDrop, BestiaryEntry, BestiaryUseConfidence } from "@/types/bestiary";

type DropUse = {
  use: string;
  useConfidence: BestiaryUseConfidence;
  guideHref?: string;
};

function key(value: string) {
  return value.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[—–]/g, "-").replace(/\s+/g, " ").trim();
}

const DROP_USE: Record<string, DropUse> = {
  "ignitium ingot": {
    use: "Material de endgame usado no Ignitium Upgrade Smithing Template, Block of Ignitium, The Incinerator, Bulwark of the Flame e Blazing Grips — ver as receitas completas no guia de Ignis.",
    useConfidence: "Alta",
    guideHref: "/mods#guide-ignis-craftings",
  },
  "music disc - light my fire": {
    use: "Disco tocável em jukebox; sem uso de crafting conhecido — item colecionável/musical.",
    useConfidence: "Alta",
  },
  "experience": {
    use: "Experiência para encantamentos, bigorna e reparo com Mending; não é um item de crafting.",
    useConfidence: "Alta",
  },
  "bone serpent tooth": {
    use: "Material do Alex's Mobs com uso conhecido em brewing, incluindo Potion of Lava Vision. A grade/receita exata da build 2.1.14 ainda não está documentada no guia; conferir no JEI para detalhes.",
    useConfidence: "Média",
  },
  "bone": {
    use: "Material vanilla: vira Bone Meal e entra em receitas/uso de crescimento; também serve para compactação em blocos de osso via Bone Meal.",
    useConfidence: "Alta",
  },
  "bone block": {
    use: "Bloco de construção/armazenamento de osso; pode ser convertido em Bone Meal para cultivo, corantes e outras receitas vanilla.",
    useConfidence: "Alta",
  },
  "feather": {
    use: "Ingrediente vanilla usado em Arrows, Book and Quill e Firework Stars; também é material comum de crafting em mods.",
    useConfidence: "Alta",
  },
  "cold aercloud": {
    use: "Bloco funcional do Aether. Pode ser processado no Freezer para virar Blue Aercloud e no Altar para virar Golden Aercloud; também é útil como bloco de nuvem em rotas aéreas.",
    useConfidence: "Alta",
  },
  "bamboo": {
    use: "Recurso vanilla de construção e crafting: Bamboo Planks, Scaffolding, Sticks e combustível, entre outros usos.",
    useConfidence: "Alta",
  },
  "creeper music disc": {
    use: "Disco de música tocável em jukebox; sem uso de crafting conhecido — colecionável/musical.",
    useConfidence: "Alta",
  },
  "raw porkchop": {
    use: "Comida crua; pode ser cozida para restaurar mais fome/saturação. Sem uso de crafting relevante além de processamento culinário.",
    useConfidence: "Alta",
  },
  "saddle": {
    use: "Equipamento de montaria para mobs compatíveis; no Minecraft 1.21.1 base não é um ingrediente de crafting comum.",
    useConfidence: "Alta",
  },
  "leather": {
    use: "Material vanilla de crafting para armadura de couro, livros, molduras e outros itens utilitários.",
    useConfidence: "Alta",
  },
  "raw beef": {
    use: "Comida crua; cozinhe para obter Steak. Sem uso de crafting relevante além de processamento culinário.",
    useConfidence: "Alta",
  },
  "raw mutton": {
    use: "Comida crua; cozinhe para obter Cooked Mutton. Sem uso de crafting relevante além de processamento culinário.",
    useConfidence: "Alta",
  },
  "wool": {
    use: "Bloco/material vanilla usado em camas, carpetes, banners e decoração; a cor determina várias receitas derivadas.",
    useConfidence: "Alta",
  },
  "string": {
    use: "Ingrediente vanilla usado em Bow, Fishing Rod, Lead, Scaffolding e Wool, além de várias receitas modded.",
    useConfidence: "Alta",
  },
  "swet ball": {
    use: "Ingrediente e reagente de conversão do Aether. A wiki oficial o classifica como ingrediente e documenta conversões próprias; confira o JEI para a receita/alvo exato da build 1.5.10.",
    useConfidence: "Média",
  },
  "blue aercloud": {
    use: "Bloco funcional de mobilidade: quica jogadores para cima e é útil em travessia/segurança no Aether. Sem uso de crafting conhecido nas fontes auditadas do 5B.",
    useConfidence: "Alta",
  },
  "glowstone": {
    use: "Bloco luminoso/decorativo. Ao quebrar, fornece Glowstone Dust, usada em poções e receitas de redstone/iluminação.",
    useConfidence: "Alta",
  },
  "aechor petal": {
    use: "Alimenta Moas filhotes — três alimentações completam o crescimento — e também é ingrediente conhecido do Poison Dart Shooter.",
    useConfidence: "Alta",
  },
  "chest": {
    use: "Armazenamento vanilla e ingrediente de vários itens com baú/armazenamento. Não é um drop exclusivo do Aether.",
    useConfidence: "Alta",
  },
  "mimic secondary loot pool": {
    use: "Pool de loot variado: pode fornecer munição, ferramenta, acessório e materiais como Golden Amber, Zanite, Icestone e Ambrosium. O uso depende do item sorteado; confira o JEI do item recebido quando houver crafting.",
    useConfidence: "Média",
  },
  "carved stone": {
    use: "Bloco estrutural/decorativo das Bronze Dungeons. Nenhum uso de crafting adicional foi confirmado nas fontes auditadas do 5B.",
    useConfidence: "Média",
  },
  "sentry stone": {
    use: "Bloco estrutural/decorativo das Bronze Dungeons. Nenhum uso de crafting adicional foi confirmado nas fontes auditadas do 5B.",
    useConfidence: "Média",
  },
  "bronze key": {
    use: "Abre o Bronze Treasure Chest correspondente e é consumida ao desbloqueá-lo; não é ingrediente de crafting.",
    useConfidence: "Alta",
  },
  "victory medal": {
    use: "Entregue 10 à Valkyrie Queen para iniciar a luta. Também pode ser fundida em Gold Nugget.",
    useConfidence: "Alta",
  },
  "silver key": {
    use: "Abre o Silver Treasure Chest correspondente e é consumida ao desbloqueá-lo; não é ingrediente de crafting.",
    useConfidence: "Alta",
  },
  "golden sword": {
    use: "Arma vanilla de ouro; não é ingrediente de crafting normal. Pode ser reciclada por fundição em Gold Nugget.",
    useConfidence: "Alta",
  },
  "gold key": {
    use: "Abre o Gold Treasure Chest correspondente e é consumida ao desbloqueá-lo; não é ingrediente de crafting.",
    useConfidence: "Alta",
  },
  "sun altar": {
    use: "Bloco funcional de recompensa do Sun Spirit usado para controlar o horário dentro do Aether; não é material de crafting conhecido.",
    useConfidence: "Média",
  },
};

const DROP_GUIDE_HREF: Record<string, string> = {
  "naga trophy": "/mods#twilight-crafting-tf-naga-trophy",
};

const EXTRA_DROPS: Record<string, BestiaryDrop[]> = {
  "aether-aerwhale": [
    {
      namePt: "Experiência",
      nameEn: "Experience",
      quantity: "2–4 XP",
      condition: "quando morta por jogador ou lobo domesticado",
    },
  ],
};

function enrichDrop(drop: BestiaryDrop): BestiaryDrop {
  const primaryKey = key(drop.nameEn ?? drop.namePt);
  const localizedKey = key(drop.namePt);
  const guideHref = drop.guideHref ?? DROP_GUIDE_HREF[primaryKey] ?? DROP_GUIDE_HREF[localizedKey];

  if (drop.use?.trim()) {
    return {
      ...drop,
      useConfidence: drop.useConfidence ?? "Baixa-conferir",
      ...(guideHref ? { guideHref } : {}),
    };
  }

  const meta = DROP_USE[primaryKey] ?? DROP_USE[localizedKey];
  if (meta) {
    return {
      ...drop,
      ...meta,
      guideHref: drop.guideHref ?? meta.guideHref ?? guideHref,
    };
  }

  return {
    ...drop,
    use: "Uso específico ainda não documentado neste Bestiário — conferir no JEI como último recurso antes de presumir receita ou função.",
    useConfidence: "Baixa-conferir",
    ...(guideHref ? { guideHref } : {}),
  };
}

export function enrichBestiaryEntries(entries: readonly BestiaryEntry[]): BestiaryEntry[] {
  return entries.map((entry) => {
    const existingNames = new Set(entry.drops.map((drop) => key(drop.nameEn ?? drop.namePt)));
    const extra = (EXTRA_DROPS[entry.id] ?? []).filter((drop) => !existingNames.has(key(drop.nameEn ?? drop.namePt)));
    return { ...entry, drops: [...entry.drops, ...extra].map(enrichDrop) };
  });
}
