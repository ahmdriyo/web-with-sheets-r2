import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateBrandDTO, UpdateBrandDTO } from "@/src/types/brand.type";
import { BrandsService } from "../services/brands.service";

export const BRANDS_QUERY_KEYS = {
  all: ["brands"] as const,
  lists: () => [...BRANDS_QUERY_KEYS.all, "list"] as const,
  list: (page?: number, limit?: number) =>
    [...BRANDS_QUERY_KEYS.lists(), { page, limit }] as const,
  details: () => [...BRANDS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...BRANDS_QUERY_KEYS.details(), id] as const,
};

export const useBrands = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: BRANDS_QUERY_KEYS.list(page, limit),
    queryFn: () => BrandsService.getBrands(page, limit),
    select: (data) => data.data,
  });
};

export const useBrandDetail = (id: string) => {
  return useQuery({
    queryKey: BRANDS_QUERY_KEYS.detail(id),
    queryFn: () => BrandsService.getBrandById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBrandDTO) => BrandsService.createBrand(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BRANDS_QUERY_KEYS.all });
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBrandDTO }) =>
      BrandsService.updateBrand(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BRANDS_QUERY_KEYS.all });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => BrandsService.deleteBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BRANDS_QUERY_KEYS.all });
    },
  });
};
