import { useMutation } from "@tanstack/vue-query";
import {
    deleteOffer,
    postOffer,
    putOffer
} from "@/features/admin/features/the-offers/api/OffersManipulationClient";
import { Offer } from "@/features/commons/types/Offer";


export const useUpdateOffer = () => useMutation({
    mutationFn: async (useOffers: UseOffers) => {
        if (useOffers.id) {
            const headers = {
                "Content-Type": "multipart/form-data",
            };
            return await putOffer(useOffers.id, useOffers.offer, useOffers.file, headers);
        }
        throw new Error('ID is missing');
    }
});


export const useDeleteOffer = () => useMutation({
    mutationFn: async (contactPointToDelete: Offer) => {
        if (contactPointToDelete.id) {
            return deleteOffer(contactPointToDelete);
        }
        throw new Error('ID is missing');
    }
});

export const useCreateNewOffer = () =>
    useMutation({
        mutationFn: async (newOffers: UseOffers) => {
            const headers = {
                "Content-Type": "multipart/form-data",
            };

            await postOffer(newOffers.offer, newOffers.file, headers);
        },
    });


export interface UseOffers {
    offer: Offer;
    id?: string;
    file?: File;
    image: string;
    headers?: { 'Content-Type': string | null };
}