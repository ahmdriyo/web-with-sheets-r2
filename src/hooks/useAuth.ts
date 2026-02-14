import { useMutation } from "@tanstack/react-query";
import { LoginDTO } from "@/src/types/user.type";
import { AuthService } from "../services/auth.service";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginDTO) => AuthService.login(data),
  });
};
