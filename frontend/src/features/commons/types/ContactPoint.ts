import {Competence} from "@/features/commons/types/competence.type";


export interface ContactPoint {
    id?: string;
    name: string;
    shortCut: string;
    description: string;
    departments?: string[];
    contact?: Contact[];
    competences?: Competence[];
    links?: Link[];
    image: string;
    position: number;
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
    departments: string[];
}

export interface ContactPointListItemWithPosition {
    id?: string;
    name: string;
    shortCut: string;
    departments: string[];
    position:number
}