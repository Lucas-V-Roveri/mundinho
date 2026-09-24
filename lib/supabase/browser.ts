import { createBrowserClient } from "@supabase/ssr";

import type { PublicRuntimeConfig } from "@/lib/runtime-config";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getBrowserSupabase(config: PublicRuntimeConfig) {
  if (!browserClient) {
    browserClient = createBrowserClient(config.supabaseUrl, config.supabasePublishableKey);
  }

  return browserClient;
}
