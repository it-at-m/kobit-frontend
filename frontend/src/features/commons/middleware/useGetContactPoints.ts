import {useQuery} from "@tanstack/vue-query";
import {getContactPointById, getContactPoints} from "@/features/commons/api/ContactPointsGetClient";
import {Ref} from "vue";

export const useGetContactPointListItems = () => {
    const {isLoading, isError, data, error} = useQuery(
        ['listItems'],
        () => getContactPoints()
    );
    return {isLoading, isError, listItems: data, error};
};

export const useGetContactPoint = (id: Ref<string>) => {
    return useQuery(
        ['contactPoint', id.value],
        () => getContactPointById(id.value)
    );
}


