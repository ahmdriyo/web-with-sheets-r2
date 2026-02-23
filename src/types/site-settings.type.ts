export type SiteSettings = {
  id: string;
  whatsapp_number: string;
  showroom_address: string;
  instagram: string;
  google_maps: string;
  embed_maps: string;
  email: string;
  opening_hours: string;
  created_at: Date;
};

export type UpdateSiteSettingsDTO = {
  whatsapp_number?: string;
  showroom_address?: string;
  instagram?: string;
  google_maps?: string;
  embed_maps?: string;
  email?: string;
  opening_hours?: string;
};

export type SiteSettingsResponse = {
  message: string;
  data: SiteSettings;
};
