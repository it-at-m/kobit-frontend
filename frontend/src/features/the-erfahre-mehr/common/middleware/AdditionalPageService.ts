import {useQuery} from "@tanstack/vue-query";
import {PageType} from "@/features/the-erfahre-mehr/common/model/PageType";
import {getAdditionalContentForPage} from "@/features/the-erfahre-mehr/common/api/AdditionalPageClient";

export const useGetAdditionalContent = (pageType: PageType) => {
    const {isLoading, isError, data, error} = useQuery(
        ['itemWrapper'],
        () => getAdditionalContentForPage(pageType)
    );
    return {isLoading, isError, data, error};
};