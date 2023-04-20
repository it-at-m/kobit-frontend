import {useQuery} from "@tanstack/vue-query";
import {getAdminUserInfo} from "@/features/admin/components/userinformation/api/AdminInfoClient";
import AdminUserInfo, {AdminTextInfo} from "@/features/admin/components/userinformation/model/AdminUserInfo";
import {adminInformationLabels} from "@/features/admin/i18n";

const mapAdminInfoToText = (adminInfo: AdminUserInfo): AdminTextInfo => {
    const labels = adminInformationLabels
    if (adminInfo.isCentralAdmin) {
        return {department: adminInfo.department, infoText: labels.centralAdmin};
    }
    if (adminInfo.isDepartmentAdmin) {
        return {department: adminInfo.department, infoText: labels.departmentAdmin};
    }
    return {department: adminInfo.department, infoText: labels.noAdmin};
}

export const useGetAdminUserInfo = () =>
    useQuery<AdminTextInfo>(['adminInfo'],
        () => getAdminUserInfo().then(mapAdminInfoToText)
    );