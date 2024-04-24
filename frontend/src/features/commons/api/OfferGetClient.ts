import {httpGetJson} from "@/core/plugins/http";
import {Offer, OfferListItem} from "@/features/commons/types/Offer";

export const getOffers = () => {
    return httpGetJson<OfferListItem[]>("/offers");
};

export const getOfferById = (id: string) => {
    return httpGetJson<Offer>("/offers/" + id);
};