/* eslint @typescript-eslint/no-explicit-any: 0 */

import i18n from "@/core/plugins/i18n";

export type I18nLabel = {[key: string]: string | undefined}

export class I18nLabelMaker {
    objectBuffer: I18nLabel[] = []
    constructor(
        public labelMap: Map<string,string>,
        public labelEnum: any,
    ) {
        this.objectBuffer = [];
    }

    generateLabels(): void {
        Object.values(this.labelEnum).map((element: any) => {
            const foo = {[`${element}`]: this.labelMap.get(element)};
            this.objectBuffer.push(foo);
        });
    }

    labels(): I18nLabel {
        this.generateLabels();
        return this.objectBuffer.reduce((acc, current) => ({
            ...acc, ...current
        }), {});
    }
}


const BASE = "common";
const TEXTS = `${BASE}.texts`;

enum CommonLabels {
    CLOSE = "close",
    AGREE = "agree",
    DISAGREE = "disagree"
}

export const commonsMap = new Map<string,string> ([
    [CommonLabels.CLOSE,`${i18n.t(`${TEXTS}.${CommonLabels.CLOSE}`)}`],
    [CommonLabels.AGREE,`${i18n.t(`${TEXTS}.${CommonLabels.AGREE}`)}`],
    [CommonLabels.DISAGREE,`${i18n.t(`${TEXTS}.${CommonLabels.DISAGREE}`)}`]
]);

export const commonLabels = new I18nLabelMaker(commonsMap, CommonLabels).labels();