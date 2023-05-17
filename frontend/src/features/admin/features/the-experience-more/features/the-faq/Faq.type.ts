export default class Faq {
    question?: string;
    answer?: string;

    constructor(question: string | undefined, answer: string | undefined) {
        this.question = question;
        this.answer = answer;
    }

    withQuestion(value: string): Faq {
        this.question = value;
        return this;
    }

    withAnswer(value: string): Faq {
        this.answer = value;
        return this;
    }

    static createEmptyFaq(): Faq {
        return new Faq(undefined, undefined);
    }

}