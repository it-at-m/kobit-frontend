<template>
  <v-container>
    <v-container v-if="!isActive">
      <MailSendOverview
        :email="email"
        :lables="labels"
        :need-to-send-mail="needToSendMail"
        :after-mail-send="afterMailSend"
      />
    </v-container>
    <v-container v-if="isActive">
      <v-row>
        <v-col>
          <v-tabs
            v-if="convo.contactPoints.length !== 0"
            vertical
            color="secondary"
          >
            <template v-for="anlaufstelle in convo.contactPoints">
              <v-tab
                :key="anlaufstelle.contact[0]?.contactPointId"
                class="pa-0"
              >
                {{ anlaufstelle.shortCut }}
              </v-tab>
              <v-tab-item :key="anlaufstelle.id">
                <v-card flat>
                  <v-card-title>{{ anlaufstelle.name }}</v-card-title>
                  <v-card-text>
                    <span v-html="anlaufstelle.description" />
                  </v-card-text>

                  <template v-for="contact in anlaufstelle.contact">
                    <v-card-actions
                      v-if="contact.email"
                      :key="contact.contactPointId"
                    >
                      <v-btn
                        text
                        color="secondary"
                        @click="addAddress(contact, anlaufstelle.shortCut)"
                      >
                        + {{ contact.email }}
                      </v-btn>
                    </v-card-actions>
                  </template>
                </v-card>
              </v-tab-item>
            </template>
          </v-tabs>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-alert
            v-if="isMoreThenOneRecipient"
            class="black--text"
            elevation="4"
            type="warning"
            color="orange"
          >
            {{ multiRecipientsDisclaimer }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-alert
            v-if="isPrivacyDisclaimerAlertActive"
            elevation="4"
            type="warning"
            color="orange"
            class="black--text"
          >
            <v-row>
              <v-col>
                {{ privacyDisclaimer }}
                <PrivacyPolicy />
              </v-col>
              <v-btn
                icon
                @click="closePrivacyDisclaimer"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-row>
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="12"
          lg="12"
          xl="6"
        >
          <v-combobox
            v-model="recipients"
            prepend-inner-icon="mdi-email"
            chips
            clearable
            deletable-chips
            multiple
            outlined
            height="56px"
            append-icon=""
            color="secondary"
            disable-lookup
            full-width
            :rules="[v => v.length !== 0 || 'An erforderlich.']"
            validate
            class="pa-0 ma-0"
            :label="labels.mailTo"
            @keydown="$event.target.blur()"
            @keypress="$event.target.blur()"
            @keyup="$event.target.blur()"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :items="selected"
                close
                @click="select"
                @click:close="unselect(item)"
              >
                {{ item.shortCut }}
              </v-chip>
            </template>
          </v-combobox>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="12"
          lg="12"
          xl="6"
        >
          <v-text-field
            v-model="email.subject"
            outlined
            prepend-inner-icon="mdi-email-edit"
            :label="labels.mailTopic"
            :rules="[v => !!v || 'Betreff erforderlich.']"
            validate
            color="secondary"
            @focus="showPrivacyDisclaimer"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="12"
          lg="12"
          xl="6"
        >
          <v-text-field
            :value="mailAddress.emailAddress"
            outlined
            prepend-inner-icon="mdi-email-outline"
            :label="labels.mailFrom"
            disabled
            color="secondary"
          />
        </v-col>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
            xl="6"
          >
            <v-alert
              dismissible
              class="black--text"
              type="info"
              color="orange"
            >
              {{ labels.textFieldAlert }}
            </v-alert>
            <v-textarea
              v-model="email.message"
              dense
              outlined
              prepend-inner-icon="mdi-text-box-multiple-outline"
              color="secondary"
              :label="labels.mailContent"
              :rules="[v => !!v || 'Inhalt erforderlich.']"
              validate
              @focus="showPrivacyDisclaimer"
            />
          </v-col>
        </v-row>
      </v-row>
      <v-row>
        <v-col
          offset-xl="6"
        >
          <v-checkbox
            v-if="isMoreThenOneRecipient"
            v-model="email.releasedFromConfidentiality"
            :label="labels.confidentiality"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          sm="12"
          md="2"
          lg="2"
          xl="2"
        >
          <v-btn
            color="secondary"
            text
            outlined
            :aria-label="finderLabel.restartFinder"
            @click="restart"
          >
            {{ finderLabel.restartFinder }}
          </v-btn>
        </v-col>
        <v-col
          sm="12"
          md="2"
          lg="2"
          xl="2"
          offset-md="1"
          offset-lg="1"
          offset-xl="1"
        >
          <v-btn
            class="justify-end"
            :disabled="recipients.length === 0 || !email.subject || !email.message"
            @click="sendMail({from: mailAddress.emailAddress, to: recipients.map(it => it.contact.email), ...email})"
          >
            {{ labels.mailSend }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">

import {computed, defineComponent, onMounted, ref} from "vue";
import DownloadPDF from "@/features/the-unterstuetzungsfinder/features/the-mail/components/download-pdf.vue";
import PrivacyPolicy from "@/core/services/downloads/privacypolicy.vue";
import Conversation from "@/features/the-unterstuetzungsfinder/types/conversation.type";
import {useGetMailAddress} from "@/features/the-unterstuetzungsfinder/features/the-mail/middleware/EmailService";
import Recipient from "@/features/the-unterstuetzungsfinder/features/the-mail/types/recipient.type";
import {
  DISCLAIMER_MESSAGE_MULTI_RECIPIENTS,
  DISCLAIMER_MESSAGE_PRIVACY
} from "@/features/the-unterstuetzungsfinder/features/the-mail/the-mail-constants";
import {theMailLabels} from "@/features/the-unterstuetzungsfinder/features/the-mail/the-mail.translation";
import {Email} from "@/features/the-unterstuetzungsfinder/features/the-mail/types/Email";
import {commonLabels} from "@/core/core.translation";
import {QuestionAndAnswer} from "@/features/the-unterstuetzungsfinder/types/QuestionAndAnswer";
import MailSendOverview from "@/features/the-unterstuetzungsfinder/features/the-mail/components/MailSendOverview.vue";
import {finderLabels} from "@/features/the-unterstuetzungsfinder/the-unterstuetzungsfinder.translation";
import {Contact} from "@/features/commons/types/ContactPoint";

export default defineComponent({
  name: "TheUnterstuetzungsfinderErgebnis",
  components: {MailSendOverview, PrivacyPolicy, DownloadPDF},
  props: {
    convo: {
      type: Object as () => Conversation
    },
    givenAnswers: {
      type: Array as () => QuestionAndAnswer[]
    },
    restart: {
      type: Function
    }
  },
  setup(props) {
    const isActive = ref(true);
    const isDialog = ref(false);
    const isPrivacyDisclaimerAlertActive = ref(false);
    const needToSendMail = ref(false)
    const recipients = ref<Recipient[]>([]);
    const isMoreThenOneRecipient = computed(() => recipients.value.length > 1);
    const multipleRecipientsDialog = ref(false);
    const email = ref<Email>({});

    const {isLoading, isError, data, error} = useGetMailAddress();

    onMounted(() => {
      let message = "Automatisch eingefügte Antworten des Unterstützungsfinders:\n";
      for (let i = 0; i < props.givenAnswers?.length; i++) {
        message = message + (i + 1 + ". Frage: " + props.givenAnswers[i].questionAnswered + " ");
        message = message + ("Ihre Antwort: " + props.givenAnswers[i].answerValue + "\n");
      }
      email.value = {message: message, ...email.value};
    });

    function addAddress(value: Contact, shortCut: string): void {
      if (recipients.value.find(it => it.contact.email === value.email)) {
        //do nothing because contact already added
      } else {
        recipients.value.push({contact: value, shortCut: shortCut});
      }
    }

    function showPrivacyDisclaimer() {
      isPrivacyDisclaimerAlertActive.value = true;
    }

    function closePrivacyDisclaimer() {
      isPrivacyDisclaimerAlertActive.value = false;
    }

    function unselect(itemNeedToRemove: Recipient): void {
      recipients.value = recipients.value.filter(it => it.shortCut !== itemNeedToRemove.shortCut);
    }

    function agree() {
      email.value = {releasedFromConfidentiality: true, ...email.value};
      multipleRecipientsDialog.value = false;
    }

    function disagree(): void {
      email.value = {releasedFromConfidentiality: true, ...email.value};
      multipleRecipientsDialog.value = false;
    }

    function sendMail(mail: Email) {
      if ((isMoreThenOneRecipient && mail.releasedFromConfidentiality) || recipients.value.length == 1) {
        email.value = mail;
        isActive.value = false;
        isDialog.value = false;
        needToSendMail.value = true;
      } else {
        isDialog.value = isMoreThenOneRecipient && !mail.releasedFromConfidentiality;
      }
    }

    function afterMailSend() {
      needToSendMail.value = false;
    }

    return {
      isLoading,
      isError,
      error,
      isActive,
      isDialog,
      isPrivacyDisclaimerAlertActive,
      recipients,
      mailAddress: data,
      isMoreThenOneRecipient,
      email,
      multipleRecipientsDialog,
      needToSendMail,
      showTextInfo: false,
      commonLabels: commonLabels,
      labels: theMailLabels,
      finderLabel: finderLabels,
      multiRecipientsDisclaimer: DISCLAIMER_MESSAGE_MULTI_RECIPIENTS,
      privacyDisclaimer: DISCLAIMER_MESSAGE_PRIVACY,
      afterMailSend,
      showPrivacyDisclaimer,
      closePrivacyDisclaimer,
      addAddress,
      disagree,
      agree,
      unselect,
      sendMail
    };
  }
});

</script>

<style scoped>

</style>