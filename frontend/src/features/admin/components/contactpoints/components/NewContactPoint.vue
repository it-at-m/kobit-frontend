<template>
  <v-container fluid>
    <ErrorHandler :is-error="isWriteError" message="Fehler" @closeError="closeError"/>
    <v-card
      flat
      :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm? 'border-top:1px solid #eee;' : ''"
      style="overflow-y: scroll"
      >
      <v-card-title> Neue Anlaufstelle Anlegen</v-card-title>
      <v-form>
        <v-row>
          <v-col
              cols="12"
              md="4"
              sm="12"
          >
            <v-text-field
                :value="newContactPoint?.name"
                @input="changeName"
            />
          </v-col>
          <v-col
              cols="12"
              md="4"
              sm="12"
          >
            <v-text-field
                :value="newContactPoint?.shortCut"
                @input="changeShortCut"
                label="Kurzbezeichnung der Anlaufstelle"
            />
          </v-col>
        </v-row>
        <v-divider class="mt-3 mb-5"/>
        <MarkDownAlert :label="label"/>
        <v-row>
          <v-col>
            <v-textarea
                :value="newContactPoint?.description"
                @input="changeDescription"
                label="Beschreibung"
            />
          </v-col>
          <v-col>
            <div v-html="computeMarkdown"/>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-card-title>
          Kontakte
        </v-card-title>
        <v-row
            v-for="contact in newContactPoint?.contact"
            :key="contact.id">
          <v-col
              cols="12"
              xl="6"
              lg="12">
            <v-text-field
                label="E-Mail"
                v-model="contact.email"
                readonly
            />
          </v-col>
          <v-col>
            <v-btn
                @click="removeContact(contact)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-btn
              depressed
              color="secondary"
              class="ml-4 black--text"
              @click="openContactDialog">
            {{ label.addContact }}
          </v-btn>
          <AddContactDialog
              :is-dialog-active="isContactDialogOpen"
              @cancel="cancel"
              @addNewContact="addNewContact"/>
        </v-row>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-card-title>
          Links
        </v-card-title>
        <div
            v-for="link in newContactPoint?.links"
            :key="link.id">
          <v-row>
            <v-col
                cols="5"
            >
              <v-text-field
                  label="Titel"
                  v-model="link.name"
                  readonly
              />
            </v-col>
            <v-col
                cols="5">
              <v-text-field
                  label="URL"
                  v-model="link.url"
                  readonly
              />
            </v-col>
            <v-col>
              <v-btn
                  @click="removeLink(link)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <v-row>
          <v-btn
              depressed
              color="secondary"
              class="ml-4 black--text"
              @click="openLinkDialog">
            {{ label.addLink }}
          </v-btn>
          <AddLinkDialog
              :is-dialog-active="isLinkDialogOpen"
              @cancel="cancel"
              @addNewLink="addNewLink"
          />
        </v-row>
      </v-form>
      <v-spacer></v-spacer>
      <hr />
      <v-spacer></v-spacer>
      <v-card-title>
        Kompetenzen
      </v-card-title>
      <v-card-subtitle>
        Kompetenzen können nur über den Unterstützungsfinder eingepflegt werden.
      </v-card-subtitle>
      <SaveNewButton
          :contact-point-to-save="newContactPoint"
          @error="error"
      />
      <v-btn
          class="ma-2"
          color="error"
          @click="$emit('cancel')">
        Abbruch
      </v-btn>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {I18nLabel} from "@/core/core.translation";
import ErrorHandler from "@/features/commons/components/ErrorHandler.vue";
import {Contact, ContactPoint, Link} from "@/features/commons/types/ContactPoint";
import MarkDownAlert from "@/features/admin/components/contactpoints/components/MarkDownAlert.vue";
import {marked} from "marked";
import AddContactDialog from "@/features/admin/components/contactpoints/components/AddContactDialog.vue";
import AddLinkDialog from "@/features/admin/components/contactpoints/components/AddLinkDialog.vue";
import SaveNewButton from "@/features/admin/components/contactpoints/components/SaveNewButton.vue";
import {useRouter} from "vue-router/composables";

export default defineComponent({
  name: "NewContactPoint",
      components: {SaveNewButton, AddLinkDialog, AddContactDialog, MarkDownAlert, ErrorHandler},
  props: {
    label: {
      type: Object as () => I18nLabel
    }
  },
  setup() {
    const newContactPoint = ref<ContactPoint>();
    const isContactDialogOpen = ref(false);
    const isLinkDialogOpen = ref(false);
    const isWriteError = ref(false);
    const router = useRouter();

    const computeMarkdown = computed(() => marked.parse(newContactPoint.value?.description || ""));

    const addNewContact = (value: Contact) => {
      if (newContactPoint.value?.contact) {
        newContactPoint.value.contact.push(value);
      } else {
        newContactPoint.value = {...newContactPoint.value, contact: [value]} as ContactPoint;
      }
      isContactDialogOpen.value = false;
    }

    function removeContact(contact: Contact) {
      if (newContactPoint.value?.contact) {
        newContactPoint.value.contact = newContactPoint.value.contact.filter(it => it !== contact);
      }
    }

    const openContactDialog = () => {
      isContactDialogOpen.value = true;
    }

    const addNewLink = (value: Link) => {
      if (newContactPoint.value?.links) {
        newContactPoint.value.links.push(value);
      } else {
        newContactPoint.value = {...newContactPoint.value, links: [value]} as ContactPoint;
      }
      isLinkDialogOpen.value = false;
    }

    function removeLink(item: Link) {
      if (newContactPoint.value?.links) {
        newContactPoint.value.links = newContactPoint.value.links.filter(it => it !== item);
      }
    }

    const openLinkDialog = () => {
      isLinkDialogOpen.value = true;
    }

    const changeName = (value: string) => {
      newContactPoint.value = {...newContactPoint.value, name: value} as ContactPoint;
    }

    const changeShortCut = (value: string) => {
      newContactPoint.value = {...newContactPoint.value, shortCut:value} as ContactPoint;
    }

    const changeDescription = (value: string) => {
      newContactPoint.value = {...newContactPoint.value, description:value} as ContactPoint;
    }

    const cancel = () => {
      isLinkDialogOpen.value = false;
      isContactDialogOpen.value = false;
    }

    const error = () => {
      isWriteError.value = true;
    }

    const closeError = () => {
      isWriteError.value = false;
      router.go(0);
    }

    return {
      newContactPoint,
      computeMarkdown,
      isContactDialogOpen,
      isLinkDialogOpen,
      isWriteError,
      changeName,
      changeShortCut,
      changeDescription,
      openContactDialog,
      addNewContact,
      removeContact,
      openLinkDialog,
      addNewLink,
      removeLink,
      cancel,
      error,
      closeError,

    }
  }
}
)</script>

<style scoped>

</style>