import {useQuery} from "@tanstack/vue-query";
import {PageType} from "@/features/the-experience-more/common/model/PageType";
import {getAdditionalContentForPage} from "@/features/the-experience-more/common/api/AdditionalPageClient";

export const useGetAdditionalContent = (pageType: PageType) => {
    const {isLoading, isError, data, error} = useQuery(
        ['itemWrapper', pageType],
        () => getAdditionalContentForPage(pageType)
    );
    return {isLoading, isError, data, error};
};