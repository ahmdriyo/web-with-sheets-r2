import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateSiteSettingsDTO,
  UpdateSiteSettingsDTO,
} from "@/src/types/site-settings.type";
import { SiteSettingsService } from "../services/site-settings.service";

export const SITE_SETTINGS_QUERY_KEYS = {
  all: ["site-settings"] as const,
  settings: () => [...SITE_SETTINGS_QUERY_KEYS.all, "settings"] as const,
  details: () => [...SITE_SETTINGS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...SITE_SETTINGS_QUERY_KEYS.details(), id] as const,
};

export const useSiteSettings = () => {
  return useQuery({
    queryKey: SITE_SETTINGS_QUERY_KEYS.settings(),
    queryFn: () => SiteSettingsService.getSiteSettings(),
    select: (data) => data.data,
  });
};

export const useSiteSettingDetail = (id: string) => {
  return useQuery({
    queryKey: SITE_SETTINGS_QUERY_KEYS.detail(id),
    queryFn: () => SiteSettingsService.getSiteSettingById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useCreateSiteSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSiteSettingsDTO) =>
      SiteSettingsService.createSiteSetting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SITE_SETTINGS_QUERY_KEYS.all });
    },
  });
};

export const useUpdateSiteSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSiteSettingsDTO }) =>
      SiteSettingsService.updateSiteSetting(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SITE_SETTINGS_QUERY_KEYS.all });
    },
  });
};

export const useDeleteSiteSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => SiteSettingsService.deleteSiteSetting(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SITE_SETTINGS_QUERY_KEYS.all });
    },
  });
};
