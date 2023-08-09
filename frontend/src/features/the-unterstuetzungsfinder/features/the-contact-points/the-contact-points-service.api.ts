import FetchUtils from "@/core/services/api/FetchUtils";
import Anlaufstelle from "@/features/the-unterstuetzungsfinder/features/the-contact-points/types/anlaufstelle.type";


export default class AnlaufstelleService {
    private static base: string | undefined = `${process.env.VUE_APP_API_URL}/api/kobit-backend-service`;

    static getAnlaufstellen(): Promise<Anlaufstelle[]> {
        return fetch(`${this.base}/anlaufstellen-management/anlaufstellen`,FetchUtils.getGETConfig())
            .catch(FetchUtils.defaultCatchHandler)
            .then(response => {
                FetchUtils.defaultResponseHandler(response);
                return response.json();
            });
    }



}



