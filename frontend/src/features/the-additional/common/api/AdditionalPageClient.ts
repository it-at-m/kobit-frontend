import {PageType} from "@/features/the-additional/common/model/PageType";
import {httpGetJson} from "@/core/plugins/http";
import {ItemWrapper} from "@/features/commons/types/Item";
export const getAdditionalContentForPage = (pageType: PageType) => {
    return httpGetJson<ItemWrapper>("/additional/" + pageType);
};
