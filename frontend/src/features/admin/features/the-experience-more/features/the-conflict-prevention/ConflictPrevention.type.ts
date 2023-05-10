export default class ConflictPrevention {
    word?: string;
    link?: string;
    definition?: string;

    //word und link werden nicht genutzt! in definition wird einfach alles mit stichpunkten eingetragen!
    //TODO ordentliches Model finden und umsetzen!


    constructor(word: string | undefined, link: string | undefined, definition: string | undefined) {
        this.word = word;
        this.link = link;
        this.definition = definition;
    }

    withWord(value: string): ConflictPrevention {
        this.word = value;
        return this;
    }

    withQuestion(value: string): ConflictPrevention {
        this.definition = value;
        return this;
    }

    withLink(value: string): ConflictPrevention {
        this.link = value;
        return this;
    }

    static createEmptyConflictPrevention(): ConflictPrevention {
        return new ConflictPrevention(undefined, undefined, undefined);
    }

}