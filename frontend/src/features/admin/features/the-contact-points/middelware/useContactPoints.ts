import {useMutation} from "@tanstack/vue-query";
import {
    deleteContactPoint,
    postContactPoint,
    putContactPoint
} from "@/features/admin/features/the-contact-points/api/ContactPointsManipulationClient";
import {ContactPoint} from "@/features/commons/types/ContactPoint";

export const useCreateNewContactPoint = () =>
    useMutation({
        mutationFn: (newContactPoint: ContactPoint) =>
            postContactPoint(newContactPoint),
    });

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