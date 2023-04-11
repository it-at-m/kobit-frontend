import {httpGetJson} from "@/core/plugins/http";
import {ContactPoint, ContactPointListItem} from "@/features/commons/types/ContactPoint";

export const getContactPoints = () => {
    return httpGetJson<ContactPointListItem[]>("/anlaufstellen-management/anlaufstellen");
};

export const getContactPointById = (id: string) => {
    return httpGetJson<ContactPoint>("/anlaufstellen-management/anlaufstellen/" + id);
};