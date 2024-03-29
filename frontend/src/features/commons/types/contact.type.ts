

export interface ContactResponse {
    contactPointId?: string;
    email?: string | null;
}

/**
 * @deprecated this is not the correct model and should be removed the contact interface should be used instead
 */
export default class Contact {
    contactPointId?: string;
    email?: string;


    constructor(contactPointId?: string, email?: string) {
        this.contactPointId = contactPointId;
        this.email = email;
    }

    withId(value: string): Contact {
        this.contactPointId = value;
        return this;
    }


    withEmail(value: string): Contact {
        this.email = value;
        return this;
    }

    static createEmptyContact(): Contact {
        return new Contact();
    }
}