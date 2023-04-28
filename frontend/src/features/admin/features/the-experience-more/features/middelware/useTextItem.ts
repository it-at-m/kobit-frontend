import {useMutation} from "@tanstack/vue-query";
import {
    putTextItem,
    deleteTextItem,
    postTextItem
} from "@/features/admin/features/the-experience-more/features/api/TextItemManipulationClient";
import { TextItem } from "@/features/commons/types/Item";
import { PageType } from "@/features/the-experience-more/common/model/PageType";


export const useCreateNewTextItem = () =>
useMutation({
    mutationFn: async (newTextItem: UseTextItem) =>
      await postTextItem(newTextItem.pageType, newTextItem.textItem)
  });

  export const UseUpdateTextItem = () => useMutation({
    mutationFn: async (updateTextItem: UseTextItem) => {
        if (updateTextItem.id) {
            return await putTextItem(updateTextItem.id, updateTextItem.pageType, updateTextItem.textItem);
        }
        throw new Error('ID is missing');
    }
});

export const UseDeleteTextItem = () => useMutation({
    mutationFn: async (textItemToDelete: UseTextItem) => {
        if (textItemToDelete.id) {
            return deleteTextItem(textItemToDelete.id, textItemToDelete.pageType);
        }
        throw new Error('ID is missing');
    }
});
export interface UseTextItem {
    id?: string;
    pageType: PageType;
    textItem: TextItem;
}
