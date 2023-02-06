import Recipient from "@/features/the-unterstuetzungsfinder/features/the-mail/types/recipient.type";


export default class Mail {
    constructor(
        public from?: string,
        public to: string[] = [],
        public subject?: string,
        public message?: string,
        public releasedFromConfidentiality: boolean = false,
        public attachments?: Blob
        
    ) {}

    withFrom(value: string): Mail {
        this.from = value;
        return this;
    }

    withTo(value: string[]): Mail {
        this.to = value;
        return this;
    }

    withSubject(value: string): Mail {
        this.subject = value;
        return this;
    }

    withMessage(value: string): Mail {
        this.message = value;
        return this;
    }

    withAttachments(value: Blob): Mail {
        this.attachments = value;
        return this;
    }

    withIsReleasedFromConfidentiality(value: boolean): Mail {
        this.releasedFromConfidentiality = value;
        return this;
    }

    pushAnlaufstellenMailToRecipients(value: Recipient[]): Mail {

        value.forEach(recipient => {

                const email = recipient.contact?.email;
                const mailOrEmptyString = email ? email : "";
                if (mailOrEmptyString !== "") {
                    this.to.push(mailOrEmptyString);
                }
   
        });
        return this;
    }
    static createEmptyMail(): Mail {
        return new Mail();
    }
}