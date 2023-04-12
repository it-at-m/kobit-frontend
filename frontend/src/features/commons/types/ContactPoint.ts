import {Competence} from "@/features/commons/types/competence.type";


export interface ContactPoint {
    id?: string;
    name: string;
    shortCut: string;
    description: string;
    department?: string;
    contact?: Contact[];
    competences?: Competence[];
    links?: Link[];
}

export interface Contact {
    email: string;
}

export interface Link {
    contactPointId?: string;
    name?: string;
    url?: string;
    inDownloads?: boolean;
}

export interface ContactPointListItem {
    id?: string;
    name: string;
    shortCut: string;
}