import {httpDeleteJson, httpPostJson, httpPutJson} from "@/core/plugins/http";
import {ContactPoint} from "@/features/commons/types/ContactPoint";

export const postContactPoint = (contactPoint: ContactPoint) => {
    return httpPostJson<ContactPoint>("/anlaufstellen-management/anlaufstellen", contactPoint);
};

export const putContactPoint = (contactPoint: ContactPoint, id: string) => {
    return httpPutJson<ContactPoint>("/anlaufstellen-management/anlaufstellen/" + id, contactPoint);
}

export const deleteContactPoint = (id: string) => {
    return httpDeleteJson("/anlaufstellen-management/anlaufstellen/" +id);
}