import { httpGetJson, httpPostJson } from "@/core/plugins/http";
import {
  Email,
  SenderMailAddress,
} from "@/features/the-unterstuetzungsfinder/features/the-mail/types/Email";

export const getUserMailAddress = () => {
  return httpGetJson<SenderMailAddress>("/email");
};

export const sendMail = (email: Email) => {
  return httpPostJson<Email>("/email", email);
};
