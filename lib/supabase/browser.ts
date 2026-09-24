import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { PublicRuntimeConfig } from "@/lib/runtime-config";
import type { Database } from "@/types/database";

let browserClient: SupabaseClient<Database> | null = null;

export function getBrowserSupabase(config: PublicRuntimeConfig) {
  if (!browserClient) browserClient = createBrowserClient<Database>(config.supabaseUrl, config.supabasePublishableKey);
  return browserClient;
}
