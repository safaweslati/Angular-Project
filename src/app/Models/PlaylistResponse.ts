export interface PlaylistResponse {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  followers: { href: string | null, total: number };
  href: string;
  id: string;
  images: any[]; // You might want to create a separate class for 'images' if needed
  name: string;
  owner: {
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: any[]; // You might want to create a separate class for 'items' if needed
  };
  type: string;
  uri: string;
  primary_color: string | null;
}
