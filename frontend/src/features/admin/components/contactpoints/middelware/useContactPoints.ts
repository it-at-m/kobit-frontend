import {useMutation} from "@tanstack/vue-query";
import {
    deleteContactPoint,
    postContactPoint,
    putContactPoint, updateCompetences
} from "@/features/admin/components/contactpoints/api/ContactPointsManipulationClient";
import {ContactPoint} from "@/features/commons/types/ContactPoint";
import ListItemToCompetenceView from "@/features/admin/components/u-finder/model/ListItemToCompetenceView";

export const useCreateNewContactPoint = () =>
useMutation({
    mutationFn: async (newContactPoint: ContactPoint) =>
      await postContactPoint(newContactPoint),
  });

export const useUpdateContactPoint = () => useMutation({
    mutationFn: (updateContactPoint: UpdateContactPoint) =>
         putContactPoint(updateContactPoint.contactPoint, updateContactPoint.id)
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