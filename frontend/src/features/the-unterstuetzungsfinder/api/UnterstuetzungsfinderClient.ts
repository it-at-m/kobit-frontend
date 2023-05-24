import {httpPostJson} from "@/core/plugins/http";
import Conversation from "@/features/the-unterstuetzungsfinder/types/conversation.type";

export const nextStep = (competence: string[]) => {
    console.log(competence);
    return httpPostJson<Conversation>("/unterstuetzungsfinder/next", competence);
};