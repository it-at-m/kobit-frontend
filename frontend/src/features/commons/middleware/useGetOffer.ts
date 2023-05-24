import {useQuery} from "@tanstack/vue-query";
import {getOfferById, getOffers} from "@/features/commons/api/OfferGetClient";
import {Ref} from "vue";

export const useGetOfferListItems = () => {
    const {isLoading, isError, data, error} = useQuery(
        ['listItems'],
        () => getOffers()
    );
    return {isLoading, isError, listItems: data, error};
};


export const useGetOffer = (id: Ref<string>) => {
    return useQuery(
        ['contactPoint', id.value],
        () => getOfferById(id.value)
    );
}