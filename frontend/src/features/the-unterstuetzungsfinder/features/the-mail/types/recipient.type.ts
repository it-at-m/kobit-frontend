import Contact from "@/features/the-unterstuetzungsfinder/features/the-anlaufstellen/types/contact.type";


export default class Recipient {
    contact?: Contact;
    shortCut?: string;

    withContact(value: Contact): Recipient {
        this.contact = value;
        return this;
    }

    withshortCut(value: string): Recipient {
        this.shortCut = value;
        return this;
    }

    static createEmptyRecipient(): Recipient {
        return new Recipient();
    }

}