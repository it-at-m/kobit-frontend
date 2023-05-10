export interface AdminUserInfo{
    readonly isCentralAdmin: boolean;
    readonly isDepartmentAdmin: boolean;
    readonly department: string;
}

export interface AdminTextInfo {
    readonly department: string;
    readonly infoText?: string;
}
