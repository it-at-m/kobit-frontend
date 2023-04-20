import {httpPutJson} from "@/core/plugins/http";
import {ContentItem} from "@/features/admin/features/the-experience-more/features/model/ContentItem";


export const putContentItem = (contentItem: ContentItem, id: string) => {
    return httpPutJson<ContentItem>("/additional/" + contentItem.page_type + "/content-item/" + id, contentItem);
}
