export interface Episode {
  audio_preview_url: string;
  description: string;
  duration_ms: number;
  id: string;
  imageUrl: any;
  is_playable: boolean;
  name: string;
  release_date: string;
  resume_point: { fully_played: boolean; resume_position_ms: number };
}
