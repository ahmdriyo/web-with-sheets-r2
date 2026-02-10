export type SiteSettings = {
  id: string;
  whatsapp_number: string;
  showroom_address: string;
  instagram: string;
  google_maps: string;
  email: string;
  opening_hours: string;
  created_at: Date;
};

export type CreateSiteSettingsDTO = SiteSettings;
export type UpdateSiteSettingsDTO = Partial<SiteSettings>;
export type SiteSettingsListDTO = Omit<
  SiteSettings,
  "created_at" | "updated_at"
>[];
