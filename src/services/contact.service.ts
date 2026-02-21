import { baseApi } from "@/src/const/base-api";
import { RestEndpoint } from "@/src/const/rest-endpoint";
import { ContactFormData } from "../types/contact.type";

export const ContactService = {
  sendContactMessage: (
    data: ContactFormData,
  ): Promise<{ data: { message: string; data: ContactFormData } }> =>
    baseApi.post(RestEndpoint.PostContact, data),
};
