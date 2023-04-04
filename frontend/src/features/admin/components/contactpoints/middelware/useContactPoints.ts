import {useMutation, useQuery} from "@tanstack/vue-query";
import {
    deleteContactPoint,
    getContactPointById,
    getContactPoints,
    postContactPoint,
    putContactPoint
} from "@/features/admin/components/contactpoints/api/ContactPointsClient";
import {ContactPoint} from "@/features/commons/types/ContactPoint";

export const useGetContactPointListItems = () => {
    const {isLoading, isError, data, error} = useQuery(
        ['listItems'],
        () => getContactPoints()
    );
    return {isLoading, isError, listItems: data, error};
};

export const useGetContactPoint = (id: string) =>
    useQuery(
        ['contactPoint', id],
        () => getContactPointById(id)
    );

export const useCreateNewContactPoint = () =>
    useMutation({
            mutationFn: (newContactPoint: ContactPoint) => postContactPoint(newContactPoint)
        }
    );

export const useUpdateContactPoint = () => useMutation({
    mutationFn: (updateContactPoint: UpdateContactPoint) => putContactPoint(updateContactPoint.contactPoint, updateContactPoint.id)
});

export const useDeleteContactPoint = () => useMutation({
    mutationFn: (id: string) => deleteContactPoint(id)
})

export interface UpdateContactPoint {
    contactPoint: ContactPoint;
    id: string;
}