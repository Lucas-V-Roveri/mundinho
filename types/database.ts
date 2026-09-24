export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
