export type PublicRuntimeConfig = {
  supabaseUrl: string;
  supabasePublishableKey: string;
  worldId: string;
};

export async function loadPublicRuntimeConfig(): Promise<PublicRuntimeConfig> {
  const response = await fetch("/api/config", { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Falha ao carregar /api/config (${response.status})`);
  }

  const config = (await response.json()) as PublicRuntimeConfig;

  if (!config.supabaseUrl || !config.supabasePublishableKey) {
    throw new Error("Configuração pública do Supabase incompleta.");
  }

  return config;
}
