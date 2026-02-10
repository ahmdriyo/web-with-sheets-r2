import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SiteSettingsService } from "@/src/app/data/services/site-settings.service";
import {
  CreateSiteSettingsDTO,
  UpdateSiteSettingsDTO,
} from "@/src/types/site-settings.type";

export const SITE_SETTINGS_QUERY_KEYS = {
  all: ["site-settings"] as const,
  lists: () => [...SITE_SETTINGS_QUERY_KEYS.all, "list"] as const,
  list: (page?: number, limit?: number) =>
    [...SITE_SETTINGS_QUERY_KEYS.lists(), { page, limit }] as const,
  details: () => [...SITE_SETTINGS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...SITE_SETTINGS_QUERY_KEYS.details(), id] as const,
};

export const useSiteSettings = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: SITE_SETTINGS_QUERY_KEYS.list(page, limit),
    queryFn: () => SiteSettingsService.getSiteSettings(page, limit),
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
