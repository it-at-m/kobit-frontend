import {httpDeleteJson, httpGetJson, httpPostJson, httpPutJson} from "@/core/plugins/http";
import {ContactPoint, ContactPointListItem} from "@/features/commons/types/ContactPoint";

export const getContactPoints = () => {
    return httpGetJson<ContactPointListItem[]>("/anlaufstellen-management/a");
};

export const getContactPointById = (id: string) => {
    return httpGetJson<ContactPoint>("/anlaufstellen-management/anlaufstellen/" + id);
};

export const postContactPoint = (contactPoint: ContactPoint) => {
    return httpPostJson<ContactPoint>("/anlaufstellen-management/anlaufstellen", contactPoint);
};

export const putContactPoint = (contactPoint: ContactPoint, id: string) => {
    return httpPutJson<ContactPoint>("/anlaufstellen-management/anlaufstellen/" + id, contactPoint);
}

export const deleteContactPoint = (id: string) => {
    return httpDeleteJson("/anlaufstellen-management/anlaufstellen/" +id);
}