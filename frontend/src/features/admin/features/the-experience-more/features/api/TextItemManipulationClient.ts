import {httpPutJson} from "@/core/plugins/http";
import {TextItem} from "@/features/commons/types/Item";


export const putTextItem = (textItem: TextItem, id: string) => {
    return httpPutJson<TextItem>("/additional/" + textItem.pageType + "/text-item/" + id, textItem);
}
