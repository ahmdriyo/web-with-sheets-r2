import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateAboutDTO } from "../types/about.type";
import { AboutService } from "../services/about.service";

export const ABOUT_QUERY_KEYS = {
  all: ["about"] as const,
  lists: () => [...ABOUT_QUERY_KEYS.all, "list"] as const,
  list: (page?: number, limit?: number) =>
    [...ABOUT_QUERY_KEYS.lists(), { page, limit }] as const,
  details: () => [...ABOUT_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...ABOUT_QUERY_KEYS.details(), id] as const,
};

export const useAbout = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: ABOUT_QUERY_KEYS.list(page, limit),
    queryFn: () => AboutService.getAbout(page, limit),
    select: (data) => data.data,
  });
};

export const useUpdateAbout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAboutDTO }) =>
      AboutService.updateAbout(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ABOUT_QUERY_KEYS.all });
    },
  });
};
