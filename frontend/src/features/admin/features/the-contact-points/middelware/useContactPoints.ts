import { useMutation } from "@tanstack/vue-query";
import {
    deleteContactPoint,
    postContactPoint,
    putContactPoint
} from "@/features/admin/features/the-contact-points/api/ContactPointsManipulationClient";
import { ContactPoint } from "@/features/commons/types/ContactPoint";




export const useUpdateContactPoint = () => useMutation({
    mutationFn: async (useContactPoint: UseContactPoint) => {
        if (useContactPoint.id) {
            const headers = {
                "Content-Type": "multipart/form-data",
            };
            return await putContactPoint(useContactPoint.id, useContactPoint.contactPoint, useContactPoint.file, headers);
        }
        throw new Error('ID is missing');
    }
});

export const useDeleteContactPoint = () => useMutation({
    mutationFn: async (contactPointToDelete: ContactPoint) => {
        if (contactPointToDelete.id) {
            return deleteContactPoint(contactPointToDelete);
        }
        throw new Error('ID is missing');
    }
});

export const useCreateNewContactPoint = () =>
    useMutation({
        mutationFn: async (newContactPoint: UseContactPoint) => {
            const headers = {
                "Content-Type": "multipart/form-data",
            };

            await postContactPoint(newContactPoint.contactPoint, newContactPoint.file, headers);
        },
    });


export interface UseContactPoint {
    contactPoint: ContactPoint;
    id?: string;
    file?: File;
    image: string;
    headers?: { 'Content-Type': string | null };
}