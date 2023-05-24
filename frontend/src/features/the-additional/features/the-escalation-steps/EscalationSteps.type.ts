interface Steps {
    name?: string;
    description?: string;
    texts?: Array<string>;
    index?: number;
  }


export default class EscalationSteps {
    name?: string;
    description?: string;
    color?: string;    
    steps?: Array<Steps>;




    constructor(name: string | undefined, description: string | undefined, color: string | undefined, steps: Array<Steps> | undefined) {
        this.name = name;
        this.description = description;
        this.color = color;
        this.steps = steps;

        
    }


    withName(value: string): EscalationSteps {
        this.name = value;
        return this;
    }

    withDescription(value: string): EscalationSteps {
        this.description = value;
        return this;
    }

    withTexts(value: string): EscalationSteps {
        this.name = value;
        return this;
    }

    withColor(value: string): EscalationSteps {
        this.color = value;
        return this;
    }


    withSteps(value: Array<Steps>): EscalationSteps {
        this.steps = value;
        return this;
    }


    static createEmptyEscalationSteps(): EscalationSteps {
        return new EscalationSteps(undefined, undefined,undefined,undefined);
    }

}