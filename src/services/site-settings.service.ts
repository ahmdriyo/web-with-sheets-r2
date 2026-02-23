import { baseApiToken } from "@/src/const/base-api";
import { RestEndpoint } from "@/src/const/rest-endpoint";
import {
  SiteSettings,
  SiteSettingsResponse,
  UpdateSiteSettingsDTO,
} from "@/src/types/site-settings.type";

export const SiteSettingsService = {
  getSiteSettings: (): Promise<{ data: SiteSettingsResponse }> =>
    baseApiToken.get(RestEndpoint.GetAllSiteSettings),

  updateSiteSetting: (
    data: UpdateSiteSettingsDTO,
  ): Promise<{ data: { message: string; data: SiteSettings } }> =>
    baseApiToken.put(RestEndpoint.PutUpdateSiteSetting, data),
};
