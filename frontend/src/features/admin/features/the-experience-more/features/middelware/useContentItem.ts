import {useMutation} from "@tanstack/vue-query";
import {
    putContentItem
} from "@/features/admin/features/the-experience-more/features/api/ContentItemManipulationClient";
import { ContentItem } from "@/features/commons/types/Item";

export const useUpdateContentItem = () => useMutation({
    mutationFn: async (updateContentItem: useUpdateContentItem) => 
        await putContentItem(updateContentItem.content, updateContentItem.id)
});

export interface useUpdateContentItem {
    id: string;
    content: ContentItem;
}