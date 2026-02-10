import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CarsService } from "@/src/app/data/services/cars.service";

export const CARS_QUERY_KEYS = {
  all: ["cars"] as const,
  lists: () => [...CARS_QUERY_KEYS.all, "list"] as const,
  list: (page?: number, limit?: number) =>
    [...CARS_QUERY_KEYS.lists(), { page, limit }] as const,
  details: () => [...CARS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...CARS_QUERY_KEYS.details(), id] as const,
};

export const useCars = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: CARS_QUERY_KEYS.list(page, limit),
    queryFn: () => CarsService.getCars(page, limit),
    select: (data) => data.data,
  });
};

export const useCarDetail = (id: string) => {
  return useQuery({
    queryKey: CARS_QUERY_KEYS.detail(id),
    queryFn: () => CarsService.getCarById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useCreateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => CarsService.createCar(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CARS_QUERY_KEYS.all });
    },
  });
};

export const useUpdateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      CarsService.updateCar(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CARS_QUERY_KEYS.all });
    },
  });
};

export const useDeleteCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => CarsService.deleteCar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CARS_QUERY_KEYS.all });
    },
  });
};
