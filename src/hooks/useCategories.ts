import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoriesService } from "@/src/app/data/services/categories.service";
import {
  CreateCategoriesDTO,
  UpdateCategoriesDTO,
} from "@/src/types/categories.type";

export const CATEGORIES_QUERY_KEYS = {
  all: ["categories"] as const,
  lists: () => [...CATEGORIES_QUERY_KEYS.all, "list"] as const,
  list: (page?: number, limit?: number) =>
    [...CATEGORIES_QUERY_KEYS.lists(), { page, limit }] as const,
  details: () => [...CATEGORIES_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...CATEGORIES_QUERY_KEYS.details(), id] as const,
};

export const useCategories = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEYS.list(page, limit),
    queryFn: () => CategoriesService.getCategories(page, limit),
    select: (data) => data.data,
  });
};

export const useCategoryDetail = (id: string) => {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEYS.detail(id),
    queryFn: () => CategoriesService.getCategoryById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoriesDTO) =>
      CategoriesService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEYS.all });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoriesDTO }) =>
      CategoriesService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEYS.all });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => CategoriesService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEYS.all });
    },
  });
};
