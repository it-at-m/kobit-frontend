import i18n from "@/core/plugins/i18n";
import {I18nLabelMaker} from "@/core/core.translation";

const HEADLINE_PATH = "BaseHeadLine.admin.texts.headline";
const SUBTITLE_PATH = "BaseHeadLine.admin.texts.subtitle";

enum AdminHeadlineLabels {
    HEADLINE = "headline",
    SUBTITLE = "subtitle"
}


const adminBaseHeadline = new Map<string, string>( [
    [AdminHeadlineLabels.HEADLINE, `${i18n.t(`${HEADLINE_PATH}`)}`],
    [AdminHeadlineLabels.SUBTITLE, `${i18n.t(`${SUBTITLE_PATH}`)}`],
]);

export const adminBaseHeadLineLabels = new I18nLabelMaker(adminBaseHeadline, AdminHeadlineLabels).labels();

const CENTRAL_ADMIN_PATH = "Admin.information.texts.centralAdmin"
const DEPARTMENT_ADMIN_PATH = "Admin.information.texts.departmentAdmin"
const DEPARTMENT_PATH = "Admin.information.texts.department"
const NO_ADMIN_PATH = "Admin.information.texts.noAdmin"
const INFORMATION_TITLE_PATH = "Admin.information.texts.informationTitle"

enum AdminInformationLabels {
    CENTRAL_ADMIN = "centralAdmin",
    DEPARTMENT_ADMIN = "departmentAdmin",
    DEPARTMENT = "department",
    NO_ADMIN = "noAdmin",
    INFORMATION_TITLE = "informationTitle"
}

const adminInformation = new Map<string, string>([
    [AdminInformationLabels.CENTRAL_ADMIN, `${i18n.t(`${CENTRAL_ADMIN_PATH}`)}`],
    [AdminInformationLabels.DEPARTMENT_ADMIN, `${i18n.t(`${DEPARTMENT_ADMIN_PATH}`)}`],
    [AdminInformationLabels.DEPARTMENT, `${i18n.t(`${DEPARTMENT_PATH}`)}`],
    [AdminInformationLabels.NO_ADMIN, `${i18n.t(`${NO_ADMIN_PATH}`)}`],
    [AdminInformationLabels.INFORMATION_TITLE, `${i18n.t(`${INFORMATION_TITLE_PATH}`)}`],
]);

export const adminInformationLabels = new I18nLabelMaker(adminInformation, AdminInformationLabels).labels();
