<template>
  <v-container>
    <v-container v-if="!isActive">
      <v-row>
        <v-col>
          <p>Ihre Mail wurde erfolgreich versendet! Bitte starten Sie ein neues Verfahren mit den Button!!</p>
        </v-col>
      </v-row>
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
                :key="anlaufstelle.contact.contactPointId"
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
                      v-if="isEmailEmpty(contact)"
                      :key="contact.contactPointId"
                    >
                      <v-btn
                        text
                        color="secondary"
                        @click="addAddress(contact, anlaufstelle.shortCut)"
                      >
                        <!-- {{ labels.addAddress }} -->
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
            elevation="4"
            type="warning"
          >
            {{ disclaimerMessage }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-alert
            v-if="isMedicalRecordAlertActive || isMedicalInputDirty"
            elevation="4"
            type="warning"
          >
            <v-row>
              <v-col>
                {{ disclaimerMessageMedicalRecord }}
                <PrivacyPolicy />
              </v-col>
              <v-btn
                icon
                @click="closeMedicalRecordAlert()"
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
            :rules="[v => v.length != 0 || 'An erforderlich.']"
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
            v-model="mail.subject"
            outlined
            prepend-inner-icon="mdi-email-edit"
            :label="labels.mailTopic"
            :rules="[v => !!v || 'Betreff erforderlich.']"
            validate
            color="secondary"
            @focus="showMedicalRecordAlert()"
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
            :value="mailUser.emailAddress"
            outlined
            prepend-inner-icon="mdi-email-outline" 
            :label="labels.mailFrom"
            disabled
            color="secondary"
          />
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="12"
          lg="12"
          xl="6"
        >
          <v-textarea
            v-model="mail.message"
            dense
            outlined
            prepend-inner-icon="mdi-text-box-multiple-outline"
            color="secondary"
            :label="labels.mailContent"
            :rules="[v => !!v || 'Inhalt erforderlich.']"
            validate
            @focus="showMedicalRecordAlert()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="12"
          lg="6"
          xl="6"
        >
          <v-checkbox
            v-if="isMoreThenOneRecipient"
            v-model="mail.releasedFromConfidentiality"
            :label="labels.confidentiality"
          />
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="12"
          lg="6"
          xl="6"
        >
          <v-btn
            class="justify-end"
            :disabled="recipients.length === 0 || !mail.subject || !mail.message"
            @click="sendMail()"
          >
            {{ labels.mailSend }}
          </v-btn>
          <v-dialog
            :value="dialog"
            persistent
            width="500"
          >
            <v-card>
              <v-card-title />
              <v-card-text>
                {{ disclaimerMessage }}
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="red"
                  text
                  @click="disagree()"
                >
                  {{ commonLabels.disagree }}
                </v-btn>
                <v-btn
                  color="green"
                  text
                  @click="agree()"
                >
                  {{ commonLabels.agree }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import {Component, Inject, Vue} from "vue-property-decorator";
import BaseTextField
  from "@/features/the-unterstuetzungsfinder/features/the-mail/base-text-field.vue";
import {DOWNLOAD_DATENSCHUTZ, DownloadProviderService} from "@/core/services/downloads/download-provider.service";
import BaseHeadLine from "@/features/the-unterstuetzungsfinder/components/base-head-line.vue";
import {
  getDisclaimerMessage,
  getDisclaimerMessageMedicalRecord
} from "@/features/the-unterstuetzungsfinder/features/the-mail/the-mail-store.module";

import MailService from "@/features/the-unterstuetzungsfinder/features/the-mail/api/the-mail-service.api";

import {getConvo} from "@/features/the-unterstuetzungsfinder/the-unterstuezungsfinder-store.module";

import {getMailUser} from "@/features/the-unterstuetzungsfinder/features/the-mail/the-mail-user-store.module";


import {theMailLabels} from "@/features/the-unterstuetzungsfinder/features/the-mail/the-mail.translation";
import {commonLabels} from "@/core/core.translation";
import Mail from "@/features/the-unterstuetzungsfinder/features/the-mail/types/mail.type";

import MailUser from "@/features/the-unterstuetzungsfinder/features/the-mail/types/mail-user.type";
import Conversation from "../../types/conversation.type";
import Contact from "../the-anlaufstellen/types/contact.type";
import Recipient from "@/features/the-unterstuetzungsfinder/features/the-mail/types/recipient.type";
import PrivacyPolicy from "@/core/services/downloads/privacypolicy.vue";


@Component({
  components: {PrivacyPolicy, BaseHeadLine, BaseTextField}
})
export default class TheUnterstuetzungsfinderErgebnis extends Vue {


  @Inject(DOWNLOAD_DATENSCHUTZ)
  download!: DownloadProviderService;

  isActive = true;

  labels = theMailLabels;
  commonLabels = commonLabels;

  dialog = false;
  recipients: Recipient[] = [];

  isMedicalRecordAlertActive = false
  isMedicalInputDirty = false;

  mail = Mail.createEmptyMail();
  signature = "[LDAP-NAME]";


  get mailUser(): MailUser {
    return this.$store.getters[getMailUser()];
  }


  get convo(): Conversation {
    return this.$store.getters[getConvo()];
  }

  get disclaimerMessage(): string {
    return this.$store.getters[getDisclaimerMessage()];
  }

  get disclaimerMessageMedicalRecord(): string {
    return this.$store.getters[getDisclaimerMessageMedicalRecord()];
  }

  get isMoreThenOneRecipient(): boolean {
    return this.recipients.length > 1;
  }

  unselect(itemNeedToRemove: Recipient): void {
        for (let i = 0; i < this.recipients.length; i += 1) {
          if (this.recipients[parseInt(i.toString(), 10)] === itemNeedToRemove) {
            this.recipients.splice(i, 1);
          }

        }
      }

  agree(): void {
    this.mail.releasedFromConfidentiality = true;
    this.dialog = false;
  }

  disagree(): void {
    this.mail.releasedFromConfidentiality = false;
    this.dialog = false;
  }

  addAddress(value: Contact, shortCut: string): void {

    const isNotExisting = !this.recipients.find(element => element.contact?.email === value.email );
    
    if (isNotExisting) {

      const recipient = Recipient.createEmptyRecipient().withContact(value).withshortCut(shortCut);

      this.recipients.push(recipient);

    }
  
  }

  isEmailEmpty(value: Contact): boolean {
    return !!value.email || value.email !== "";
  }

  sendMail(): void {

    if((this.isMoreThenOneRecipient && this.mail.releasedFromConfidentiality) || (this.recipients.length === 1)){

      this.isActive = false;
      this.dialog = false;

      this.mail.pushAnlaufstellenMailToRecipients(this.recipients);
      this.mail.from = this.mailUser.emailAddress;

      MailService.postMail(JSON.parse(JSON.stringify(this.mail)));


    } else if (this.isMoreThenOneRecipient && !this.mail.releasedFromConfidentiality) {

      this.dialog = true;

    } else {

      this.dialog = false;

    }

  }

  showMedicalRecordAlert(): void {
    this.isMedicalRecordAlertActive = true;
    this.isMedicalInputDirty = true;
  }

  closeMedicalRecordAlert(): void {
    this.isMedicalRecordAlertActive = false;
    this.isMedicalInputDirty = false;
  }


}
</script>

<style scoped>

</style>