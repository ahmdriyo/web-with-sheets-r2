import { useQuery } from "@tanstack/react-query";
import { UserAdminService } from "@/src/app/data/services/user-admin.service";

export const USER_ADMIN_QUERY_KEYS = {
  all: ["user-admins"] as const,
  lists: () => [...USER_ADMIN_QUERY_KEYS.all, "list"] as const,
  details: () => [...USER_ADMIN_QUERY_KEYS.all, "detail"] as const,
  detail: (username: string) =>
    [...USER_ADMIN_QUERY_KEYS.details(), username] as const,
};

export const useUserAdmins = () => {
  return useQuery({
    queryKey: USER_ADMIN_QUERY_KEYS.lists(),
    queryFn: () => UserAdminService.getAllUserAdmins(),
    select: (data) => data.data,
  });
};

export const useUserAdminByUsername = (username: string) => {
  return useQuery({
    queryKey: USER_ADMIN_QUERY_KEYS.detail(username),
    queryFn: () => UserAdminService.getUserAdminByUsername(username),
    select: (data) => data.data,
    enabled: !!username,
  });
};
