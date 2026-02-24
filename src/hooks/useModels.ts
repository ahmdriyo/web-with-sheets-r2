import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateModelDTO, UpdateModelDTO } from "@/src/types/model.type";
import { ModelsService } from "../services/models.service";

export const MODELS_QUERY_KEYS = {
  all: ["models"] as const,
  lists: () => [...MODELS_QUERY_KEYS.all, "list"] as const,
  list: (page?: number, limit?: number) =>
    [...MODELS_QUERY_KEYS.lists(), { page, limit }] as const,
  details: () => [...MODELS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...MODELS_QUERY_KEYS.details(), id] as const,
};

export const useModels = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: MODELS_QUERY_KEYS.list(page, limit),
    queryFn: () => ModelsService.getModels(page, limit),
    select: (data) => data.data,
  });
};

export const useModelDetail = (id: string) => {
  return useQuery({
    queryKey: MODELS_QUERY_KEYS.detail(id),
    queryFn: () => ModelsService.getModelById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useCreateModel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateModelDTO) => ModelsService.createModel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MODELS_QUERY_KEYS.all });
    },
  });
};

export const useUpdateModel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateModelDTO }) =>
      ModelsService.updateModel(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MODELS_QUERY_KEYS.all });
    },
  });
};

export const useDeleteModel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ModelsService.deleteModel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MODELS_QUERY_KEYS.all });
    },
  });
};
