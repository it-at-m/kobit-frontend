export interface Email {
    from?: string;
    to?: string[];
    subject?: string;
    message?: string;
    releasedFromConfidentiality?: boolean;
}

export interface SenderMailAddress {
    emailAddress: string;
}