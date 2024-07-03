import { useQuery, useMutation } from "@tanstack/vue-query";
import { getUserMailAddress, sendMail } from "@/features/the-unterstuetzungsfinder/features/the-mail/api/MailClient";
import { Email } from "@/features/the-unterstuetzungsfinder/features/the-mail/types/Email";

export const useGetMailAddress = () => {
    const { isLoading, isError, data, error } = useQuery(
        ['mail'],
        () => getUserMailAddress()
    );
    return { isLoading, isError, data, error };
};

export const useSendMail = () => {
    return useMutation((email: Email) => sendMail(email));
};
