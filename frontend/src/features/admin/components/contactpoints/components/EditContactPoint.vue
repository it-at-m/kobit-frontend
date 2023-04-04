<template>
  <v-container fluid>
    <LoadingSpinner :is-loading="isLoading"/>
    <ErrorHandler :is-error="isWriteError || isReadError" :message="errorMessage" @closeError="closeError"/>
    <v-card
        flat
        :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm? 'border-top:1px solid #eee;' : ''"
        style="overflow-y: scroll"
    >
      <div v-if="!isLoading && writableContactPoint">
        <v-card-title>{{ listItem.name }} - Bearbeiten</v-card-title>
        <v-form>
          <v-row>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
              <v-text-field
                  :value="writableContactPoint.name"
                  @input="changeName"
              />
            </v-col>
            <v-col
                cols="12"
                md="4"
                sm="12"
            >
              <v-text-field
                  :value="writableContactPoint.shortCut"
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
                  :value="writableContactPoint.description"
                  @input="changeDescription"
                  label="Beschreibung"
              />
            </v-col>
            <v-col>
              <div v-html="computeMarkdown"/>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <v-card-title>
            Kontakte
          </v-card-title>
          <v-row
              v-for="contact in writableContactPoint.contact"
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
          <v-card-title>
            Links
          </v-card-title>
          <div
              v-for="link in writableContactPoint.links"
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
          <v-spacer></v-spacer>
          <v-card-title>
            Kompetenzen
          </v-card-title>
          <v-card-subtitle>
            Kompetenzen können nur über den Unterstützungsfinder eingepflegt werden.
          </v-card-subtitle>
        </v-form>
      </div>
      <v-card-actions>
        <SaveUpdate
        :contact-point-to-save="writableContactPoint"
        :id="listItem.id"
        @error="error"
        />
        <v-btn
            class="ma-2"
            color="error"
            @click="$emit('unselectItem')">
          Abbruch
        </v-btn>
        <DeleteButton :id="listItem.id" @error="error"/>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from "vue";
import {I18nLabel} from "@/core/core.translation";
import {Contact, ContactPoint, ContactPointListItem, Link} from "@/features/commons/types/ContactPoint";
import {useGetContactPoint} from "@/features/admin/components/contactpoints/middelware/useContactPoints";
import LoadingSpinner from "@/features/commons/components/LoadingSpinner.vue";
import {marked} from "marked";
import AddLinkDialog from "@/features/admin/components/contactpoints/components/AddLinkDialog.vue";
import SaveUpdate from "@/features/admin/components/contactpoints/components/SaveUpdateButton.vue";
import ErrorHandler from "@/features/commons/components/ErrorHandler.vue";
import {useRouter} from "vue-router/composables";
import AddContactDialog from "@/features/admin/components/contactpoints/components/AddContactDialog.vue";
import MarkDownAlert from "@/features/admin/components/contactpoints/components/MarkDownAlert.vue";
import DeleteButton from "@/features/admin/components/contactpoints/components/DeleteButton.vue";

export default defineComponent({
  name: "EditContactPoint",
  components: {DeleteButton, MarkDownAlert, AddContactDialog, ErrorHandler, SaveUpdate, AddLinkDialog, LoadingSpinner},
  props: {
    label: {
      type: Object as () => I18nLabel
    },
    listItem: {
      type: Object as () => ContactPointListItem
    }
  },
  setup(props) {
    const {isLoading, isError: isReadError, data: contactPoint} = useGetContactPoint(props.listItem?.id);
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
      const newLink = {...value, contactPointId: props.listItem?.id} as Link;
      if (writableContactPoint.value?.links) {
        writableContactPoint.value.links.push(newLink);
      } else {
        writableContactPoint.value = {...writableContactPoint.value, links: [newLink]} as ContactPoint;
      }
      isLinkDialogOpen.value = false;
    }

    const addNewContact = (value: Contact) => {
      const newContact = {...value, contactPointId: props.listItem?.id} as Contact
      if (writableContactPoint.value?.contact) {
        writableContactPoint.value.contact.push(newContact);
      } else {
        writableContactPoint.value = {...writableContactPoint.value, contact: [newContact]} as ContactPoint;
      }
      isContactDialogOpen.value = false;
    }

    const computeMarkdown = computed(() => marked.parse(writableContactPoint.value?.description || ""));

    const changeName = (value: string) => writableContactPoint.value = {
      ...writableContactPoint.value,
      name: value
    } as ContactPoint;


    const changeShortCut = (value: string) =>
        writableContactPoint.value = {...writableContactPoint.value, shortCut: value} as ContactPoint;


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
        writableContactPoint.value.links = writableContactPoint.value.links.filter(it => it !== item);
      }
    }

    function removeContact(contact: Contact) {
      if (writableContactPoint.value?.contact) {
        writableContactPoint.value.contact = writableContactPoint.value.contact.filter(it => it !== contact);
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