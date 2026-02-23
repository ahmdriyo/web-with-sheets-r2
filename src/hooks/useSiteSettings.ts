import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateSiteSettingsDTO } from "@/src/types/site-settings.type";
import { SiteSettingsService } from "../services/site-settings.service";

export const SITE_SETTINGS_QUERY_KEYS = {
  all: ["site-settings"] as const,
  settings: () => [...SITE_SETTINGS_QUERY_KEYS.all, "settings"] as const,
};

export const useSiteSettings = () => {
  return useQuery({
    queryKey: SITE_SETTINGS_QUERY_KEYS.settings(),
    queryFn: () => SiteSettingsService.getSiteSettings(),
    select: (data) => data.data,
  });
};

export const useUpdateSiteSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSiteSettingsDTO) =>
      SiteSettingsService.updateSiteSetting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SITE_SETTINGS_QUERY_KEYS.all });
    },
  });
};
