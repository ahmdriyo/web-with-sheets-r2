import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/src/app/data/services/auth.service";
import { LoginDTO } from "@/src/types/user.type";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginDTO) => AuthService.login(data),
  });
};
