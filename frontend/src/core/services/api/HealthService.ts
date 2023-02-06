import HealthState from "@/core/services/api/types/HealthState";
import FetchUtils from "@/core/services/api/FetchUtils";

export default class HealthService {

    private static base: string | undefined = `${process.env.VUE_APP_API_URL}/api/kobit-backend-service`;

    static checkHealth(): Promise<HealthState> {
        return fetch(`${this.base}/actuator/health`, FetchUtils.getGETConfig())
            .then(response => {
                FetchUtils.defaultResponseHandler(response);
                return response.json();
            })
            .catch(err => {
                FetchUtils.defaultResponseHandler(err);
            });


    }
}