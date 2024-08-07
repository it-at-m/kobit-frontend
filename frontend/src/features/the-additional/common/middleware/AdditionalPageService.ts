import { useQuery } from "@tanstack/vue-query";

import { getAdditionalContentForPage } from "@/features/the-additional/common/api/AdditionalPageClient";
import { PageType } from "@/features/the-additional/common/model/PageType";

export const useGetAdditionalContent = (pageType: PageType) => {
  const { isLoading, isError, data, error } = useQuery(
    ["itemWrapper", pageType],
    () => getAdditionalContentForPage(pageType)
  );
  return { isLoading, isError, data, error };
};
