import { baseApiToken } from "@/app/data/const/base-api";
import { RestEndpoint } from "@/app/data/const/rest-endpoint";
import { User, UserResponse } from "@/app/types/user.type";

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
