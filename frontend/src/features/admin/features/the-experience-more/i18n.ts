import i18n from "@/core/plugins/i18n";
import {I18nLabelMaker} from "@/core/core.translation";

const ADMIN_CONTENT_ITEMS_PATH = "Admin.contentItems.texts"
const ADMIN_MARKDOWN_PATH = "Admin"

enum AdminContentItemsLabels {
    ADD_NEW_DESCRIPTION = "addNewDescription",
    EDIT="edit",
    CANCEL="cancel",
    SAVE="save",
    MARKDOWN_HINT = "markdownHint"
}

const adminContentItems = new Map<string, string>([
    [AdminContentItemsLabels.ADD_NEW_DESCRIPTION, `${i18n.t(`${ADMIN_CONTENT_ITEMS_PATH}.${AdminContentItemsLabels.ADD_NEW_DESCRIPTION}`)}`],
    [AdminContentItemsLabels.EDIT, `${i18n.t(`${ADMIN_CONTENT_ITEMS_PATH}.${AdminContentItemsLabels.EDIT}`)}`],
    [AdminContentItemsLabels.CANCEL, `${i18n.t(`${ADMIN_CONTENT_ITEMS_PATH}.${AdminContentItemsLabels.CANCEL}`)}`],
    [AdminContentItemsLabels.SAVE, `${i18n.t(`${ADMIN_CONTENT_ITEMS_PATH}.${AdminContentItemsLabels.SAVE}`)}`],
    [AdminContentItemsLabels.MARKDOWN_HINT, `${i18n.t(`${ADMIN_MARKDOWN_PATH}.${AdminContentItemsLabels.MARKDOWN_HINT}`)}`],
])

export const adminContentItemLabels = new I18nLabelMaker(adminContentItems, AdminContentItemsLabels).labels();