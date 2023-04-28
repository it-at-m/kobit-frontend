import {httpDeleteJson, httpPostJson, httpPutJson} from "@/core/plugins/http";
import {TextItem} from "@/features/commons/types/Item";

export const postTextItem = (pageType: string, textItem: TextItem) => {
    console.log(pageType)
    console.log(textItem)
    return httpPostJson<TextItem>("/additional/" + pageType, textItem);
};

export const putTextItem = (id: string, pageType: string, textItem: TextItem) => {
    return httpPutJson<TextItem>("/additional/" + pageType + "/text-item/" + id, textItem);
}

export const deleteTextItem = (id: string, pageType: string) => {
    return httpDeleteJson("/additional/" + pageType + "/text-item/" + id);
}
