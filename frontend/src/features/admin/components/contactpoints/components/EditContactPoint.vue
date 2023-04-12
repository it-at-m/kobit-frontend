<template>
  <v-container fluid>
    <LoadingSpinner :is-loading="isLoading" />
    <ErrorHandler :is-error="isWriteError || isReadError" :message="errorMessage" @closeError="closeError" />
    <v-card flat :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 'border-top:1px solid #eee;' : ''"
      class="ma-0 pa-0">
      <v-card-title class="pa-0">Anlaufstelle - Bearbeiten <span class="mdi mdi-pencil  ml-auto"></span></v-card-title>
      <v-card-content>
        <div v-if="!isLoading && writableContactPoint">
          <v-form>
            <v-row>
              <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field :value="writableContactPoint.name" @input="changeName" label="Name der Anlaufstelle" />
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field :value="writableContactPoint.shortCut" @input="changeShortCut"
                  label="Kurzbezeichnung der Anlaufstelle" />
              </v-col>
            </v-row>
            <v-divider class="mt-3 mb-5" />
            <MarkDownAlert :label="label" />
            <v-row class="ma-0 pa-0">
              <v-col cols="6">
                <v-textarea :value="writableContactPoint.description" @input="changeDescription" label="Beschreibung" />
              </v-col>
              <v-col cols="6">
                <div v-html="computeMarkdown" style="border-bottom: 2px solid #eee" />
              </v-col>
            </v-row>
            <v-divider class="mt-3 mb-5" />
            <v-row>
              <v-col cols="12" class="mb-0 pb-0">
                <h3 class="pa-0">
                  Kontakte
                </h3>
              </v-col>
            </v-row>
            <v-row v-for="contact in writableContactPoint.contact" :key="contact.id">
              <v-col lg="10" md="10" sm="10" cols="8" class="mb-0 pb-0">
                <v-text-field label="E-Mail" v-model="contact.email" readonly />
              </v-col>
              <v-col lg="2" md="2" sm="2" cols="4" class="mb-0 pb-0">
                <v-btn @click="removeContact(contact)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn depressed color="secondary" class="buttonText--text" @click="openContactDialog">
                  + {{ label.addContact }}
                </v-btn>
              </v-col>
              <v-col cols="12">
                <AddContactDialog :is-dialog-active="isContactDialogOpen" @cancel="cancel"
                  @addNewContact="addNewContact" />
              </v-col>
            </v-row>
            <v-divider class="mt-3 mb-5" />
            <v-row>
              <v-col cols="12" class="mb-0 pb-0">
                <h3 class="pa-0">
                  Links
                </h3>
              </v-col>
            </v-row>
            <v-row v-for="link in writableContactPoint.links" :key="link.id">
              <v-col lg="5" md="5" sm="5" cols="4">
                <v-text-field label="Titel" v-model="link.name" readonly />
              </v-col>
              <v-col lg="5" md="5" sm="5" cols="4">
                <v-text-field label="URL" v-model="link.url" readonly />
              </v-col>
              <v-col lg="2" md="2" sm="2" cols="4">
                <v-btn @click="removeLink(link)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn depressed color="secondary" class="buttonText--text" @click="openLinkDialog">
                  + {{ label.addLink }}
                </v-btn>
              </v-col>
              <v-col cols="12">
                <AddLinkDialog :is-dialog-active="isLinkDialogOpen" @cancel="cancel" @addNewLink="addNewLink" />
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
        </div>
      </v-card-content>
      <v-card-actions class="ma-0 pa-0">
        <SaveUpdate :contact-point-to-save="writableContactPoint" :id="listItem.id" @error="error" />
        <v-btn class="" color="error" @click="$emit('unselectItem')">
          Abbruch
        </v-btn>
        <DeleteButton :id="listItem.id" @error="error" class="" />
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { I18nLabel } from "@/core/core.translation";
import { Contact, ContactPoint, ContactPointListItem, Link } from "@/features/commons/types/ContactPoint";
import LoadingSpinner from "@/features/commons/components/LoadingSpinner.vue";
import { marked } from "marked";
import AddLinkDialog from "@/features/admin/components/contactpoints/components/AddLinkDialog.vue";
import SaveUpdate from "@/features/admin/components/contactpoints/components/SaveUpdateButton.vue";
import ErrorHandler from "@/features/commons/components/ErrorHandler.vue";
import { useRouter } from "vue-router/composables";
import AddContactDialog from "@/features/admin/components/contactpoints/components/AddContactDialog.vue";
import MarkDownAlert from "@/features/admin/components/contactpoints/components/MarkDownAlert.vue";
import DeleteButton from "@/features/admin/components/contactpoints/components/DeleteButton.vue";
import { useGetContactPoint } from "@/features/commons/middleware/useGetContactPoints";

