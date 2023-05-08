import {useQuery} from "@tanstack/vue-query";
import {getContactPointById, getContactPoints} from "@/features/commons/api/ContactPointsGetClient";
import {Ref} from "vue";
import {ContactPointListItem} from "@/features/commons/types/ContactPoint";

export const useGetContactPointListItems = () =>
    useQuery<ContactPointListItem[]>(
        ['listItems'],
        () => getContactPoints()
    );


export const useGetContactPoint = (id: Ref<string>) => {
    return useQuery(
        ['contactPoint', id.value],
        () => getContactPointById(id.value)
    );
}


