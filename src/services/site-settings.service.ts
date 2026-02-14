import { baseApiToken } from "@/src/const/base-api";
import { RestEndpoint } from "@/src/const/rest-endpoint";
import {
  SiteSettings,
  SiteSettingsResponse,
  CreateSiteSettingsDTO,
  UpdateSiteSettingsDTO,
} from "@/src/types/site-settings.type";

export const SiteSettingsService = {
  getSiteSettings: (
    page?: number,
    limit?: number,
  ): Promise<{ data: SiteSettingsResponse }> =>
    baseApiToken.get(RestEndpoint.GetAllSiteSettings, {
      params: { page, limit },
    }),

  getSiteSettingById: (
    id: string,
  ): Promise<{ data: { message: string; data: SiteSettings } }> =>
    baseApiToken.get(RestEndpoint.GetSiteSettingById.replace("{id}", id)),

  createSiteSetting: (
    data: CreateSiteSettingsDTO,
  ): Promise<{ data: { message: string; data: SiteSettings } }> =>
    baseApiToken.post(RestEndpoint.PostCreateSiteSetting, data),

  updateSiteSetting: (
    id: string,
    data: UpdateSiteSettingsDTO,
  ): Promise<{ data: { message: string; data: SiteSettings } }> =>
    baseApiToken.put(
      RestEndpoint.PutUpdateSiteSetting.replace("{id}", id),
      data,
    ),

  deleteSiteSetting: (id: string): Promise<{ data: { message: string } }> =>
    baseApiToken.delete(RestEndpoint.DeleteSiteSetting.replace("{id}", id)),
};
