import {httpPutJson} from "@/core/plugins/http";
import {ContentItem} from "@/features/commons/types/Item";


export const putContentItem = (contentItem: ContentItem, id: string) => {
    return httpPutJson<ContentItem>("/additional/" + contentItem.pageType + "/content-item/" + id, contentItem);
}
