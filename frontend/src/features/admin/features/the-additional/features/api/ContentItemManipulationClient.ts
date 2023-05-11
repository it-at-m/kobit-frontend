import {httpPutJson} from "@/core/plugins/http";
import {ContentItem} from "@/features/commons/types/Item";

export const putContentItem = (id: string, pageType: string, contentItem: ContentItem) => {
    return httpPutJson<ContentItem>("/additional/" + pageType + "/content-item/" + id, contentItem);
}
