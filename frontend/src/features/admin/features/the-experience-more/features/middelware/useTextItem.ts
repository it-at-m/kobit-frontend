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
    mutationFn: async (newTextItem: UseTextItem, file?: File) => {
      const headers = {
        "X-CSRF-TOKEN": (newTextItem.headers?.["X-CSRF-TOKEN"] || "") as string,
        "Content-Type": "application/json",
      };

      await postTextItem(newTextItem.pageType, newTextItem.textItem, newTextItem.file, headers);
    },
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
            return deleteTextItem(textItemToDelete.id, textItemToDelete.pageType, textItemToDelete.link);
        }
        throw new Error('ID is missing');
    }
});
export interface UseTextItem {
    id?: string;
    pageType: PageType;
    link: string;
    textItem: TextItem;
    file?: File;
    headers?: { 'X-CSRF-TOKEN': string | null };
}
