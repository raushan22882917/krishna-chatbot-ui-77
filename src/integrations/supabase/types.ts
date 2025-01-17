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
      allergies: {
        Row: {
          allergen: string
          created_at: string | null
          id: string
          patient_id: string
          severity: string | null
        }
        Insert: {
          allergen: string
          created_at?: string | null
          id?: string
          patient_id: string
          severity?: string | null
        }
        Update: {
          allergen?: string
          created_at?: string | null
          id?: string
          patient_id?: string
          severity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "allergies_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      analysis_results: {
        Row: {
          classification: string
          confidence_score: number
          content_id: string
          created_at: string | null
          entities: Json | null
          id: string
        }
        Insert: {
          classification: string
          confidence_score: number
          content_id: string
          created_at?: string | null
          entities?: Json | null
          id?: string
        }
        Update: {
          classification?: string
          confidence_score?: number
          content_id?: string
          created_at?: string | null
          entities?: Json | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analysis_results_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          created_at: string | null
          doctor_id: string
          end_time: string
          id: string
          patient_id: string
          reason: string | null
          start_time: string
          status: string
          updated_at: string | null
          urgency: number | null
        }
        Insert: {
          created_at?: string | null
          doctor_id: string
          end_time: string
          id?: string
          patient_id: string
          reason?: string | null
          start_time: string
          status?: string
          updated_at?: string | null
          urgency?: number | null
        }
        Update: {
          created_at?: string | null
          doctor_id?: string
          end_time?: string
          id?: string
          patient_id?: string
          reason?: string | null
          start_time?: string
          status?: string
          updated_at?: string | null
          urgency?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_entries: {
        Row: {
          content: string
          created_at: string | null
          id: string
          source_type: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          source_type: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          source_type?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      doctor_availability: {
        Row: {
          day_of_week: number
          doctor_id: string
          end_time: string
          id: string
          start_time: string
        }
        Insert: {
          day_of_week: number
          doctor_id: string
          end_time: string
          id?: string
          start_time: string
        }
        Update: {
          day_of_week?: number
          doctor_id?: string
          end_time?: string
          id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctor_availability_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_history: {
        Row: {
          condition: string
          created_at: string | null
          diagnosis_date: string | null
          id: string
          medications: string[] | null
          notes: string | null
          patient_id: string
          updated_at: string | null
        }
        Insert: {
          condition: string
          created_at?: string | null
          diagnosis_date?: string | null
          id?: string
          medications?: string[] | null
          notes?: string | null
          patient_id: string
          updated_at?: string | null
        }
        Update: {
          condition?: string
          created_at?: string | null
          diagnosis_date?: string | null
          id?: string
          medications?: string[] | null
          notes?: string | null
          patient_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_history_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      news_articles: {
        Row: {
          content: string
          created_at: string | null
          id: string
          published_at: string | null
          source: string
          title: string
          url: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          published_at?: string | null
          source: string
          title: string
          url: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          published_at?: string | null
          source?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          availability: Json | null
          biography: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          full_name: string | null
          gender: Database["public"]["Enums"]["user_gender"] | null
          hospital_name: string | null
          id: string
          insurance_policy_number: string | null
          insurance_provider: string | null
          is_doctor: boolean | null
          license_verification_url: string | null
          medical_history: string | null
          medical_license_number: string | null
          phone_number: string | null
          preferred_specialty: string | null
          profile_image_url: string | null
          qualifications: string[] | null
          role: string
          specialty_id: string | null
          updated_at: string | null
          years_experience: number | null
        }
        Insert: {
          address?: string | null
          availability?: Json | null
          biography?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          full_name?: string | null
          gender?: Database["public"]["Enums"]["user_gender"] | null
          hospital_name?: string | null
          id: string
          insurance_policy_number?: string | null
          insurance_provider?: string | null
          is_doctor?: boolean | null
          license_verification_url?: string | null
          medical_history?: string | null
          medical_license_number?: string | null
          phone_number?: string | null
          preferred_specialty?: string | null
          profile_image_url?: string | null
          qualifications?: string[] | null
          role: string
          specialty_id?: string | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Update: {
          address?: string | null
          availability?: Json | null
          biography?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          full_name?: string | null
          gender?: Database["public"]["Enums"]["user_gender"] | null
          hospital_name?: string | null
          id?: string
          insurance_policy_number?: string | null
          insurance_provider?: string | null
          is_doctor?: boolean | null
          license_verification_url?: string | null
          medical_history?: string | null
          medical_license_number?: string | null
          phone_number?: string | null
          preferred_specialty?: string | null
          profile_image_url?: string | null
          qualifications?: string[] | null
          role?: string
          specialty_id?: string | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_preferred_specialty_fkey"
            columns: ["preferred_specialty"]
            isOneToOne: false
            referencedRelation: "specialties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_specialty_id_fkey"
            columns: ["specialty_id"]
            isOneToOne: false
            referencedRelation: "specialties"
            referencedColumns: ["id"]
          },
        ]
      }
      specialties: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_gender: "male" | "female" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
