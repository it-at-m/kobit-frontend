import {useQuery} from "@tanstack/vue-query";
import {getAdminUserInfo} from "@/features/admin/components/userinformation/api/AdminInfoClient";

export const useGetAdminUserInfo = () =>
    useQuery(
        ['adminInfo'],
        () => getAdminUserInfo()
    )
