import { createClient } from '@supabase/supabase-js';

// @ts-ignore
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
// @ts-ignore
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  name: string;
  desc?: string;
  image?: string;
  image_url?: string;
  points?: string[];
  co2_factor?: number;
  waste_factor?: number;
  impact?: {
    co2: string;
    trees: string;
  };
  full_details?: string;
  base_price?: number;
  price?: string;
}
