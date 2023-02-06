import {PageType} from "@/features/the-erfahre-mehr/common/model/PageType";
import {httpGetJson} from "@/core/plugins/http";
import {ItemWrapper} from "@/features/the-erfahre-mehr/common/model/TextItem";

export const getAdditionalContentForPage = (pageType: PageType) => {
    return httpGetJson<ItemWrapper>("/additional/" + pageType);
};