import { baseApi } from "@/src/const/base-api";
import { RestEndpoint } from "@/src/const/rest-endpoint";
import { LoginDTO, LoginResponse } from "@/src/types/user.type";

export const AuthService = {
  login: (data: LoginDTO): Promise<{ data: LoginResponse }> =>
    baseApi.post(RestEndpoint.PostLogin, data),
};
