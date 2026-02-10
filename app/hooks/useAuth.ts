import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/app/data/services/auth.service";
import { LoginDTO } from "@/app/types/user.type";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginDTO) => AuthService.login(data),
  });
};
