import { baseApiToken } from "@/src/app/data/const/base-api";
import { RestEndpoint } from "@/src/app/data/const/rest-endpoint";
import {
  Categories,
  CategoriesResponse,
  CreateCategoriesDTO,
  UpdateCategoriesDTO,
} from "@/src/types/categories.type";

export const CategoriesService = {
  getCategories: (
    page?: number,
    limit?: number,
  ): Promise<{ data: CategoriesResponse }> =>
    baseApiToken.get(RestEndpoint.GetAllCategories, {
      params: { page, limit },
    }),

  getCategoryById: (
    id: string,
  ): Promise<{ data: { message: string; data: Categories } }> =>
    baseApiToken.get(RestEndpoint.GetCategoryById.replace("{id}", id)),

  createCategory: (
    data: CreateCategoriesDTO,
  ): Promise<{ data: { message: string; data: Categories } }> =>
    baseApiToken.post(RestEndpoint.PostCreateCategory, data),

  updateCategory: (
    id: string,
    data: UpdateCategoriesDTO,
  ): Promise<{ data: { message: string; data: Categories } }> =>
    baseApiToken.put(RestEndpoint.PutUpdateCategory.replace("{id}", id), data),

  deleteCategory: (id: string): Promise<{ data: { message: string } }> =>
    baseApiToken.delete(RestEndpoint.DeleteCategory.replace("{id}", id)),
};
