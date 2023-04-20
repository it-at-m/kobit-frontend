import {useMutation} from "@tanstack/vue-query";
import {
    putContentItem
} from "@/features/admin/features/the-experience-more/features/api/ContentItemManipulationClient";
import { ContentItem } from "../model/ContentItem";

export const useUpdateContactPoint = () => useMutation({
    mutationFn: async (updateContactPoint: UpdateContactPoint) => 
        await putContentItem(updateContactPoint.content, updateContactPoint.id)
});

export interface UpdateContactPoint {
    id: string;
    content: ContentItem;
}