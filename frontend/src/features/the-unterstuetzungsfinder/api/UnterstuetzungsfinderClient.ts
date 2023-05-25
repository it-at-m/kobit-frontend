import {httpPostJson} from "@/core/plugins/http";
import Conversation from "@/features/the-unterstuetzungsfinder/types/conversation.type";

export const nextStep = (competence: string[]) => {
    return httpPostJson<Conversation>("/unterstuetzungsfinder/next", competence);
};