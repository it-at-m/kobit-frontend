import {useMutation} from "@tanstack/vue-query";
import {
    putTextItem
} from "@/features/admin/features/the-experience-more/features/api/TextItemManipulationClient";
import { TextItem } from "@/features/commons/types/Item";
import { PageType } from "@/features/the-experience-more/common/model/PageType";

export const UseUpdateTextItem = () => useMutation({
    mutationFn: async (updateTextItem: UseUpdateTextItem) => 
        await putTextItem(updateTextItem.id, updateTextItem.pageType, updateTextItem.content )
});

export interface UseUpdateTextItem {
    id: string;
    pageType: PageType;
    content: TextItem;
}