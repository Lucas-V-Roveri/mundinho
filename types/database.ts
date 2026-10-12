export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      mundinho_minecraft_evidence: {
        Row: { world_id: string; actor: "gr1d" | "benamu"; advancement_id: string; milestone_id: string; done: boolean; criteria: Record<string, string>; criteria_total: number | null; rule_version: string; imported_at: string };
        Insert: { world_id: string; actor: "gr1d" | "benamu"; advancement_id: string; milestone_id: string; done?: boolean; criteria?: Record<string, string>; criteria_total?: number | null; rule_version: string; imported_at?: string };
        Update: Partial<Database["public"]["Tables"]["mundinho_minecraft_evidence"]["Insert"]>;
        Relationships: [];
      };
      mundinho_item_state: {
        Row: { world_id: string; item_id: string; section: string; entry_key: string; completed: boolean; completed_by: string | null; completed_at: string | null; updated_at: string; deleted: boolean; deleted_by: string | null; deleted_at: string | null };
        Insert: { world_id: string; item_id: string; section: string; entry_key: string; completed?: boolean; completed_by?: string | null; completed_at?: string | null; updated_at?: string; deleted?: boolean; deleted_by?: string | null; deleted_at?: string | null };
        Update: Partial<Database["public"]["Tables"]["mundinho_item_state"]["Insert"]>;
        Relationships: [];
      };
      mundinho_custom_items: {
        Row: { id: string; world_id: string; section: string; entry_key: string; title: string; description: string; difficulty: string | null; phase: string | null; created_by: string; created_at: string; deleted: boolean; deleted_by: string | null; deleted_at: string | null; updated_at: string };
        Insert: { id?: string; world_id: string; section: string; entry_key: string; title: string; description?: string; difficulty?: string | null; phase?: string | null; created_by: string; created_at?: string; deleted?: boolean; deleted_by?: string | null; deleted_at?: string | null; updated_at?: string };
        Update: Partial<Database["public"]["Tables"]["mundinho_custom_items"]["Insert"]>;
        Relationships: [];
      };
      mundinho_content: {
        Row: { key: string; lot: number; payload: Json; updated_at: string };
        Insert: { key: string; lot: number; payload: Json; updated_at?: string };
        Update: Partial<Database["public"]["Tables"]["mundinho_content"]["Insert"]>;
        Relationships: [];
      };
      mundinho_bestiary_state: {
        Row: { world_id: string; mob_id: string; actor: string; seen: boolean; seen_at: string | null; defeated: boolean; defeated_at: string | null; tamed: boolean; tamed_at: string | null; updated_by: string; updated_at: string; deleted: boolean; deleted_by: string | null; deleted_at: string | null };
        Insert: { world_id: string; mob_id: string; actor: string; seen?: boolean; seen_at?: string | null; defeated?: boolean; defeated_at?: string | null; tamed?: boolean; tamed_at?: string | null; updated_by: string; updated_at?: string; deleted?: boolean; deleted_by?: string | null; deleted_at?: string | null };
        Update: Partial<Database["public"]["Tables"]["mundinho_bestiary_state"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      mundinho_sync_minecraft_canary: {
        Args: { p_world_id: string; p_actor: string; p_observations: Json };
        Returns: Json;
      };
      mundinho_sync_minecraft_category_a: {
        Args: { p_world_id: string; p_actor: string; p_observations: Json };
        Returns: Json;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
