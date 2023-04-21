import i18n from "@/core/plugins/i18n";
import {I18nLabelMaker} from "@/core/core.translation";

const ADMIN_CONTACT_POINTS_PATH = "Admin.contactPoints.texts"
const ADMIN_MARKDOWN_PATH = "Admin"

enum AdminContactPointsLabels {
    ADD_NEW_TITLE="addNewTitle",
    ADD_NEW_DESCRIPTION = "addNewDescription",
    EDIT="edit",
    CANCEL="cancel",
    SAVE="save",
    ADD_CONTACT = "addContact",
    ADD_LINK = "addLink",
    ADD_FILE = "addFile",
    MARKDOWN_HINT = "markdownHint"
}

const adminContactPoints = new Map<string, string>([
    [AdminContactPointsLabels.ADD_NEW_TITLE, `${i18n.t(`${ADMIN_CONTACT_POINTS_PATH}.${AdminContactPointsLabels.ADD_NEW_TITLE}`)}`],
    [AdminContactPointsLabels.ADD_NEW_DESCRIPTION, `${i18n.t(`${ADMIN_CONTACT_POINTS_PATH}.${AdminContactPointsLabels.ADD_NEW_DESCRIPTION}`)}`],
    [AdminContactPointsLabels.EDIT, `${i18n.t(`${ADMIN_CONTACT_POINTS_PATH}.${AdminContactPointsLabels.EDIT}`)}`],
    [AdminContactPointsLabels.CANCEL, `${i18n.t(`${ADMIN_CONTACT_POINTS_PATH}.${AdminContactPointsLabels.CANCEL}`)}`],
    [AdminContactPointsLabels.SAVE, `${i18n.t(`${ADMIN_CONTACT_POINTS_PATH}.${AdminContactPointsLabels.SAVE}`)}`],
    [AdminContactPointsLabels.ADD_CONTACT, `${i18n.t(`${ADMIN_CONTACT_POINTS_PATH}.${AdminContactPointsLabels.ADD_CONTACT}`)}`],
    [AdminContactPointsLabels.ADD_LINK, `${i18n.t(`${ADMIN_CONTACT_POINTS_PATH}.${AdminContactPointsLabels.ADD_LINK}`)}`],
    [AdminContactPointsLabels.ADD_LINK, `${i18n.t(`${ADMIN_CONTACT_POINTS_PATH}.${AdminContactPointsLabels.ADD_LINK}`)}`],
    [AdminContactPointsLabels.ADD_FILE, `${i18n.t(`${ADMIN_CONTACT_POINTS_PATH}.${AdminContactPointsLabels.ADD_FILE}`)}`],
    [AdminContactPointsLabels.ADD_FILE, `${i18n.t(`${ADMIN_CONTACT_POINTS_PATH}.${AdminContactPointsLabels.ADD_FILE}`)}`],
    [AdminContactPointsLabels.MARKDOWN_HINT, `${i18n.t(`${ADMIN_MARKDOWN_PATH}.${AdminContactPointsLabels.MARKDOWN_HINT}`)}`],
])

export const adminContactPointLabels = new I18nLabelMaker(adminContactPoints, AdminContactPointsLabels).labels();