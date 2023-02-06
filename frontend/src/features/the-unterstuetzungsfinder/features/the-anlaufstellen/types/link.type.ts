export interface LinkResponse {
    id?: string;
    name?: string | null;
    url?: string | null;
    inDownloads?: boolean | null;
}

export default class Link {
    id?: string;
    name?: string;
    url?: string;
    inDownloads?: boolean;

    constructor(id?: string, name?: string, url?: string, inDownloads?: boolean) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.inDownloads = inDownloads;
    }

    withId(value: string): Link {
        this.id = value;
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
