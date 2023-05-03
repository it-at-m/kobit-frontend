import {httpDeleteJson, httpPostJson, httpPutJson} from "@/core/plugins/http";
import {TextItem} from "@/features/commons/types/Item";

export const postTextItem = (pageType: string, textItem: TextItem) => {
    return httpPostJson<TextItem>("/additional/" + pageType, textItem);
};

export const putTextItem = (id: string, pageType: string, textItem: TextItem) => {
    return httpPutJson<TextItem>("/additional/" + pageType + "/text-item/" + id, textItem);
}

export const deleteTextItem = (id: string, pageType: string, link: string) => {
    const url = `/additional/${pageType}/text-item/${id}?link=${encodeURIComponent(link)}`;
    return httpDeleteJson(url);
  }
  
