import {httpPutJson} from "@/core/plugins/http";
import {TextItem} from "@/features/admin/features/the-experience-more/features/model/TextItem";


export const putTextItem = (textItem: TextItem, id: string) => {
    return httpPutJson<TextItem>("/additional/" + textItem.page_type + "/text-item/" + id, textItem);
}
