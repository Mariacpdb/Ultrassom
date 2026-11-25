CREATE TABLE IF NOT EXISTS public.highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL
    REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  section_id TEXT NOT NULL,
  block_id TEXT NOT NULL,
  block_text TEXT NOT NULL,
  selected_text TEXT NOT NULL
    CHECK (char_length(btrim(selected_text)) > 0),
  start_offset INTEGER NOT NULL
    CHECK (start_offset >= 0),
  end_offset INTEGER NOT NULL
    CHECK (end_offset > start_offset),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS highlights_user_created_at_idx
ON public.highlights (user_id, created_at DESC);

ALTER TABLE public.highlights
ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.highlights FROM anon;

GRANT SELECT, INSERT, DELETE
ON public.highlights TO authenticated;

DROP POLICY IF EXISTS "highlights_select_own" ON public.highlights;
DROP POLICY IF EXISTS "highlights_insert_own" ON public.highlights;
DROP POLICY IF EXISTS "highlights_delete_own" ON public.highlights;

CREATE POLICY "highlights_select_own"
ON public.highlights
FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "highlights_insert_own"
ON public.highlights
FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "highlights_delete_own"
ON public.highlights
FOR DELETE
TO authenticated
USING ((SELECT auth.uid()) = user_id);
