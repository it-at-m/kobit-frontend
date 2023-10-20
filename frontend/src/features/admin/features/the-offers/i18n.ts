import i18n from "@/core/plugins/i18n";
import {I18nLabelMaker} from "@/core/core.translation";

const ADMIN_OFFERS_PATH = "Admin.offers.texts"

enum AdminOffersLabels {
    ADD_NEW_TITLE="addNewTitle",
    ADD_NEW_DESCRIPTION = "addNewDescription",
    ADD_DEPARTMENT = "addDepartment",
    EDIT="edit",
    CANCEL="cancel",
    SAVE="save",
    ADD_CONTACT = "addContact",
    ADD_LINK = "addLink",
    ADD_FILE = "addFile",
    MARKDOWN_HINT = "markdownHint",
    ADD_DEPARTMENT_HINT = "addDepartmentHint"
}

const adminContactPoints = new Map<string, string>([
    [AdminOffersLabels.ADD_NEW_TITLE, `${i18n.t(`${ADMIN_OFFERS_PATH}.${AdminOffersLabels.ADD_NEW_TITLE}`)}`],
    [AdminOffersLabels.ADD_NEW_DESCRIPTION, `${i18n.t(`${ADMIN_OFFERS_PATH}.${AdminOffersLabels.ADD_NEW_DESCRIPTION}`)}`],
    [AdminOffersLabels.ADD_DEPARTMENT, `${i18n.t(`${ADMIN_OFFERS_PATH}.${AdminOffersLabels.ADD_DEPARTMENT}`)}`],
    [AdminOffersLabels.EDIT, `${i18n.t(`${ADMIN_OFFERS_PATH}.${AdminOffersLabels.EDIT}`)}`],
    [AdminOffersLabels.CANCEL, `${i18n.t(`${ADMIN_OFFERS_PATH}.${AdminOffersLabels.CANCEL}`)}`],
    [AdminOffersLabels.SAVE, `${i18n.t(`${ADMIN_OFFERS_PATH}.${AdminOffersLabels.SAVE}`)}`],
    [AdminOffersLabels.ADD_CONTACT, `${i18n.t(`${ADMIN_OFFERS_PATH}.${AdminOffersLabels.ADD_CONTACT}`)}`],
    [AdminOffersLabels.ADD_LINK, `${i18n.t(`${ADMIN_OFFERS_PATH}.${AdminOffersLabels.ADD_LINK}`)}`],
    [AdminOffersLabels.ADD_LINK, `${i18n.t(`${ADMIN_OFFERS_PATH}.${AdminOffersLabels.ADD_LINK}`)}`],
    [AdminOffersLabels.ADD_FILE, `${i18n.t(`${ADMIN_OFFERS_PATH}.${AdminOffersLabels.ADD_FILE}`)}`],
    [AdminOffersLabels.ADD_FILE, `${i18n.t(`${ADMIN_OFFERS_PATH}.${AdminOffersLabels.ADD_FILE}`)}`],
    [AdminOffersLabels.MARKDOWN_HINT, `${i18n.t(`${ADMIN_OFFERS_PATH}.${AdminOffersLabels.MARKDOWN_HINT}`)}`],
    [AdminOffersLabels.ADD_DEPARTMENT_HINT, `${i18n.t(`${ADMIN_OFFERS_PATH}.${AdminOffersLabels.ADD_DEPARTMENT_HINT}`)}`],
])

export const adminOfferLabels = new I18nLabelMaker(adminContactPoints, AdminOffersLabels).labels();