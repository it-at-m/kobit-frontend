import i18n from "@/core/plugins/i18n";
import {I18nLabelMaker} from "@/core/core.translation";

const HEADLINE_PATH = "BaseHeadLine.main.texts.headline"
const SUBTITLE_PATH = "BaseHeadLine.main.texts.subtitle"

enum MainHeadlineLabels {
    HEADLINE = "headline",
    SUBTITLE = "subtitle"
}

const mainBaseHeadline = new Map<string, string>([
    [MainHeadlineLabels.HEADLINE, `${i18n.t(`${HEADLINE_PATH}`)}`],
    [MainHeadlineLabels.SUBTITLE, `${i18n.t(`${SUBTITLE_PATH}`)}`],
])

export const mainBaseHeadLineLabels = new I18nLabelMaker(mainBaseHeadline, MainHeadlineLabels).labels();