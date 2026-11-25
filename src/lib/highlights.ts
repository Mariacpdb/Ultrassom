export type SavedHighlight = {
  id: string;
  topic_id: string;
  section_id: string;
  block_id: string;
  block_text: string;
  selected_text: string;
  start_offset: number;
  end_offset: number;
  created_at: string;
};

export type TextScale = "normal" | "large" | "larger";
