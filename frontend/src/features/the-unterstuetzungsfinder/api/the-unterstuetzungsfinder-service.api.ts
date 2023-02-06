import FetchUtils from "@/core/services/api/FetchUtils";
import Conversation from "@/features/the-unterstuetzungsfinder/types/conversation.type";
import {Competence} from "@/features/the-unterstuetzungsfinder/types/competence.type";

export interface CommunicationBody {
    id: string;
    tag: Competence;
}

export default class UnterstuetzungsfinderService {
    private static base: string | undefined = `${process.env.VUE_APP_API_URL}/api/kobit-backend-service`;


    static postNextAnswer(value: string[]): Promise<Conversation> {
        return fetch(`${this.base}/unterstuetzungsfinder/next`,FetchUtils.getPOSTConfig(value))
            .then(response => {
                FetchUtils.defaultResponseHandler(response);
                return response.json();
            }).catch(FetchUtils.defaultCatchHandler);

    }


    static initCommunication(value?: string): Promise<Conversation> {
        return fetch(`${this.base}/unterstuetzungsfinder/start/${value ? value : ""}`,FetchUtils.getGETConfig())
            .then(response => {
                FetchUtils.defaultResponseHandler(response);
                return response.json();
            }).catch(FetchUtils.defaultCatchHandler);

    }
    
}