interface AlertObj {
    type?: string; 
    showColoredBoarder?: boolean;
    borderLocation?: string;
}

interface HeaderObj {
    title?: string; 
    text?: boolean;
    optional: {
        title?: string; 
        text?: boolean;
      };
}

interface OptionalOptionObj {
    text?: string;
    item?: undefined;
    alert?: {
      type?: string;
      showColoredBoarder?: boolean;
      borderLocation?: undefined;
    };
  }

export default class DvFair {

    name?: string;
    text?: string;
    information?: string;
    optionalOption?:  any;
    isActive?: boolean;
    header?:  Array<any>;
    alert?: any;


    constructor(name: string | undefined, text: string | undefined, information: string | undefined, optionalOption: OptionalOptionObj | undefined, isActive: boolean | undefined, alert: AlertObj | undefined, header: HeaderObj[]| undefined) {
        this.name = name;
        this.text = text;
        this.information = information;
        this.optionalOption = optionalOption;
        this.isActive = isActive;
        this.alert = alert;
        this.header = header;
    }

    withQuestion(value: string): DvFair {
        this.name = value;
        return this;
    }

    withAnswer(value: string): DvFair {
        this.text = value;
        return this;
    }

    withInformation(value: string): DvFair {
        this.information = value;
        return this;
    }

    withOptionalOption(value: OptionalOptionObj): DvFair {
        this.optionalOption = value;
        return this;
    }

    withIsActive(value: boolean): DvFair {
        this.isActive = value;
        return this;
    }

    withAlert(value: AlertObj): DvFair {
        this.alert = value;
        return this;
    }

    withHeader(value: HeaderObj[]): DvFair {
        this.header = value;
        return this;
    }

    static createEmptyDvFair(): DvFair {
        return new DvFair(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    }

}