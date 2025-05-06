import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate request method
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    // Validate content type
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      throw new Error('Invalid content type. Expected multipart/form-data');
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      throw new Error('No file provided');
    }

    // Validate file type
    const allowedTypes = ['.xlsx', '.xls', '.csv'];
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowedTypes.includes(fileExt)) {
      throw new Error('Invalid file type. Only Excel and CSV files are allowed');
    }

    // Process the file data
    const fileData = await file.arrayBuffer();
    
    // Create a client with the service role key for admin operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Store processed data
    const { data, error: dbError } = await supabase
      .from('esg_data')
      .insert([
        {
          filename: file.name,
          processed_at: new Date().toISOString(),
          status: 'processed',
          size: fileData.byteLength
        }
      ])
      .select();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error(dbError.message || 'Failed to store file data');
    }

    return new Response(
      JSON.stringify({
        message: 'File processed successfully',
        data
      }),
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error('Processing error:', error);
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }),
      {
        status: 400,
        headers: corsHeaders
      }
    );
  }
});