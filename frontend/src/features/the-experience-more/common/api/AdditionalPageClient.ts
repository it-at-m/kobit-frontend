import {PageType} from "@/features/the-experience-more/common/model/PageType";
import {httpGetJson} from "@/core/plugins/http";
import {ItemWrapper} from "@/features/admin/features/the-experience-more/features/the-leadership-cooperation/model/TextItem";

export const getAdditionalContentForPage = (pageType: PageType) => {
    return httpGetJson<ItemWrapper>("/additional/" + pageType);
};