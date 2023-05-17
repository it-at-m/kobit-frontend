<template>
  <v-container fluid>
    <LoadingSpinner :is-loading="isLoading" />
    <ErrorHandler :is-error="isWriteError" :message="errorMessage" @closeError="closeError" />
    <v-card flat :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? 'border-top:1px solid #eee;' : ''"
      class="ma-0 pa-0">
      <v-card-title class="pa-0">
        Anlaufstelle - Bearbeiten <span class="mdi mdi-pencil  ml-auto" />
      </v-card-title>
      <v-card-text>
        <div v-if="!isLoading && writableContactPoint">
          <v-form v-model="isFormValid">
            <v-row>
              <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field :value="writableContactPoint.name" label="Name der Anlaufstelle"
                  :rules="[v => !!v || 'Name ist erforderlich', v => (v && v.length >= 5 && v.length <= 100) || 'Der Name muss 5 bis 100 Zeichen lang sein.']"
                  :counter="100" @input="changeName" />
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field :value="writableContactPoint.shortCut" label="Kurzbezeichnung der Anlaufstelle"
                  :rules="[v => !!v || 'Kurzbezeichnung ist erforderlich', v => (v && v.length >= 3 && v.length <= 10) || 'Die Kurzbezeichnung muss 3 bis 10 Zeichen lang sein.']"
                  :counter="10" @input="changeShortCut" />
              </v-col>
              <v-col cols="12" sm="12" md="3" lg="3" xl="3">
                <v-combobox :value="writableContactPoint.departments" :label="label.addDepartment" multiple
                  persistent-hint small-chips :disabled="!isCentralAdmin" @input="changeDepartment">
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ label.addDepartmentHint }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-combobox>
              </v-col>
            </v-row>
            <v-divider class="mt-3 mb-5" />
            <MarkDownAlert :label="label" />
            <v-row class="ma-0 pa-0">
              <v-col cols="6">
                <v-textarea :value="writableContactPoint.description" label="Beschreibung"
                  :rules="[v => !!v || 'Beschreibung ist erforderlich', v => (v && v.length <= 2000) || 'Die Beschreibung muss weniger als 2000 Zeichen umfassen']"
                  :counter="2000" @input="changeDescription" />
              </v-col>
              <v-col cols="6">
                <div style="border-bottom: 2px solid #eee" v-html="computeMarkdown" />
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
                <v-text-field v-model="contact.email" label="E-Mail" readonly />
              </v-col>
              <v-col lg="2" md="2" sm="2" cols="4" class="text-right">
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
                <v-text-field v-model="link.name" label="Titel" readonly />
              </v-col>
              <v-col lg="5" md="5" sm="5" cols="4">
                <v-text-field v-model="link.url" label="URL" readonly />
              </v-col>
              <v-col lg="2" md="2" sm="2" cols="4"  class="text-right">
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
              <v-col cols="12" class="mb-0 pb-0">
                <h3 class="pa-0">
                  Foto
                </h3>
              </v-col>
            </v-row>
            <v-row>
              <v-col lg="10" md="10" sm="10" cols="8">
                <img v-if="writableContactPoint.image" :src="writableContactPoint.image.toString()"
                  style="max-width: 300px; max-height: 300px;">
                <p v-if="writableContactPoint.image">
                  Aktuelle Datei: {{
                    writableContactPoint.image ?
                      getFileNameFromLink(writableContactPoint.image.toString()) : ''
                  }}
                </p>
                <v-file-input v-model="file" :rules="fileRules" accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                  placeholder="Neue Datei auswählen und ersetzen">
                  <template v-slot:selection>
                    <span>{{ customFileName(file? file.name : '', maxFileNameInputLength) }}</span>
                  </template>
                </v-file-input>
              </v-col>
              <v-col lg="2" md="2" sm="2" cols="4" class="text-right"> <!-- Add the 'text-right' class here -->
                <v-btn v-if="writableContactPoint.image" @click="removeImage()">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
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
      </v-card-text>
      <v-card-actions class="ma-0 pa-0">
        <SaveUpdate class="ml-4" :id="listItem.id" :contact-point-to-save="writableContactPoint" :disabled="!isFormValid"
          :file="file || undefined" @error="error" />
        <v-btn class="ma-2" color="error" @click="cancelForm">
          <v-icon>mdi-cancel</v-icon> Abbruch
        </v-btn>
        <DeleteButton :current-item="listItem" class="" @error="error" />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, getCurrentInstance } from "vue";
