CREATE TABLE IF NOT EXISTS public.favorites (
  user_id UUID NOT NULL
    REFERENCES auth.users(id) ON DELETE CASCADE,

  topic_id TEXT NOT NULL,

  created_at TIMESTAMPTZ NOT NULL
    DEFAULT now(),

  PRIMARY KEY (user_id, topic_id)
);

ALTER TABLE public.favorites
ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.favorites FROM anon;

GRANT SELECT, INSERT, DELETE
ON public.favorites TO authenticated;

CREATE POLICY "favorites_select_own"
ON public.favorites
FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "favorites_insert_own"
ON public.favorites
FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);


CREATE POLICY "favorites_delete_own"
ON public.favorites
FOR DELETE
TO authenticated
USING ((SELECT auth.uid()) = user_id);
