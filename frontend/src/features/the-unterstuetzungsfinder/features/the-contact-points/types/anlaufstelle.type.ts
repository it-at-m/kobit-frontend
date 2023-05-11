import Contact from "@/features/commons/types/contact.type";
import {Competence} from "@/features/commons/types/competence.type";
import Link from "@/features/commons/types/link.type";

export interface AnlaufstelleResponse {
    id?: string;
    name?: string;
    shortCut?: string;
    description?: string;
    department?: string;

    contact: Contact[];
    competencies: string[];
    links: string[];

}

export interface AnlaufstelleMinified {
    id?: string;
    name?: string;
    shortCut?: string;
    department?: string;
}

export default class Anlaufstelle {

    id?: string;
    name?: string;
    shortCut?: string;
    description?: string;
    department?: string;

    contact: Contact[];
    competencies: Competence[];
    links: Link[];


    constructor(id?: string, name?: string, shortCut?: string, description?: string, department?: string) {
        this.id = id;
        this.name = name;
        this.shortCut = shortCut;

        this.description = description;
        this.department = department;


        this.contact = [];


        this.competencies = [];
        this.links = [];        
    }

    withId(value: string): Anlaufstelle {
     this.id = value;
     return this;
    }

    withName(value: string): Anlaufstelle {
     this.name = value;
     return this;
    }

    withShortCut(value: string): Anlaufstelle {
        this.shortCut = value;
        return this;
    }

    withDepartment(value: string): Anlaufstelle {
        this.department = value;
        return this;
    }

    withDescription(value: string): Anlaufstelle {
        this.description = value;
        return this;
    }

    withContact(value: Contact[]): Anlaufstelle {
        this.contact = value;
        return this;
    }

    withLinks(value: Link[]): Anlaufstelle {
        this.links = value;
        return this;
    }

    withCompetencies(value: Competence[]): Anlaufstelle {
        this.competencies = value;
        return this;
    }

    static createEmptyAnlaufstelle(): Anlaufstelle {
        return new Anlaufstelle();
    }
}