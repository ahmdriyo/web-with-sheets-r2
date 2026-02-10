import { baseApi } from "@/src/app/data/const/base-api";
import { RestEndpoint } from "@/src/app/data/const/rest-endpoint";
import { LoginDTO, LoginResponse } from "@/src/types/user.type";

export const AuthService = {
  login: (data: LoginDTO): Promise<{ data: LoginResponse }> =>
    baseApi.post(RestEndpoint.PostLogin, data),
};
