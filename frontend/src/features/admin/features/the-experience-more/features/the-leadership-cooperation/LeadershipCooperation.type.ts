export default class LeadershipCooperation {
    word?: string;
    link?: string;
    definition?: string;


    constructor(word: string | undefined, link: string | undefined, definition: string | undefined) {
        this.word = word;
        this.link = link;
        this.definition = definition;
    }

    withWord(value: string): LeadershipCooperation {
        this.word = value;
        return this;
    }

    withQuestion(value: string): LeadershipCooperation {
        this.definition = value;
        return this;
    }

    withLink(value: string): LeadershipCooperation {
        this.link = value;
        return this;
    }

    static createEmptyLeadershipCooperation(): LeadershipCooperation {
        return new LeadershipCooperation(undefined, undefined, undefined);
    }

}