export default defineComponent({
  name: "EditContactPoint",
  components: { DeleteButton, MarkDownAlert, AddContactDialog, ErrorHandler, SaveUpdate, AddLinkDialog, LoadingSpinner },
  props: {
    label: {
      type: Object as () => I18nLabel
    },
    listItem: {
      type: Object as () => ContactPointListItem
    }
  },
  setup(props) {
    const id = ref(props.listItem?.id);
    const { isLoading, isError: isReadError, data: contactPoint } = useGetContactPoint(id);
    const isWriteError = ref(false);
    const isLinkDialogOpen = ref(false);
    const isContactDialogOpen = ref(false);
    const router = useRouter();
    const writableContactPoint = ref<ContactPoint>();
    const errorMessage = "Während des Abfragen oder Speichern der Daten gab es einen Fehler. " +
      "Bitte versuchen Sie es erneut. Sollte der Fehler weiterhin bestehen, dann wenden sie sich an: "
    watch(contactPoint, (newValue) => {
      if (!writableContactPoint.value) {
        writableContactPoint.value = newValue;
      }
    })

    const openLinkDialog = () => {
      isLinkDialogOpen.value = true;
    }

    const openContactDialog = () => {
      isContactDialogOpen.value = true;
    }

    const cancel = () => {
      isLinkDialogOpen.value = false;
      isContactDialogOpen.value = false;
    }

    const addNewLink = (value: Link) => {
      const newLink = { ...value, contactPointId: props.listItem?.id } as Link;
      if (writableContactPoint.value?.links) {
        writableContactPoint.value.links.push(newLink);
      } else {
        writableContactPoint.value = { ...writableContactPoint.value, links: [newLink] } as ContactPoint;
      }
      isLinkDialogOpen.value = false;
    }

    const addNewContact = (value: Contact) => {
      const newContact = { ...value, contactPointId: props.listItem?.id } as Contact
      if (writableContactPoint.value?.contact) {
        writableContactPoint.value.contact.push(newContact);
      } else {
        writableContactPoint.value = { ...writableContactPoint.value, contact: [newContact] } as ContactPoint;
      }
      isContactDialogOpen.value = false;
    }

    const computeMarkdown = computed(() => marked.parse(writableContactPoint.value?.description || ""));

    const changeName = (value: string) => writableContactPoint.value = {
      ...writableContactPoint.value,
      name: value
    } as ContactPoint;


    const changeShortCut = (value: string) =>
      writableContactPoint.value = { ...writableContactPoint.value, shortCut: value } as ContactPoint;


    const changeDescription = (value: string) => writableContactPoint.value = {
      ...writableContactPoint.value,
      description: value
    } as ContactPoint;


    const error = () => {
      isWriteError.value = true;
    }

    const closeError = () => {
      isWriteError.value = false;
      router.go(0);
    }

    function removeLink(item: Link) {
      if (writableContactPoint.value?.links) {
        const links = writableContactPoint.value.links.filter(it => it !== item)
        writableContactPoint.value = { ...writableContactPoint.value, links: links } as ContactPoint;
      }
    }

    function removeContact(contact: Contact) {
      if (writableContactPoint.value?.contact) {
        const contacts = writableContactPoint.value.contact.filter(it => it !== contact);
        writableContactPoint.value = { ...writableContactPoint.value, contact: contacts } as ContactPoint;
      }
    }

    return {
      isLoading,
      writableContactPoint,
      computeMarkdown,
      isLinkDialogOpen,
      isContactDialogOpen,
      errorMessage,
      isReadError,
      isWriteError,
      openLinkDialog,
      openContactDialog,
      cancel,
      addNewLink,
      addNewContact,
      changeName,
      changeShortCut,
      changeDescription,
      error,
      closeError,
      removeLink,
      removeContact
    }
  }
})
</script>

<style scoped>
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>