import {httpGetJson} from "@/core/plugins/http";

export const getIsAdmin = () => httpGetJson<boolean>("/admin");