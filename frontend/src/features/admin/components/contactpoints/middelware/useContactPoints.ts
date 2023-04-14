import {useMutation} from "@tanstack/vue-query";
import {
    deleteContactPoint,
    postContactPoint,
    putContactPoint
} from "@/features/admin/components/contactpoints/api/ContactPointsManipulationClient";
import {ContactPoint} from "@/features/commons/types/ContactPoint";

export const useCreateNewContactPoint = () =>
useMutation({
    mutationFn: async (newContactPoint: ContactPoint) =>
      await postContactPoint(newContactPoint),
  });

export const useUpdateContactPoint = () => useMutation({
    mutationFn: async (updateContactPoint: UpdateContactPoint) => 
        await putContactPoint(updateContactPoint.contactPoint, updateContactPoint.id)
});

export const useDeleteContactPoint = () => useMutation({
    mutationFn: (id: string) => deleteContactPoint(id)
})

export interface UpdateContactPoint {
    contactPoint: ContactPoint;
    id: string;
}