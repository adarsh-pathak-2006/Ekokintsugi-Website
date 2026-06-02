import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase credentials not found in env!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Connecting to Supabase at:", supabaseUrl);
  
  const { data: products, error: pError } = await supabase.from('products').select('*');
  if (pError) {
    console.error("Error reading products:", pError);
  } else {
    console.log(`Found ${products?.length} products in DB:`);
    products?.forEach(p => {
      console.log(` - ID: ${p.id} | Name: ${p.name} | Category: ${p.category} | Image: ${p.image_url}`);
    });
  }
}

run();
