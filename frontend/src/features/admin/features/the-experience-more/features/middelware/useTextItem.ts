import {useMutation} from "@tanstack/vue-query";
import {
    putTextItem
} from "@/features/admin/features/the-experience-more/features/api/TextItemManipulationClient";
import { TextItem } from "@/features/admin/features/the-experience-more/features/model/Item";

export const useUpdateTextItem = () => useMutation({
    mutationFn: async (updateTextItem: useUpdateTextItem) => 
        await putTextItem(updateTextItem.content, updateTextItem.id)
});

export interface useUpdateTextItem {
    id: string;
    content: TextItem;
}