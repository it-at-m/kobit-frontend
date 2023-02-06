export const THE_MAIL_MODULE_NAME = "theMailStoreModule";
const GETTER_DISCLAIMER_MESSAGE = "GETTER_DISCLAIMER_MESSAGE";
const GETTER_DISCLAIMER_MESSAGE_MEDICAL_RECORD = "GETTER_DISCLAIMER_MESSAGE_MEDICAL_RECORD";

export interface TheMailStoreState {
    disclaimerMessage: string;
    disclaimerMessageMedicalRecord: string;
}

export const theMailStoreModule = {
    namespaced: true,
    state: {
        disclaimerMessage: `Sie haben mehr als eine Empfangsadresse ausgewählt.
          Wenn Sie eine Nachricht an mehrere Anlaufstellen versenden möchten, müssen Sie einer Schweigepflichtsentbindung zustimmen oder die Empfangsliste auf eine Anlaufstelle reduzieren.
          Mit der Schweigepflichtsentbindung, ermöglichen Sie den ausgewählten Anlaufstellen, sich untereinander zu vernetzen und auszutauschen.
          Die Schweigepflichtsentbindung dient dazu, um Ihr Anliegen schneller zu bearbeiten und ihnen besser und zielgerichteter zu helfen.
          Diese Schweigepflichtsentbindung gilt nur für dieses Anliegen und findet darüber hinaus keine Anwendung.`,
        disclaimerMessageMedicalRecord: `Bitte verzichten Sie im Freifeld auf die Eingabe von sehr persönlichen Details 
        zu sich selbst oder anderen Personen. Bitte beachten Sie ferner, dass durch das Absenden der Nachricht eine E-Mail generiert wird, die zwar verschlüsselt übertragen wird, dann aber unverschlüsselt auf einem städt. Mailserver verbleibt, 
        bis sie von dort gelöscht wird. Weitere Informationen finden Sie in den Datenschutzhinweisen.`
    } as TheMailStoreState,
    mutations: {},
    actions: {},
    getters: {
        [GETTER_DISCLAIMER_MESSAGE](state: TheMailStoreState): string {
            return state.disclaimerMessage;
        },
        [GETTER_DISCLAIMER_MESSAGE_MEDICAL_RECORD](state: TheMailStoreState): string {
            return state.disclaimerMessageMedicalRecord;
        }
    }
};

function toNamespaced(namespace: string): string {
    return `${THE_MAIL_MODULE_NAME}/${namespace}`;
}

export function getDisclaimerMessage(): string {
    return toNamespaced(GETTER_DISCLAIMER_MESSAGE);
}

export function getDisclaimerMessageMedicalRecord(): string {
    return toNamespaced(GETTER_DISCLAIMER_MESSAGE_MEDICAL_RECORD);
}