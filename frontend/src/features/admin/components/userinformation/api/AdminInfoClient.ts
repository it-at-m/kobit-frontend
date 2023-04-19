import {httpGetJson} from "@/core/plugins/http";
import AdminUserInfo from "@/features/admin/components/userinformation/model/AdminUserInfo";

export const getAdminUserInfo = () => {
    return httpGetJson<AdminUserInfo>("/admin/info")
}