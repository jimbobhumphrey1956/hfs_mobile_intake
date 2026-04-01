// ============================================================
// HFS / CVMG CRM — TypeScript Types
// ============================================================

export type ClientStatus = 'prospect' | 'contacted' | 'quoted' | 'signed' | 'lost'
export type Priority = 'low' | 'normal' | 'high'
export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'declined'
export type ActivityType =
  | 'call' | 'note' | 'email' | 'meeting'
  | 'quote_sent' | 'contract_signed' | 'intake'
  | 'mail_merge' | 'follow_up_scheduled'

export type ContactType =
  | 'pre_need_traditional' | 'pre_need_cremation' | 'cemetery_plot'
  | 'cremation_niche' | 'combination' | 'graveside' | 'veteran'
  | 'global_address' | 'referral_source' | 'attorney' | 'vendor' | 'community'

export type ClientSource =
  | 'referral' | 'veteran_outreach' | 'retired_teacher'
  | 'senior_outreach' | 'walk_in' | 'website' | 'phone_inquiry'

export interface Staff {
  id: string
  name: string
  initials: string
  email?: string
  role?: string
  active: boolean
  created_at: string
}

export interface Referral {
  id: string
  name: string
  relationship?: string
  referral_count: number
  notes?: string
  created_at: string
}

export interface Client {
  id: string
  first_name: string
  last_name: string
  honorific?: string
  company?: string
  title?: string
  email?: string
  mobile_phone?: string
  home_phone?: string
  preferred_contact: string
  street?: string
  city?: string
  state: string
  zip?: string
  status: ClientStatus
  contact_type: ContactType[]
  source?: ClientSource
  assigned_staff_id?: string
  referral_source_id?: string
  follow_up_date?: string
  priority: Priority
  total_quoted: number
  notes?: string
  photo_url?: string
  created_at: string
  updated_at: string
  // Joined fields
  staff?: Staff
  referral?: Referral
  spouse?: Spouse
}

export interface ClientWithRelations extends Client {
  staff?: Staff
  referral?: Referral
  spouse?: Spouse
  quotes?: Quote[]
  activities?: Activity[]
}

export interface Spouse {
  id: string
  client_id: string
  first_name?: string
  last_name?: string
  honorific?: string
  mobile_phone?: string
  home_phone?: string
  email?: string
  created_at: string
}

export interface Quote {
  id: string
  client_id: string
  status: QuoteStatus
  subtotal: number
  discount: number
  total_amount: number
  notes?: string
  created_by?: string
  created_at: string
  updated_at: string
  // Joined
  line_items?: QuoteLineItem[]
  client?: Client
}

export interface QuoteLineItem {
  id: string
  quote_id: string
  description: string
  category?: string
  quantity: number
  unit_price: number
  total: number
}

export interface Activity {
  id: string
  client_id: string
  type: ActivityType
  note?: string
  staff_id?: string
  created_at: string
  // Joined
  staff?: Staff
  client?: Client
}

export interface Document {
  id: string
  client_id: string
  type?: string
  name: string
  status: 'pending' | 'received' | 'verified'
  file_url?: string
  uploaded_at: string
}

export interface Task {
  id: string
  client_id?: string
  title: string
  due_date?: string
  completed: boolean
  priority: Priority
  assigned_staff_id?: string
  created_at: string
  // Joined
  client?: Client
  staff?: Staff
}

export interface LetterTemplate {
  id: string
  name: string
  type?: string
  content?: string
  file_url?: string
  created_at: string
}

export interface PriceList {
  id: string
  name: string
  type?: string
  file_url?: string
  uploaded_at: string
}

// ── Dashboard summary types ──────────────────────────────
export interface DashboardStats {
  overdue: number
  due_today: number
  active_clients: number
  open_quotes: number
  pipeline_value: number
}

export interface PipelineByType {
  label: string
  value: number
  count: number
  percent: number
  color: 'navy' | 'gold' | 'green' | 'red'
}
