export interface LinkResponse {
    contactPointId?: string;
    name?: string | null;
    url?: string | null;
    inDownloads?: boolean | null;
}

/**
 * @deprecated the interface should be used instead
 */

export default class Link {
    contactPointId?: string;
    name?: string;
    url?: string;
    inDownloads?: boolean;

    constructor(id?: string, name?: string, url?: string, inDownloads?: boolean) {
        this.contactPointId = id;
        this.name = name;
        this.url = url;
        this.inDownloads = inDownloads;
    }

    withId(value: string): Link {
        this.contactPointId = value;
        return this;
    }

    withName(value: string): Link {
        this.name = value;
        return this;
    }

    withUrl(value: string): Link {
        this.url = value;
        return this;
    }

    withInDownloads(value: boolean): Link {
        this.inDownloads = value;
        return this;
    }

    static createEmptyLink(): Link {
        return new Link();
    }
}
