export type PublicRuntimeConfig = {
  supabaseUrl: string;
  supabasePublishableKey: string;
  worldId: string;
};

export type RuntimeConfigState =
  | { kind: "configured"; config: PublicRuntimeConfig }
  | { kind: "absent"; config: PublicRuntimeConfig }
  | { kind: "invalid"; config: PublicRuntimeConfig; reason: string };

export async function loadPublicRuntimeConfig(): Promise<PublicRuntimeConfig> {
  const response = await fetch("/api/config", { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Falha ao carregar /api/config (${response.status})`);
  }

  return (await response.json()) as PublicRuntimeConfig;
}

export function classifyRuntimeConfig(config: PublicRuntimeConfig): RuntimeConfigState {
  const hasUrl = Boolean(config.supabaseUrl?.trim());
  const hasKey = Boolean(config.supabasePublishableKey?.trim());

  if (!hasUrl && !hasKey) return { kind: "absent", config };

  if (!hasUrl || !hasKey) {
    return { kind: "invalid", config, reason: "Configuração do Supabase incompleta em /api/config." };
  }

  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(config.supabaseUrl)) {
    return { kind: "invalid", config, reason: "SUPABASE_URL inválida em /api/config." };
  }

  const key = config.supabasePublishableKey;
  const publishable = /^sb_publishable_/.test(key) || key.split(".").length === 3;
  if (!publishable) {
    return { kind: "invalid", config, reason: "SUPABASE_PUBLISHABLE_KEY inválida em /api/config." };
  }

  return { kind: "configured", config };
}
