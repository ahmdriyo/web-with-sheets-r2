import { baseApi, baseApiToken } from "@/src/const/base-api";
import { RestEndpoint } from "@/src/const/rest-endpoint";
import { About, AboutResponse, UpdateAboutDTO } from "../types/about.type";

export const AboutService = {
  getAbout: (): Promise<{ data: AboutResponse }> =>
    baseApi.get(RestEndpoint.GetAllAbout),

  updateAbout: (
    id: string,
    data: UpdateAboutDTO,
  ): Promise<{ data: { message: string; data: About } }> =>
    baseApiToken.put(RestEndpoint.PutUpdateAbout.replace("{id}", id), data),
};
