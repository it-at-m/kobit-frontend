import {useMutation} from "@tanstack/vue-query";
import {
    putTextItem
} from "@/features/admin/features/the-experience-more/features/api/TextItemManipulationClient";
import { TextItem } from "../model/TextItem";

export const useUpdateContactPoint = () => useMutation({
    mutationFn: async (updateContactPoint: UpdateContactPoint) => 
        await putTextItem(updateContactPoint.content, updateContactPoint.id)
});

export interface UpdateContactPoint {
    id: string;
    content: TextItem;
}