import {httpPutJson} from "@/core/plugins/http";
import {ContentItem} from "@/features/admin/features/the-experience-more/features/model/Item";


export const putContentItem = (contentItem: ContentItem, id: string) => {
    return httpPutJson<ContentItem>("/additional/" + contentItem.pageType + "/content-item/" + id, contentItem);
}
