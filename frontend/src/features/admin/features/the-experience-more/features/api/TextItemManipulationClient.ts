import {httpPutJson} from "@/core/plugins/http";
import {TextItem} from "@/features/commons/types/Item";

export const putTextItem = (id: string, pageType: string, textItem: TextItem) => {
    return httpPutJson<TextItem>("/additional/" + pageType + "/text-item/" + id, textItem);
}
