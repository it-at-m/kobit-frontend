import {useQuery} from "@tanstack/vue-query";
import {getContactPointById, getContactPoints} from "@/features/commons/api/ContactPointsGetClient";
import {Ref} from "vue";
import {getAdminUserInfo} from "@/features/admin/components/userinformation/api/AdminInfoClient";
import {ContactPointListItem} from "@/features/commons/types/ContactPoint";
import {AdminUserInfo} from "@/features/admin/components/userinformation/model/AdminUserInfo";

export const useGetContactPointListItems = () => {
    const {isLoading, isError, data, error} = useQuery(
        ['listItems'],
        () => getContactPoints()
    );
    return {isLoading, isError, listItems: data, error};
};

const filterForEditableContactPoints = (listItems: ContactPointListItem[], adminUserInfo: AdminUserInfo) => {
    if (adminUserInfo.isCentralAdmin) {
        return listItems
    } else {
        return listItems.filter(it => it.departments.includes(adminUserInfo.department));
    }
}

export const useGetEditableContactPoints = () =>
    useQuery<ContactPointListItem[]>(
        ['adminListItems'],
        () => getContactPoints()
            .then((listItems) => {
                return getAdminUserInfo().then(adminInfo => {
                    return filterForEditableContactPoints(listItems, adminInfo)
                })
            })
    )

export const useGetContactPoint = (id: Ref<string>) => {
    return useQuery(
        ['contactPoint', id.value],
        () => getContactPointById(id.value)
    );
}


