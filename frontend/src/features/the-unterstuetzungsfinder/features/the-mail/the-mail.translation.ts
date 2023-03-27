import i18n from "@/core/plugins/i18n";
import { I18nLabelMaker} from "@/core/core.translation";

const BASE = "theUnterstuetzungsfinder.features.theMail";
const TEXTS = `${BASE}.texts`;


enum TheMailLabels {
    ADD_ADDRESS = "addAddress",
    TO = "mailTo",
    FROM = "mailFrom",
    TOPIC = "mailTopic",
    CONTENT = "mailContent",
    SEND = "mailSend",
    CONFIDENTIALITY = "confidentiality",
    MAIL_IS_SEND = "mailIsSend",
    MAIL_SEND_ERROR = "mailSendError",
    MAIL_SEND_SUCCESS = "mailSendSuccess",
    TEXT_FIELD_ALERT = "textFieldAlert"
}

export const thMailMap = new Map<string,string> ([
    [TheMailLabels.ADD_ADDRESS,`${i18n.t(`${TEXTS}.${TheMailLabels.ADD_ADDRESS}`)}`],
    [TheMailLabels.TO,`${i18n.t(`${TEXTS}.${TheMailLabels.TO}`)}`],
    [TheMailLabels.FROM,`${i18n.t(`${TEXTS}.${TheMailLabels.FROM}`)}`],
    [TheMailLabels.TOPIC,`${i18n.t(`${TEXTS}.${TheMailLabels.TOPIC}`)}`],
    [TheMailLabels.CONTENT,`${i18n.t(`${TEXTS}.${TheMailLabels.CONTENT}`)}`],
    [TheMailLabels.SEND,`${i18n.t(`${TEXTS}.${TheMailLabels.SEND}`)}`],
    [TheMailLabels.CONFIDENTIALITY,`${i18n.t(`${TEXTS}.${TheMailLabels.CONFIDENTIALITY}`)}`],
    [TheMailLabels.MAIL_IS_SEND, `${i18n.t(`${TEXTS}.${TheMailLabels.MAIL_IS_SEND}`)}`],
    [TheMailLabels.MAIL_SEND_ERROR, `${i18n.t(`${TEXTS}.${TheMailLabels.MAIL_SEND_ERROR}`)}`],
    [TheMailLabels.MAIL_SEND_SUCCESS, `${i18n.t(`${TEXTS}.${TheMailLabels.MAIL_SEND_SUCCESS}`)}`],
    [TheMailLabels.TEXT_FIELD_ALERT, `${i18n.t(`${TEXTS}.${TheMailLabels.TEXT_FIELD_ALERT}`)}`],

]);

export const theMailLabels = new I18nLabelMaker(thMailMap, TheMailLabels).labels();





