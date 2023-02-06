export default class MailUser {

    emailAddress?: string;
    
    constructor(emailAddress?: string) {
        this.emailAddress = emailAddress;
    }

    withEmailAddress(value: string): MailUser {
        this.emailAddress = value;
        return this;
    }
    static createEmptyMailUser(): MailUser {
        return new MailUser();
    }
}