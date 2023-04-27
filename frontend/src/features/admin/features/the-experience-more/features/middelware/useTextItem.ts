import {useMutation} from "@tanstack/vue-query";
import {
    putTextItem,
    deleteTextItem
} from "@/features/admin/features/the-experience-more/features/api/TextItemManipulationClient";
import { TextItem } from "@/features/commons/types/Item";
import { PageType } from "@/features/the-experience-more/common/model/PageType";

export const UseUpdateTextItem = () => useMutation({
    mutationFn: async (updateTextItem: UseTextItem) => 
        await putTextItem(updateTextItem.id, updateTextItem.pageType, updateTextItem.textItem )
});

export const UseDeleteTextItem = () => useMutation({
    mutationFn: async (textItemToDelete: UseTextItem) => deleteTextItem(textItemToDelete.id, textItemToDelete.pageType)
});

export interface UseTextItem {
    id: string;
    pageType: PageType;
    textItem: TextItem;
}
