import { NextRequest } from "next/server";
import { handleContactSubmission } from "@/src/server/service/contact/send-contact.service";
import { ContactFormData } from "@/src/types/contact.type";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const formData: ContactFormData = body;

  return handleContactSubmission(formData);
}
