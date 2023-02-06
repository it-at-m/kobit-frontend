import FetchUtils from "@/core/services/api/FetchUtils";
import Mail from "@/features/the-unterstuetzungsfinder/features/the-mail/types/mail.type";


export interface CommunicationBody {
    from?: string;
    to?: string[];
    subject?: string;
    message?: string;
    attachments?: Blob;
    releasedFromConfidentiality?: boolean;

}

export default class MailService {
    private static base: string | undefined = `${process.env.VUE_APP_API_URL}/api/kobit-backend-service`;


    static postMail(value: Mail): Promise<Mail[]> {
        return fetch(`${this.base}/email`,FetchUtils.getPOSTConfig(value))
            .then(response => {
                FetchUtils.defaultResponseHandler(response);
                return response.json();
            }).catch(FetchUtils.defaultCatchHandler);

    }


}