export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      app_settings: {
        Row: {
          description: string | null
          id: string
          name: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          description?: string | null
          id: string
          name: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_post_categories: {
        Row: {
          category_id: string
          post_id: string
        }
        Insert: {
          category_id: string
          post_id: string
        }
        Update: {
          category_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          content: string | null
          created_at: string
          created_by: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          is_published: boolean | null
          publish_date: string | null
          slug: string
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_published?: boolean | null
          publish_date?: string | null
          slug: string
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_published?: boolean | null
          publish_date?: string | null
          slug?: string
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      contact_email_settings: {
        Row: {
          bcc: string[] | null
          cc: string[] | null
          created_at: string
          destinataires: string[]
          id: string
          objet: string
          updated_at: string
        }
        Insert: {
          bcc?: string[] | null
          cc?: string[] | null
          created_at?: string
          destinataires?: string[]
          id?: string
          objet?: string
          updated_at?: string
        }
        Update: {
          bcc?: string[] | null
          cc?: string[] | null
          created_at?: string
          destinataires?: string[]
          id?: string
          objet?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_requests: {
        Row: {
          consentement: boolean
          converted_to_lead: boolean | null
          created_at: string
          description: string
          email: string
          entreprise: string | null
          id: string
          lead_id: string | null
          nom: string
          origine: string | null
          prenom: string
          service_requis: string | null
          site_web: string | null
          telephone: string | null
        }
        Insert: {
          consentement?: boolean
          converted_to_lead?: boolean | null
          created_at?: string
          description: string
          email: string
          entreprise?: string | null
          id?: string
          lead_id?: string | null
          nom: string
          origine?: string | null
          prenom: string
          service_requis?: string | null
          site_web?: string | null
          telephone?: string | null
        }
        Update: {
          consentement?: boolean
          converted_to_lead?: boolean | null
          created_at?: string
          description?: string
          email?: string
          entreprise?: string | null
          id?: string
          lead_id?: string | null
          nom?: string
          origine?: string | null
          prenom?: string
          service_requis?: string | null
          site_web?: string | null
          telephone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_requests_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      cvs: {
        Row: {
          content: Json
          created_at: string
          id: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      external_links: {
        Row: {
          allowed_roles: string[] | null
          created_at: string | null
          icon: string | null
          id: string
          name: string
          requires_auth: boolean | null
          updated_at: string | null
          url: string
        }
        Insert: {
          allowed_roles?: string[] | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name: string
          requires_auth?: boolean | null
          updated_at?: string | null
          url: string
        }
        Update: {
          allowed_roles?: string[] | null
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          requires_auth?: boolean | null
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          id: string
          order_index: number
          question: string
          template: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          id?: string
          order_index?: number
          question: string
          template?: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          order_index?: number
          question?: string
          template?: string
        }
        Relationships: []
      }
      header_action_buttons: {
        Row: {
          created_at: string
          href: string
          icon: string | null
          id: string
          is_visible: boolean | null
          label: string
          order_index: number
          required_role: string | null
          requires_auth: boolean | null
          updated_at: string
          variant: string
        }
        Insert: {
          created_at?: string
          href: string
          icon?: string | null
          id?: string
          is_visible?: boolean | null
          label: string
          order_index: number
          required_role?: string | null
          requires_auth?: boolean | null
          updated_at?: string
          variant: string
        }
        Update: {
          created_at?: string
          href?: string
          icon?: string | null
          id?: string
          is_visible?: boolean | null
          label?: string
          order_index?: number
          required_role?: string | null
          requires_auth?: boolean | null
          updated_at?: string
          variant?: string
        }
        Relationships: []
      }
      header_config: {
        Row: {
          created_at: string
          id: string
          show_theme_selector: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          show_theme_selector?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          show_theme_selector?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      header_logo: {
        Row: {
          alt: string
          created_at: string
          height: number
          id: string
          position: string
          src: string
          updated_at: string
          width: number
        }
        Insert: {
          alt: string
          created_at?: string
          height: number
          id?: string
          position: string
          src: string
          updated_at?: string
          width: number
        }
        Update: {
          alt?: string
          created_at?: string
          height?: number
          id?: string
          position?: string
          src?: string
          updated_at?: string
          width?: number
        }
        Relationships: []
      }
      header_nav_links: {
        Row: {
          created_at: string
          href: string
          icon: string | null
          id: string
          is_external: boolean | null
          is_visible: boolean | null
          name: string
          order_index: number
          parent_id: string | null
          required_role: string | null
          requires_auth: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          href: string
          icon?: string | null
          id?: string
          is_external?: boolean | null
          is_visible?: boolean | null
          name: string
          order_index: number
          parent_id?: string | null
          required_role?: string | null
          requires_auth?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          href?: string
          icon?: string | null
          id?: string
          is_external?: boolean | null
          is_visible?: boolean | null
          name?: string
          order_index?: number
          parent_id?: string | null
          required_role?: string | null
          requires_auth?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "header_nav_links_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "header_nav_links"
            referencedColumns: ["id"]
          },
        ]
      }
      header_search_bar: {
        Row: {
          created_at: string
          expand_on_focus: boolean | null
          id: string
          is_enabled: boolean | null
          placeholder: string
          position: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          expand_on_focus?: boolean | null
          id?: string
          is_enabled?: boolean | null
          placeholder: string
          position: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          expand_on_focus?: boolean | null
          id?: string
          is_enabled?: boolean | null
          placeholder?: string
          position?: string
          updated_at?: string
        }
        Relationships: []
      }
      header_social_links: {
        Row: {
          aria_label: string
          created_at: string
          display_order: number
          href: string
          icon_name: string
          id: string
          is_visible: boolean
          updated_at: string
        }
        Insert: {
          aria_label: string
          created_at?: string
          display_order?: number
          href: string
          icon_name: string
          id?: string
          is_visible?: boolean
          updated_at?: string
        }
        Update: {
          aria_label?: string
          created_at?: string
          display_order?: number
          href?: string
          icon_name?: string
          id?: string
          is_visible?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      header_style: {
        Row: {
          active_color: string
          background_color: string
          border_bottom: boolean | null
          border_color: string
          created_at: string
          drop_shadow: boolean | null
          font_family: string
          font_size: string
          font_weight: string | null
          glassmorphism: boolean | null
          hover_color: string
          id: string
          letter_spacing: string | null
          menu_active_bg_color: string | null
          menu_border_radius: string | null
          menu_hover_bg_color: string | null
          menu_transition: string | null
          padding: string
          scrolled_bg_color: string | null
          scrolled_border_color: string | null
          scrolled_shadow: string | null
          scrolled_text_color: string | null
          social_icon_bg_color: string | null
          social_icon_border_color: string | null
          social_icon_color: string | null
          social_icon_hover_color: string | null
          social_icon_size: string | null
          social_icon_spacing: string | null
          sticky: boolean | null
          text_color: string
          text_transform: string | null
          transition_duration: string | null
          transition_timing: string | null
          transparent: boolean | null
          updated_at: string
          utility_icon_bg_color: string | null
          utility_icon_border_color: string | null
          utility_icon_color: string | null
          utility_icon_hover_color: string | null
          utility_icon_size: string | null
        }
        Insert: {
          active_color: string
          background_color: string
          border_bottom?: boolean | null
          border_color: string
          created_at?: string
          drop_shadow?: boolean | null
          font_family: string
          font_size: string
          font_weight?: string | null
          glassmorphism?: boolean | null
          hover_color: string
          id?: string
          letter_spacing?: string | null
          menu_active_bg_color?: string | null
          menu_border_radius?: string | null
          menu_hover_bg_color?: string | null
          menu_transition?: string | null
          padding: string
          scrolled_bg_color?: string | null
          scrolled_border_color?: string | null
          scrolled_shadow?: string | null
          scrolled_text_color?: string | null
          social_icon_bg_color?: string | null
          social_icon_border_color?: string | null
          social_icon_color?: string | null
          social_icon_hover_color?: string | null
          social_icon_size?: string | null
          social_icon_spacing?: string | null
          sticky?: boolean | null
          text_color: string
          text_transform?: string | null
          transition_duration?: string | null
          transition_timing?: string | null
          transparent?: boolean | null
          updated_at?: string
          utility_icon_bg_color?: string | null
          utility_icon_border_color?: string | null
          utility_icon_color?: string | null
          utility_icon_hover_color?: string | null
          utility_icon_size?: string | null
        }
        Update: {
          active_color?: string
          background_color?: string
          border_bottom?: boolean | null
          border_color?: string
          created_at?: string
          drop_shadow?: boolean | null
          font_family?: string
          font_size?: string
          font_weight?: string | null
          glassmorphism?: boolean | null
          hover_color?: string
          id?: string
          letter_spacing?: string | null
          menu_active_bg_color?: string | null
          menu_border_radius?: string | null
          menu_hover_bg_color?: string | null
          menu_transition?: string | null
          padding?: string
          scrolled_bg_color?: string | null
          scrolled_border_color?: string | null
          scrolled_shadow?: string | null
          scrolled_text_color?: string | null
          social_icon_bg_color?: string | null
          social_icon_border_color?: string | null
          social_icon_color?: string | null
          social_icon_hover_color?: string | null
          social_icon_size?: string | null
          social_icon_spacing?: string | null
          sticky?: boolean | null
          text_color?: string
          text_transform?: string | null
          transition_duration?: string | null
          transition_timing?: string | null
          transparent?: boolean | null
          updated_at?: string
          utility_icon_bg_color?: string | null
          utility_icon_border_color?: string | null
          utility_icon_color?: string | null
          utility_icon_hover_color?: string | null
          utility_icon_size?: string | null
        }
        Relationships: []
      }
      header_user_menu: {
        Row: {
          created_at: string
          id: string
          login_button_label: string
          register_button_label: string
          show_login_button: boolean | null
          show_profile_icon: boolean | null
          show_register_button: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          login_button_label: string
          register_button_label: string
          show_login_button?: boolean | null
          show_profile_icon?: boolean | null
          show_register_button?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          login_button_label?: string
          register_button_label?: string
          show_login_button?: boolean | null
          show_profile_icon?: boolean | null
          show_register_button?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          created_at: string
          department: string
          description: string
          id: string
          location: string
          posted_date: string
          requirements: string[]
          responsibilities: string[]
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department: string
          description: string
          id?: string
          location: string
          posted_date: string
          requirements: string[]
          responsibilities: string[]
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string
          description?: string
          id?: string
          location?: string
          posted_date?: string
          requirements?: string[]
          responsibilities?: string[]
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      lead_interactions: {
        Row: {
          content: string
          created_at: string
          id: string
          lead_id: string | null
          type: string
          user_id: string | null
          user_name: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          lead_id?: string | null
          type: string
          user_id?: string | null
          user_name: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          lead_id?: string | null
          type?: string
          user_id?: string | null
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assignedto: string | null
          company: string | null
          created_at: string
          description: string
          email: string
          id: string
          name: string
          phone: string | null
          service: string | null
          source: string | null
          status: string
          tags: string[] | null
          updated_at: string
          website: string | null
        }
        Insert: {
          assignedto?: string | null
          company?: string | null
          created_at?: string
          description: string
          email: string
          id?: string
          name: string
          phone?: string | null
          service?: string | null
          source?: string | null
          status?: string
          tags?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          assignedto?: string | null
          company?: string | null
          created_at?: string
          description?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          service?: string | null
          source?: string | null
          status?: string
          tags?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      legal_contents: {
        Row: {
          content: string
          content_type: string
          created_at: string | null
          id: string
          is_published: boolean | null
          meta_description: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          content_type: string
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          content_type?: string
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      package_features: {
        Row: {
          created_at: string
          feature: string
          id: string
          is_included: boolean | null
          order_index: number
          package_id: string | null
        }
        Insert: {
          created_at?: string
          feature: string
          id?: string
          is_included?: boolean | null
          order_index?: number
          package_id?: string | null
        }
        Update: {
          created_at?: string
          feature?: string
          id?: string
          is_included?: boolean | null
          order_index?: number
          package_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "package_features_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "pricing_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          content: string | null
          created_at: string
          created_by: string | null
          id: string
          is_published: boolean | null
          meta_description: string | null
          publish_date: string | null
          slug: string
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          publish_date?: string | null
          slug: string
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          publish_date?: string | null
          slug?: string
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      pricing_packages: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_featured: boolean | null
          is_visible: boolean | null
          order_index: number
          starting_price: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_visible?: boolean | null
          order_index?: number
          starting_price?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_visible?: boolean | null
          order_index?: number
          starting_price?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          biography: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          biography?: string | null
          company?: string | null
          created_at?: string
          email: string
          id: string
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          biography?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      section_data: {
        Row: {
          created_at: string
          data: Json
          id: string
          section_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data: Json
          id?: string
          section_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          section_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "section_data_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "section_data"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          created_at: string
          custom_component: string | null
          id: string
          order: number
          title: string
          type: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          custom_component?: string | null
          id: string
          order: number
          title: string
          type: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          custom_component?: string | null
          id?: string
          order?: number
          title?: string
          type?: string
          visible?: boolean
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          order_index: number
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          icon: string
          id?: string
          order_index?: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          order_index?: number
          title?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string
          created_at: string
          email: string
          id: string
          image: string
          linkedin: string
          name: string
          role: string
          twitter: string
        }
        Insert: {
          bio: string
          created_at?: string
          email: string
          id?: string
          image: string
          linkedin: string
          name: string
          role: string
          twitter: string
        }
        Update: {
          bio?: string
          created_at?: string
          email?: string
          id?: string
          image?: string
          linkedin?: string
          name?: string
          role?: string
          twitter?: string
        }
        Relationships: []
      }
      template_config: {
        Row: {
          active_template: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          active_template: string
          created_at?: string
          id: string
          updated_at?: string
        }
        Update: {
          active_template?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          company: string | null
          content: string
          created_at: string
          id: string
          image: string | null
          name: string
          rating: number
          role: string
        }
        Insert: {
          company?: string | null
          content: string
          created_at?: string
          id?: string
          image?: string | null
          name: string
          rating?: number
          role: string
        }
        Update: {
          company?: string | null
          content?: string
          created_at?: string
          id?: string
          image?: string | null
          name?: string
          rating?: number
          role?: string
        }
        Relationships: []
      }
      trusted_clients: {
        Row: {
          category: string | null
          created_at: string
          id: string
          logo_url: string
          name: string
          website_url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          logo_url: string
          name: string
          website_url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          logo_url?: string
          name?: string
          website_url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      begin_transaction: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_auth_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      initialize_mock_users: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      rollback_transaction: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "admin"
        | "client_premium"
        | "user"
        | "business_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "super_admin",
        "admin",
        "client_premium",
        "user",
        "business_admin",
      ],
    },
  },
} as const
