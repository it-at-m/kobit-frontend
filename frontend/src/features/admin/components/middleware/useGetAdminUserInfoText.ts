import {useQuery} from "@tanstack/vue-query";
import {getAdminUserInfo} from "@/features/admin/components/userinformation/api/AdminInfoClient";
import {adminInformationLabels} from "@/features/admin/i18n";
import {AdminTextInfo, AdminUserInfo} from "@/features/admin/components/userinformation/model/AdminUserInfo";

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

export const useGetAdminUserInfoText = () =>
    useQuery<AdminTextInfo>(['adminInfoText'],
        () => getAdminUserInfo().then(mapAdminInfoToText)
    );

export const useGetAdminUserInfo = () =>
    useQuery<AdminUserInfo>(['adminInfo'],
        () => getAdminUserInfo()
    );