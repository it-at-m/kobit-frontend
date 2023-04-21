import {httpPutJson} from "@/core/plugins/http";
import {TextItem} from "@/features/admin/features/the-experience-more/features/model/Item";


export const putTextItem = (textItem: TextItem, id: string) => {
    return httpPutJson<TextItem>("/additional/" + textItem.pageType + "/text-item/" + id, textItem);
}
