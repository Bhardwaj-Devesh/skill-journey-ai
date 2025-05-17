import { NextResponse } from 'next/server';
import { supabase } from '@/integrations/supabase/client';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.pathname.split('/').pop();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('ikigai_entries')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;

    return NextResponse.json(data || {
      whatILove: [],
      whatImGoodAt: [],
      whatTheWorldNeeds: [],
      whatICanBePaidFor: [],
      summary: ''
    });
  } catch (error) {
    console.error('Error fetching Ikigai data:', error);
    return NextResponse.json({ error: 'Failed to fetch Ikigai data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, ...ikigaiData } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const { data: existingData, error: fetchError } = await supabase
      .from('ikigai_entries')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "not found" error
      throw fetchError;
    }

    let result;
    if (!existingData) {
      // Create new entry
      const { data, error } = await supabase
        .from('ikigai_entries')
        .insert([{
          email,
          ...ikigaiData
        }])
        .select()
        .single();
      
      if (error) throw error;
      result = data;
    } else {
      // Update existing entry
      const { data, error } = await supabase
        .from('ikigai_entries')
        .update({
          ...ikigaiData,
          updated_at: new Date().toISOString()
        })
        .eq('email', email)
        .select()
        .single();
      
      if (error) throw error;
      result = data;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating Ikigai data:', error);
    return NextResponse.json({ error: 'Failed to update Ikigai data' }, { status: 500 });
  }
} 