import {useMutation} from "@tanstack/vue-query";
import {
    putContentItem
} from "@/features/admin/features/the-experience-more/features/api/ContentItemManipulationClient";
import { ContentItem } from "@/features/commons/types/Item";
import { PageType } from "@/features/the-experience-more/common/model/PageType";

export const UseUpdateContentItem = () => useMutation({
    mutationFn: async (updateContentItem: UseUpdateContentItem) => 
        await putContentItem( updateContentItem.id, updateContentItem.pageType, updateContentItem.contentItem)
});

export interface UseUpdateContentItem {
    id: string;
    pageType: PageType;
    contentItem: ContentItem;

}