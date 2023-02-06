import FetchUtils from "@/core/services/api/FetchUtils";

import MailUser from "@/features/the-unterstuetzungsfinder/features/the-mail/types/mail-user.type";

export default class MailUserService {
    private static base: string | undefined = `${process.env.VUE_APP_API_URL}/api/kobit-backend-service`;

    static getMailUser(): Promise<MailUser[]> {
        return fetch(`${this.base}/email`,FetchUtils.getGETConfig())
            .catch(FetchUtils.defaultCatchHandler)
            .then(response => {
                FetchUtils.defaultResponseHandler(response);
                return response.json();
            });
    }

}



