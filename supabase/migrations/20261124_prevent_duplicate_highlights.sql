WITH ranked_highlights AS (
  SELECT
    id,
    row_number() OVER (
      PARTITION BY user_id, block_id, start_offset, end_offset
      ORDER BY created_at, id
    ) AS position
  FROM public.highlights
)
DELETE FROM public.highlights AS highlights
USING ranked_highlights
WHERE highlights.id = ranked_highlights.id
  AND ranked_highlights.position > 1;

CREATE UNIQUE INDEX IF NOT EXISTS highlights_user_selection_unique_idx
ON public.highlights (user_id, block_id, start_offset, end_offset);
