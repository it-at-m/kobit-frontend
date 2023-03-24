import {getIsAdmin} from "@/core/api/UserApi";
import {useQuery} from "@tanstack/vue-query";
import User from "@/core/model/User";

const KOBIT_ADMIN = "";
const DEPARTMENT_ADMIN = ""

export const useIsAdmin = () => {
    const {isLoading, isError, data} = useQuery(
        ['user'],
        () => getIsAdmin()
    );
    return {isLoading, isError, isAdmin: data};
}

export const isKobitAdmin = (roles: string[]) => {
    return roles.includes(KOBIT_ADMIN);
}

export const isDepartmentAdmin = (roles: string[]) => {
    return roles.includes(DEPARTMENT_ADMIN);
}

export const isAdmin = (user: User | undefined) => {
    if (user != undefined) {
        return isKobitAdmin(user.roles) || isDepartmentAdmin(user.roles);
    } else {
        return false;
    }
}