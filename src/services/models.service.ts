import { baseApi, baseApiToken } from "@/src/const/base-api";
import { RestEndpoint } from "@/src/const/rest-endpoint";
import {
  Model,
  ModelResponse,
  CreateModelDTO,
  UpdateModelDTO,
} from "@/src/types/model.type";

export const ModelsService = {
  getModels: (
    page?: number,
    limit?: number,
  ): Promise<{ data: ModelResponse }> =>
    baseApi.get(RestEndpoint.GetAllModels, {
      params: { page, limit },
    }),

  getModelById: (
    id: string,
  ): Promise<{ data: { message: string; data: Model } }> =>
    baseApi.get(RestEndpoint.GetModelById.replace("{id}", id)),

  createModel: (
    data: CreateModelDTO,
  ): Promise<{ data: { message: string; data: Model } }> =>
    baseApiToken.post(RestEndpoint.PostCreateModel, data),

  updateModel: (
    id: string,
    data: UpdateModelDTO,
  ): Promise<{ data: { message: string; data: Model } }> =>
    baseApiToken.put(RestEndpoint.PutUpdateModel.replace("{id}", id), data),

  deleteModel: (id: string): Promise<{ data: { message: string } }> =>
    baseApiToken.delete(RestEndpoint.DeleteModel.replace("{id}", id)),
};
