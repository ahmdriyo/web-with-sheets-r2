import { google } from "googleapis";
import key_service_account from "../../key_service_account.json";

const auth = new google.auth.GoogleAuth({
  credentials: key_service_account,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const sheetsData = google.sheets({
  version: "v4",
  auth,
});
