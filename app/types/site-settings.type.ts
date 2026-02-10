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

export type CreateSiteSettingsDTO = {
  whatsapp_number: string;
  email: string;
  showroom_address?: string;
  instagram?: string;
  google_maps?: string;
  opening_hours?: string;
};

export type UpdateSiteSettingsDTO = {
  whatsapp_number?: string;
  showroom_address?: string;
  instagram?: string;
  google_maps?: string;
  email?: string;
  opening_hours?: string;
};

export type SiteSettingsResponse = {
  message: string;
  data: {
    id: string;
    whatsapp_number: string;
    showroom_address: string;
    instagram: string;
    google_maps: string;
    email: string;
    opening_hours: string;
    created_at: string;
  }[];
  pagenation: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};
