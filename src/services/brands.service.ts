import { baseApi, baseApiToken } from "@/src/const/base-api";
import { RestEndpoint } from "@/src/const/rest-endpoint";
import {
  Brand,
  BrandResponse,
  CreateBrandDTO,
  UpdateBrandDTO,
} from "@/src/types/brand.type";

export const BrandsService = {
  getBrands: (
    page?: number,
    limit?: number,
  ): Promise<{ data: BrandResponse }> =>
    baseApi.get(RestEndpoint.GetAllBrands, {
      params: { page, limit },
    }),

  getBrandById: (
    id: string,
  ): Promise<{ data: { message: string; data: Brand } }> =>
    baseApi.get(RestEndpoint.GetBrandById.replace("{id}", id)),

  createBrand: (
    data: CreateBrandDTO,
  ): Promise<{ data: { message: string; data: Brand } }> =>
    baseApiToken.post(RestEndpoint.PostCreateBrand, data),

  updateBrand: (
    id: string,
    data: UpdateBrandDTO,
  ): Promise<{ data: { message: string; data: Brand } }> =>
    baseApiToken.put(RestEndpoint.PutUpdateBrand.replace("{id}", id), data),

  deleteBrand: (id: string): Promise<{ data: { message: string } }> =>
    baseApiToken.delete(RestEndpoint.DeleteBrand.replace("{id}", id)),
};
