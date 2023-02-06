export interface StepView {
    readonly stepCount: number;
    readonly header: string;
    readonly hasNext: boolean;
    readonly name?: string;
    readonly optionalTexts: string[];
    readonly tabs: TabView[];
}

export interface TabView {
    readonly header: string;
    readonly possibleSolutions: PossibleSolutionView[];
}

export interface PossibleSolutionView {
    readonly header: string;
    readonly text: string;
}

export class Step implements StepView {
    readonly hasNext: boolean;
    readonly header: string;
    readonly name?: string;
    readonly optionalTexts: string[];
    readonly stepCount: number;
    readonly tabs: TabView[];

    constructor(hasNext: boolean, header: string, optionalText: string[], stepCount: number, tabs: TabView[], name?: string) {
        this.header = header;
        this.hasNext = hasNext;
        this.name = name;
        this.optionalTexts = optionalText;
        this.stepCount = stepCount;
        this.tabs = tabs;
    }
}
