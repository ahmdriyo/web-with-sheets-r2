import { baseApi, baseApiToken } from "@/src/const/base-api";
import { RestEndpoint } from "@/src/const/rest-endpoint";
import { Cars, CarsResponse } from "@/src/types/cars.type";

export interface CarsFilters {
  search?: string;
  category?: string;
  brand?: string;
  model?: string;
  fuelType?: string;
  year?: string;
  transmission?: string;
  status?: string;
}

export const CarsService = {
  getCars: (
    page?: number,
    limit?: number,
    filters?: CarsFilters,
  ): Promise<{ data: CarsResponse }> =>
    baseApi.get(RestEndpoint.GetAllCars, {
      params: { page, limit, ...filters },
    }),

  getCarById: (
    id: string,
  ): Promise<{ data: { message: string; data: Cars } }> =>
    baseApi.get(RestEndpoint.GetCarById.replace("{id}", id)),

  createCar: (
    formData: FormData,
  ): Promise<{
    data: {
      message: string;
      data: {
        id: string;
        slug: string;
        primary_image_url: string;
        image_urls: string[];
      };
    };
  }> =>
    baseApiToken.post(RestEndpoint.PostCreateCar, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateCar: (
    id: string,
    formData: FormData,
  ): Promise<{
    data: {
      message: string;
      data: {
        id: string;
        slug: string;
        primary_image_url: string;
        image_urls: string[];
      };
    };
  }> =>
    baseApiToken.put(RestEndpoint.PutUpdateCar.replace("{id}", id), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  deleteCar: (id: string): Promise<{ data: { message: string } }> =>
    baseApiToken.delete(RestEndpoint.DeleteCar.replace("{id}", id)),
};
