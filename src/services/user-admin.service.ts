import { baseApiToken } from "@/src/const/base-api";
import { RestEndpoint } from "@/src/const/rest-endpoint";
import { User, UserResponse } from "@/src/types/user.type";

export const UserAdminService = {
  getAllUserAdmins: (): Promise<{ data: UserResponse }> =>
    baseApiToken.get(RestEndpoint.GetAllUserAdmins),

  getUserAdminByUsername: (
    username: string,
  ): Promise<{ data: { message: string; data: User } }> =>
    baseApiToken.get(
      RestEndpoint.GetUserAdminByUsername.replace("{username}", username),
    ),
};
