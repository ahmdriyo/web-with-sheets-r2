import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { UpdateAboutDTO } from "../types/about.type";
import { AboutService } from "../services/about.service";

export const ABOUT_QUERY_KEYS = {
  all: ["about"] as const,
  about: () => [...ABOUT_QUERY_KEYS.all, "about"] as const,
  details: () => [...ABOUT_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...ABOUT_QUERY_KEYS.details(), id] as const,
};

export const useAbout = () => {
  return useQuery({
    queryKey: ABOUT_QUERY_KEYS.about(),
    queryFn: () => AboutService.getAbout(),
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
