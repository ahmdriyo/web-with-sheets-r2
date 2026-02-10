import { baseApi } from "@/app/data/const/base-api";
import { RestEndpoint } from "@/app/data/const/rest-endpoint";
import { LoginDTO, LoginResponse } from "@/app/types/user.type";

export const AuthService = {
  login: (data: LoginDTO): Promise<{ data: LoginResponse }> =>
    baseApi.post(RestEndpoint.PostLogin, data),
};
