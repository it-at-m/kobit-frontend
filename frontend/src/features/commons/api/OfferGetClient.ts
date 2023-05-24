import {httpGetJson} from "@/core/plugins/http";
import {Offer} from "@/features/commons/types/Offer";

export const getOffers = () => {
    return httpGetJson<Offer[]>("/offers");
};

export const getOfferById = (id: string) => {
    return httpGetJson<Offer>("/offers/" + id);
};