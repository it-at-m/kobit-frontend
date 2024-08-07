import { useQuery } from "@tanstack/vue-query";
import { Ref } from "vue";

import { getAdminUserInfo } from "@/features/admin/components/userinformation/api/AdminInfoClient";
import { AdminUserInfo } from "@/features/admin/components/userinformation/model/AdminUserInfo";
import {
  getContactPointById,
  getContactPoints,
} from "@/features/commons/api/ContactPointsGetClient";
import { ContactPointListItem } from "@/features/commons/types/ContactPoint";

export const useGetContactPointListItems = () =>
  useQuery<ContactPointListItem[]>(["listItems"], () => getContactPoints());

const filterForEditableContactPoints = (
  listItems: ContactPointListItem[],
  adminUserInfo: AdminUserInfo
) => {
  if (adminUserInfo.isCentralAdmin) {
    return listItems;
  } else {
    return listItems.filter((it) =>
      it.departments.includes(adminUserInfo.department)
    );
  }
};

export const useGetEditableContactPoints = () =>
  useQuery<ContactPointListItem[]>(["adminListItems"], () =>
    getContactPoints().then((listItems) => {
      return getAdminUserInfo().then((adminInfo) => {
        return filterForEditableContactPoints(listItems, adminInfo);
      });
    })
  );

export const useGetContactPoint = (id: Ref<string>) => {
  return useQuery(["contactPoint", id.value], () =>
    getContactPointById(id.value)
  );
};
