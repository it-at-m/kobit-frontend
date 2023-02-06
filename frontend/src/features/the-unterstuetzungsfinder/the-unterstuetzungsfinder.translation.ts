import i18n from "@/core/plugins/i18n";
import { I18nLabelMaker} from "@/core/core.translation";

const BASE = "theUnterstuetzungsfinder";
const TEXTS = `${BASE}.texts`;
const BANNER = `${BASE}.bannerAboveQuestions`;

enum FinderLabels {
    NO_RESULTS = "noResults",
    RESTART = "restartFinder",
    POINT_OF_CONTACTS = "pointOfContacts",
    ANSWERS = "answers",
    BANNER_TEXT = "text",
    BANNER_CLOSE = "close"
}

export const finderMap = new Map<string,string> ([
    [FinderLabels.NO_RESULTS,`${i18n.t(`${TEXTS}.${FinderLabels.NO_RESULTS}`)}`],
    [FinderLabels.RESTART,`${i18n.t(`${TEXTS}.${FinderLabels.RESTART}`)}`],
    [FinderLabels.POINT_OF_CONTACTS,`${i18n.t(`${TEXTS}.${FinderLabels.POINT_OF_CONTACTS}`)}`],
    [FinderLabels.ANSWERS,`${i18n.t(`${TEXTS}.${FinderLabels.ANSWERS}`)}`],
    [FinderLabels.BANNER_TEXT,`${i18n.t(`${BANNER}.${FinderLabels.BANNER_TEXT}`)}`],
    [FinderLabels.BANNER_CLOSE,`${i18n.t(`${BANNER}.${FinderLabels.BANNER_CLOSE}`)}`],
]);

export const finderLabels = new I18nLabelMaker(finderMap, FinderLabels).labels();





