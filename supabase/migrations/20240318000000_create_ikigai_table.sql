-- Create the ikigai_entries table
CREATE TABLE IF NOT EXISTS public.ikigai_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    "whatILove" TEXT[] DEFAULT '{}',
    "whatImGoodAt" TEXT[] DEFAULT '{}',
    "whatTheWorldNeeds" TEXT[] DEFAULT '{}',
    "whatICanBePaidFor" TEXT[] DEFAULT '{}',
    summary TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_ikigai_entries_email ON public.ikigai_entries(email);

-- Set up Row Level Security (RLS)
ALTER TABLE public.ikigai_entries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own ikigai entries"
    ON public.ikigai_entries FOR SELECT
    USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can insert their own ikigai entries"
    ON public.ikigai_entries FOR INSERT
    WITH CHECK (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can update their own ikigai entries"
    ON public.ikigai_entries FOR UPDATE
    USING (auth.jwt() ->> 'email' = email); 