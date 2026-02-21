import { useMutation } from "@tanstack/react-query";
import { ContactFormData } from "@/src/types/contact.type";
import { ContactService } from "../services/contact.service";

export const useContact = () => {
  return useMutation({
    mutationFn: (data: ContactFormData) =>
      ContactService.sendContactMessage(data),
  });
};
