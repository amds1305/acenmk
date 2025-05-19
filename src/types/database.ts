
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      sections: {
        Row: {
          id: string;
          type: string;
          title: string;
          visible: boolean;
          order: number;
          custom_component?: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          type: string;
          title: string;
          visible?: boolean;
          order: number;
          custom_component?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          type?: string;
          title?: string;
          visible?: boolean;
          order?: number;
          custom_component?: string | null;
          created_at?: string;
        };
      };
      section_data: {
        Row: {
          id: string;
          section_id: string;
          data: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section_id: string;
          data: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_id?: string;
          data?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      trusted_clients: {
        Row: {
          id: string;
          name: string;
          logo_url: string;
          website_url?: string | null;
          category?: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url: string;
          website_url?: string | null;
          category?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string;
          website_url?: string | null;
          category?: string | null;
          created_at?: string;
        };
      };
      template_config: {
        Row: {
          id: string;
          active_template: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          active_template: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          active_template?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
