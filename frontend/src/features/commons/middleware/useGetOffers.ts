import {useQuery} from "@tanstack/vue-query";
import {getOfferById, getOffers} from "@/features/commons/api/OfferGetClient";
import {Ref} from "vue";
import {OfferListItem} from "@/features/commons/types/Offer";

import {getAdminUserInfo} from "@/features/admin/components/userinformation/api/AdminInfoClient";
import {AdminUserInfo} from "@/features/admin/components/userinformation/model/AdminUserInfo";




export const useGetOfferListItems = () =>
    useQuery<OfferListItem[]>(
        ['listItems'],
        () => getOffers()
    );


const filterForEditableOffers = (listItems: OfferListItem[], adminUserInfo: AdminUserInfo) => {
    if (adminUserInfo.isCentralAdmin) {
        return listItems
    } else {
        return listItems.filter(it => it.departments.includes(adminUserInfo.department));
    }
}

export const useGetEditableOffers = () =>
    useQuery<OfferListItem[]>(
        ['adminListItems'],
        () => getOffers()
            .then((listItems) => {
                return getAdminUserInfo().then(adminInfo => {
                    return filterForEditableOffers(listItems, adminInfo)
                })
            })
    )

export const useGetOffer = (id: Ref<string>) => {
    return useQuery(
        ['offer', id.value],
        () => getOfferById(id.value)
    );
}