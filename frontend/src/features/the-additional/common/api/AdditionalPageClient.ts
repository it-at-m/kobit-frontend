import { httpGetJson } from "@/core/plugins/http";
import { ItemWrapper } from "@/features/commons/types/Item";
import { PageType } from "@/features/the-additional/common/model/PageType";

export const getAdditionalContentForPage = (pageType: PageType) => {
  return httpGetJson<ItemWrapper>("/additional/" + pageType);
};
