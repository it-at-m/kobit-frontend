import {useMutation} from "@tanstack/vue-query";
import {
    deleteContactPoint,
    postContactPoint,
    putContactPoint
} from "@/features/admin/features/the-contact-points/api/ContactPointsManipulationClient";
import {ContactPoint} from "@/features/commons/types/ContactPoint";
import ListItemToCompetenceView from "@/features/admin/components/u-finder/model/ListItemToCompetenceView";

export const useCreateNewContactPoint = () =>
    useMutation({
        mutationFn: (newContactPoint: ContactPoint) =>
            postContactPoint(newContactPoint),
    });

export const useUpdateContactPoint = () => useMutation({
    mutationFn: (updateContactPoint: UpdateContactPoint) => putContactPoint(updateContactPoint.contactPoint, updateContactPoint.id)
});

export const useUpdateCompetences = () => useMutation({
    mutationFn: (itemsToUpdate: ListItemToCompetenceView[]) =>
        updateCompetences(itemsToUpdate)

});

export const useDeleteContactPoint = () => useMutation({
    mutationFn: (id: string) => deleteContactPoint(id)
})

export interface UpdateContactPoint {
    contactPoint: ContactPoint;
    id: string;
}
