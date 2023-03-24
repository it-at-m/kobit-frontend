import i18n from "@/core/plugins/i18n";
import {I18nLabelMaker} from "@/core/core.translation";

const HEADLINE_PATH = "BaseHeadLine.admin.texts.headline"
const SUBTITLE_PATH = "BaseHeadLine.admin.texts.subtitle"

enum AdminHeadlineLabels {
    HEADLINE = "headline",
    SUBTITLE = "subtitle"
}

const adminBaseHeadline = new Map<string, string>( [
    [AdminHeadlineLabels.HEADLINE, `${i18n.t(`${HEADLINE_PATH}`)}`],
    [AdminHeadlineLabels.SUBTITLE, `${i18n.t(`${SUBTITLE_PATH}`)}`],
])

export const adminBaseHeadLineLabels = new I18nLabelMaker(adminBaseHeadline, AdminHeadlineLabels).labels();