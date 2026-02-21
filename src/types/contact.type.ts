export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  recipientEmail: string;
}

export interface ContactEmailDTO {
  name: string;
  email: string;
  phone?: string;
  message: string;
  recipientEmail: string;
}

export interface ContactResponse {
  message: string;
  status: number;
}