import { I18nLabel } from "@/core/core.translation";
import { Contact, ContactPoint, ContactPointListItem, Link } from "@/features/commons/types/ContactPoint";
import LoadingSpinner from "@/features/commons/components/LoadingSpinner.vue";
import { marked } from "marked";
import AddLinkDialog from "@/features/admin/features/the-contact-points/components/AddLinkDialog.vue";
import SaveUpdate from "@/features/admin/features/the-contact-points/components/SaveUpdateButton.vue";
import ErrorHandler from "@/features/commons/components/ErrorHandler.vue";
import { useRouter } from "vue-router/composables";
import AddContactDialog from "@/features/admin/features/the-contact-points/components/AddContactDialog.vue";
import MarkDownAlert from "@/features/admin/features/commons/MarkDownAlert.vue";
import DeleteButton from "@/features/admin/features/the-contact-points/components/DeleteButton.vue";
import { useGetContactPoint } from "@/features/commons/middleware/useGetContactPoints";
import { useGetAdminUserInfo } from "@/features/admin/components/middleware/useGetAdminUserInfoText";
export default defineComponent({
  name: "EditContactPoint",
  components: { DeleteButton, MarkDownAlert, AddContactDialog, ErrorHandler, SaveUpdate, AddLinkDialog, LoadingSpinner },
  props: {
    label: {
      type: Object as () => I18nLabel
    },
    listItem: {
      type: Object as () => ContactPointListItem
    },
    file: {
      type: File,
      default: null
    }
  },
  data: () => ({
    isFormValid: false,
  }),
  setup(props) {
    const id = ref(props.listItem?.id);
    const { isLoading, isError: isReadError, data: contactPoint } = useGetContactPoint(id);
    const isWriteError = ref(false);
    const isLinkDialogOpen = ref(false);
    const isContactDialogOpen = ref(false);
    const router = useRouter();
    const writableContactPoint = ref<ContactPoint>();
    const errorMessage = ref('');
    const { data: adminUserInfo } = useGetAdminUserInfo();
    const isCentralAdmin = ref(false);
    watch(contactPoint, (newValue) => {
      if (!writableContactPoint.value) {
        writableContactPoint.value = newValue;
      }
    });

    watch(adminUserInfo, (newValue) => {
      if (newValue) {
        isCentralAdmin.value = newValue.isCentralAdmin;
      }
    });

    const openLinkDialog = () => {
      isLinkDialogOpen.value = true;
    }
    const openContactDialog = () => {
      isContactDialogOpen.value = true;
    }
    const cancelForm = () => {
      router.push("/admin/contactpoints/");
      router.go(0);

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
    const error = (message: string) => {
      errorMessage.value = message;
      isWriteError.value = true;
    };

    const changeDepartment = (value: string[]) => {
      writableContactPoint.value = { ...writableContactPoint.value, departments: value } as ContactPoint;
    }

    const closeError = () => {
      isWriteError.value = false;
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

    function removeImage() {
      if (writableContactPoint.value) {
        writableContactPoint.value = { ...writableContactPoint.value, image: undefined } as ContactPoint;
      }
    }

    const instance = getCurrentInstance();
    const root = instance?.proxy.$root || null;
    const file = ref<File | null>(null);
    const fileRules = computed(() => [
      (value: File | null) => {
        if (!value) return true;
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        return allowedTypes.includes(value.type) || "Nur JPG, JPEG und PNG-Dateien sind erlaubt.";
      }
    ]);

    const customFileName = (fileName: string, maxFileNameInputLength: number) => {
      if (!fileName) return '';
      if (fileName.length <= maxFileNameInputLength) return fileName.toUpperCase();

      const halfLength = Math.floor((maxFileNameInputLength - 3) / 2);
      return (
        fileName.slice(0, halfLength) +
        '...' +
        fileName.slice(fileName.length - halfLength)
      ).toUpperCase();
    };


    const maxFileNameInputLength = computed(() => {
      switch (root?.$vuetify.breakpoint.name) {
        case 'xs':
          return 25;
        case 'sm':
          return 40;
        case 'md':
          return 50;
        case 'lg':
          return 60;
        case 'xl':
          return 70;
        default:
          return 50;
      }
    });

    const getFileNameFromLink = (link: string) => {
      if (!link) {
        return '';
      }
      try {
        const url = new URL(link);
        return url.pathname.split('/').pop() || '';
      } catch (error) {
        console.error(`Invalid URL: ${link}`);
        return '';
      }
    };
    return {
      isLoading,
      writableContactPoint,
      computeMarkdown,
      isLinkDialogOpen,
      isContactDialogOpen,
      errorMessage,
      isReadError,
      isWriteError,
      isCentralAdmin,
      file,
      removeImage,
      customFileName,
      getFileNameFromLink,
      fileRules,
      maxFileNameInputLength,
      openLinkDialog,
      openContactDialog,
      cancelForm,
      cancel,
      addNewLink,
      addNewContact,
      changeName,
      changeShortCut,
      changeDescription,
      changeDepartment,
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