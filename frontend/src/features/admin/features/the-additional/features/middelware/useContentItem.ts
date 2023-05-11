import {useMutation} from "@tanstack/vue-query";
import {
    putContentItem
} from "@/features/admin/features/the-additional/features/api/ContentItemManipulationClient";
import { ContentItem } from "@/features/commons/types/Item";
import { PageType } from "@/features/the-additional/common/model/PageType";

export const UseUpdateContentItem = () => useMutation({
    mutationFn: (updateContentItem: UseUpdateContentItem) => 
         putContentItem( updateContentItem.id, updateContentItem.pageType, updateContentItem.contentItem)
});

export interface UseUpdateContentItem {
    id: string;
    pageType: PageType;
    contentItem: ContentItem;

}