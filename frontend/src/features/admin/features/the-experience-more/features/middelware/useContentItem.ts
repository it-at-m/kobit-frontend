import {useMutation} from "@tanstack/vue-query";
import {
    putContentItem
} from "@/features/admin/features/the-experience-more/features/api/ContentItemManipulationClient";
import { ContentItem } from "@/features/commons/types/Item";
import { PageType } from "@/features/the-experience-more/common/model/PageType";

export const useUpdateContentItem = () => useMutation({
    mutationFn: async (updateContentItem: useUpdateContentItem) => 
        await putContentItem( updateContentItem.id, updateContentItem.pageType, updateContentItem.contentItem)
});

export interface useUpdateContentItem {
    id: string;
    pageType: PageType;
    contentItem: ContentItem;

}