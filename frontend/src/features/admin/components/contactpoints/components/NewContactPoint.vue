<template>
  <v-container fluid>
    <ErrorHandler
      :is-error="isWriteError"
      message="Fehler"
      @closeError="closeError"
    />
    <v-card
      flat
      :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 'border-top:1px solid #eee;' : ''"
      class="ma-0 pa-0"
    >
      <v-card-title class="pa-0">
        Neue Anlaufstelle Anlegen <span class="mdi mdi-file-document  ml-auto" />
      </v-card-title>
      <v-card-content>
        <v-form>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
            >
              <v-text-field
                :value="newContactPoint?.name"
                label="Name der Anlaufstelle"
                @input="changeName"
              />
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
            >
              <v-text-field
                :value="newContactPoint?.shortCut"
                label="Kurzbezeichnung der Anlaufstelle"
                @input="changeShortCut"
              />
            </v-col>
          </v-row>
          <v-divider class="mt-3 mb-5" />
          <MarkDownAlert :label="label" />
          <v-row class="ma-0 pa-0">
            <v-col cols="6">
              <v-textarea
                :value="newContactPoint?.description"
                label="Beschreibung"
                @input="changeDescription"
              />
            </v-col>
            <v-col cols="6">
              <div
                style="border-bottom: 2px solid #eee"
                v-html="computeMarkdown"
              />
            </v-col>
          </v-row>
          <v-divider class="mt-3 mb-5" />
          <v-row>
            <v-col
              cols="12"
              class="mb-0 pb-0"
            >
              <h3 class="pa-0">
                Kontakte
              </h3>
            </v-col>
          </v-row>
          <v-row
            v-for="contact in newContactPoint?.contact"
            :key="contact.id"
          >
            <v-col
              lg="10"
              md="10"
              sm="10"
              cols="8"
              class="mb-0 pb-0"
            >
              <v-text-field
                v-model="contact.email"
                label="E-Mail"
                readonly
              />
            </v-col>
            <v-col
              lg="2"
              md="2"
              sm="2"
              cols="4"
              class="mb-0 pb-0"
            >
              <v-btn @click="removeContact(contact)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                depressed
                color="secondary"
                class="ml-4 buttonText--text"
                @click="openContactDialog"
              >
                + {{ label.addContact }}
              </v-btn>
            </v-col>
            <v-col cols="12">
              <AddContactDialog
                :is-dialog-active="isContactDialogOpen"
                @cancel="cancel"
                @addNewContact="addNewContact"
              />
            </v-col>
          </v-row>
          <v-divider class="mt-3 mb-5" />

          <v-row>
            <v-col
              cols="12"
              class="mb-0 pb-0"
            >
              <h3 class="pa-0">
                Links
              </h3>
            </v-col>
          </v-row>
          <v-row
            v-for="link in newContactPoint?.links"
            :key="link.id"
          >
            <v-col
              lg="5"
              md="5"
              sm="5"
              cols="4"
            >
              <v-text-field
                v-model="link.name"
                label="Titel"
                readonly
              />
            </v-col>
            <v-col
              lg="5"
              md="5"
              sm="5"
              cols="4"
            >
              <v-text-field
                v-model="link.url"
                label="URL"
                readonly
              />
            </v-col>
            <v-col
              lg="2"
              md="2"
              sm="2"
              cols="4"
            >
              <v-btn @click="removeLink(link)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                depressed
                color="secondary"
                class="ml-4 buttonText--text"
                @click="openLinkDialog"
              >
                + {{ label.addLink }}
              </v-btn>
            </v-col>
            <v-col cols="12">
              <AddLinkDialog
                :is-dialog-active="isLinkDialogOpen"
                @cancel="cancel"
                @addNewLink="addNewLink"
              />
            </v-col>
          </v-row>
          <v-divider class="mt-3 mb-5" />
          <v-row>
            <v-col cols="12">
              <p>
                Hinweis: Kompetenzen können nur über den Unterstützungsfinder eingepflegt werden.
              </p>
            </v-col>
          </v-row>
          <v-divider class="mt-3 mb-5" />
        </v-form>
      </v-card-content>
      <v-card-actions class="ma-0 pa-0">
        <SaveNewButton
          :contact-point-to-save="newContactPoint"
          @error="error"
        />
        <v-btn
          class="ma-2"
          color="error"
          @click="$emit('cancel')"
        >
          Abbruch
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { I18nLabel } from "@/core/core.translation";
import ErrorHandler from "@/features/commons/components/ErrorHandler.vue";
import { Contact, ContactPoint, Link } from "@/features/commons/types/ContactPoint";
import MarkDownAlert from "@/features/admin/components/contactpoints/components/MarkDownAlert.vue";
import { marked } from "marked";
import AddContactDialog from "@/features/admin/components/contactpoints/components/AddContactDialog.vue";
import AddLinkDialog from "@/features/admin/components/contactpoints/components/AddLinkDialog.vue";
import SaveNewButton from "@/features/admin/components/contactpoints/components/SaveNewButton.vue";
import { useRouter } from "vue-router/composables";

export default defineComponent({
  name: "NewContactPoint",
  components: { SaveNewButton, AddLinkDialog, AddContactDialog, MarkDownAlert, ErrorHandler },
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
        newContactPoint.value = { ...newContactPoint.value, contact: [value] } as ContactPoint;
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
        newContactPoint.value = { ...newContactPoint.value, links: [value] } as ContactPoint;
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
      newContactPoint.value = { ...newContactPoint.value, name: value } as ContactPoint;
    }

    const changeShortCut = (value: string) => {
      newContactPoint.value = { ...newContactPoint.value, shortCut: value } as ContactPoint;
    }

    const changeDescription = (value: string) => {
      newContactPoint.value = { ...newContactPoint.value, description: value } as ContactPoint;
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