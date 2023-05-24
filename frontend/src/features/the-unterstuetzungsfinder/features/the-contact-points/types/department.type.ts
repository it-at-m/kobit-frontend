export enum Department {
    IT_M = "IT_M",
    RIT = "RIT",
    POR = "POR",
    DIR = "DIR",
    NONE = "NONE"
}

export const departmentToText = new Map<string,string> ([
    [Department.IT_M,"it@M"],
    [Department.RIT,"RIT"],
    [Department.POR,"POR"],
    [Department.DIR,"DIR"],
    [Department.NONE,""]
]);

export const departmentAsRecord: Record<string,string>[] = Object.values(Department).map(value => {
    return {
        text: departmentToText.get(value) as string,
        value: value
    };
});
