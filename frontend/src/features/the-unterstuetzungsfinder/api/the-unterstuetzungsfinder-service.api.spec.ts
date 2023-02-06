import fetch from "jest-fetch-mock";
import UnterstuetzungsfinderService
    from "@/features/the-unterstuetzungsfinder/api/the-unterstuetzungsfinder-service.api";
import Conversation from "@/features/the-unterstuetzungsfinder/types/conversation.type";

describe('the-unterstuetzungsfinder-service.api', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });
    test('if initCommunication calls right entpoint', () => {
        const question = Conversation.createEmptyConversation()
        const answer = Conversation.createEmptyConversation();

        fetch.mockResponseOnce(JSON.stringify({ data: [question,answer] }));
        UnterstuetzungsfinderService.initCommunication().then((res: any) => {
            expect(res.data).toEqual([question,answer]);
        });
    });
});