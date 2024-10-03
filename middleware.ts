import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Log biến môi trường để kiểm tra
  console.log('Supabase Service Role Key:', supabaseKey);

  // Kiểm tra nếu supabaseKey tồn tại
  if (!supabaseKey) {
    throw new Error('Supabase Service Role Key is missing');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Xử lý logic lấy session
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error fetching session:', error);
  } else {
    console.log('Session:', data);
  }

  return NextResponse.next();
}