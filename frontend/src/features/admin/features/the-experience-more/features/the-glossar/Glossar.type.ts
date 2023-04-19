export default class Glossar {
    word?: string;
    definition?: string;


    constructor(word: string | undefined, definition: string | undefined) {
        this.word = word;
        this.definition = definition;
    }

    withWord(value: string): Glossar {
        this.word = value;
        return this;
    }

    withQuestion(value: string): Glossar {
        this.definition = value;
        return this;
    }

    static createEmptyGlossar(): Glossar {
        return new Glossar(undefined, undefined);
    }

}