<template>
  <v-container fluid>
    <ErrorHandler
      :is-error="isWriteError"
      :message="errorMessage"
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
      <v-card-text>
        <v-form v-model="isFormValid">
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
            >
              <v-text-field
                color="secondary"
                :value="newContactPoint?.name"
                label="Name der Anlaufstelle"
                :rules="[v => !!v || 'Name ist erforderlich', v => (v && v.length >= 5 && v.length <= 100) || 'Der Name muss 5 bis 100 Zeichen lang sein.']"
                :counter="100"
                prepend-inner-icon="mdi-format-letter-case"
                @input="changeName"
              />
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="3"
              lg="3"
              xl="3"
            >
              <v-text-field
                color="secondary"
                :value="newContactPoint?.shortCut"
                label="Kurzbezeichnung der Anlaufstelle"
                :rules="[v => !!v || 'Kurzbezeichnung ist erforderlich', v => (v && v.length >= 3 && v.length <= 10) || 'Die Kurzbezeichnung muss 3 bis 10 Zeichen lang sein.']"
                :counter="10"
                prepend-inner-icon="mdi-format-font-size-decrease"
                @input="changeShortCut"
              />
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="3"
              lg="3"
              xl="3"
            >
              <v-combobox
                :value="newContactPoint?.departments"
                :label="label.addDepartment"
                multiple
                persistent-hint
                small-chips
                :disabled="!isCentralAdmin"
                @input="changeDepartment"
              >
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
          <v-row>
            <v-col cols="12">
              <v-btn
                icon
                @click="applyFormatting('bold')"
              >
                <v-icon>mdi-format-bold</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="applyFormatting('italic')"
              >
                <v-icon>mdi-format-italic</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="applyFormatting('underline')"
              >
                <v-icon>mdi-format-underline</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="applyFormatting('ordered-list')"
              >
                <v-icon>mdi-format-list-numbered</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="applyFormatting('unordered-list')"
              >
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="applyFormatting('line-break')"
              >
                <v-icon>mdi-format-line-spacing</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="applyFormatting('h1')"
              >
                <v-icon>mdi-format-header-1</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="applyFormatting('h2')"
              >
                <v-icon>mdi-format-header-2</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="applyFormatting('h3')"
              >
                <v-icon>mdi-format-header-3</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="applyFormatting('h4')"
              >
                <v-icon>mdi-format-header-4</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="applyFormatting('h5')"
              >
                <v-icon>mdi-format-header-5</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="ma-0 pa-0">
            <v-col cols="6">
              <v-textarea
                id="description-textarea"
                color="secondary"
                :value="newContactPoint.description"
                label="Beschreibung"
                rows="12"
                :rules="[v => !!v || 'Beschreibung ist erforderlich', v => (v && v.length <= 2000) || 'Die Beschreibung muss weniger als 2000 Zeichen umfassen']"
                :counter="2000"
                prepend-inner-icon="mdi-format-align-left"
                @input="changeDescription"
              />
            </v-col>
            <v-col cols="6">
              <div
                style="border-bottom: 2px solid #eee"
                class="markdown-content"
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
                color="secondary"
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
                color="secondary"
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
                color="secondary"
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
            <v-col
              cols="12"
              class="mb-0 pb-0"
            >
              <h3 class="pa-0">
                Foto
              </h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-file-input
                v-model="file"
                :rules="fileRules"
                accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                placeholder="Datei auswählen"
              >
                <template v-slot:selection>
                  <span>{{ customFileName(file? file.name : '', maxFileNameInputLength) }}</span>
                </template>
              </v-file-input>
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
      </v-card-text>
      <v-card-actions class="ma-0 pa-0">
        <SaveNewButton
          class="ml-2"
          :contact-point-to-save="newContactPoint"
          :disabled="!isFormValid"
          :file="file || undefined"
          @error="error"
        />
        <v-btn
          class="ml-0"
          color="error"
          @click="cancelForm"
        >
          <v-icon>mdi-cancel</v-icon>
          Abbruch
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, getCurrentInstance } from "vue";
import { I18nLabel } from "@/core/core.translation";
import ErrorHandler from "@/features/commons/components/ErrorHandler.vue";
import { useGetAdminUserInfo } from "@/features/admin/components/middleware/useGetAdminUserInfoText";
import { Contact, ContactPoint, Link } from "@/features/commons/types/ContactPoint";
import MarkDownAlert from "@/features/admin/features/commons/MarkDownAlert.vue";
import { marked } from "marked";
import AddContactDialog from "@/features/admin/features/the-contact-points/components/AddContactDialog.vue";
import AddLinkDialog from "@/features/admin/features/the-contact-points/components/AddLinkDialog.vue";
import SaveNewButton from "@/features/admin/features/the-contact-points/components/SaveNewButton.vue";
import { useRouter } from "vue-router/composables";

export default defineComponent({
  name: "NewContactPoint",
  components: { SaveNewButton, AddLinkDialog, AddContactDialog, MarkDownAlert, ErrorHandler },
  props: {
    label: {
      type: Object as () => I18nLabel
    }
  },
  data: () => ({
    isFormValid: false,
  }),
  setup() {
    const newContactPoint = ref<ContactPoint>();
    const isContactDialogOpen = ref(false);
    const isLinkDialogOpen = ref(false);
    const isWriteError = ref(false);
    const errorMessage = ref('');
    const router = useRouter();
    const isCentralAdmin = ref(false);
    const { data: adminUserInfo } = useGetAdminUserInfo();

    watch(newContactPoint, (newValue) => {
      if (!newContactPoint.value) {
        newContactPoint.value = newValue;
      }
    });

    watch(adminUserInfo, (newValue) => {
      if (newValue) {
        const department = newValue.department;
        newContactPoint.value = { ...newContactPoint.value, departments: [department] } as ContactPoint;
        isCentralAdmin.value = newValue.isCentralAdmin;
      }
    })

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

    const changeDepartment = (value: string[]) => {
      newContactPoint.value = { ...newContactPoint.value, departments: value } as ContactPoint;
    }

    const cancelForm = () => {
      router.push("/admin/anlaufstellen/");
      router.go(0);

    }

    const cancel = () => {
      isLinkDialogOpen.value = false;
      isContactDialogOpen.value = false;
    }

    const error = (message: string) => {
      errorMessage.value = message;
      isWriteError.value = true;
    }
    const closeError = () => {
      isWriteError.value = false;
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

    const changeDescription = () => {
      const textarea = document.querySelector('#description-textarea') as HTMLTextAreaElement;
      const value = textarea.value;
      if (newContactPoint.value) {
        newContactPoint.value = {
          ...newContactPoint.value,
          description: value
        };
      }
    };


    const applyFormatting = (format: string) => {
      const textarea = document.querySelector('#description-textarea') as HTMLTextAreaElement | null;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);

      let newText = '';
      switch (format) {
        case 'bold':
          newText = `<b>${selectedText}</b>`;
          break;
        case 'italic':
          newText = `<i>${selectedText}</i>`;
          break;
        case 'underline':
          newText = `<u>${selectedText}</u>`;
          break;
        case 'ordered-list':
          newText = `\n<ol>\n<li>${selectedText}</li>\n<li></li>\n<li></li>\n</ol>\n`;
          break;
        case 'unordered-list':
          newText = `\n<ul>\n<li>${selectedText}</li>\n<li></li>\n<li></li>\n</ul>\n`;
          break;
        case 'line-break':
          newText = '<br />';
          break;
        case 'h1':
          newText = `<h1>${selectedText}</h1>`;
          break;
        case 'h2':
          newText = `<h2>${selectedText}</h2>`;
          break;
        case 'h3':
          newText = `<h3>${selectedText}</h3>`;
          break;
        case 'h4':
          newText = `<h4>${selectedText}</h4>`;
          break;
        case 'h5':
          newText = `<h5>${selectedText}</h5>`;
          break;
        default:
          newText = selectedText;
          break;
      }

      const currentValue = newContactPoint.value?.description || '';
      const newValue =
        currentValue.substring(0, start) + newText + currentValue.substring(end);
      newContactPoint.value = {
        ...newContactPoint.value,
        description: newValue
      } as ContactPoint;
    };

    return {
      newContactPoint,
      computeMarkdown,
      isContactDialogOpen,
      isLinkDialogOpen,
      isWriteError,
      errorMessage,
      isCentralAdmin,
      file,
      fileRules,
      maxFileNameInputLength,
      applyFormatting,
      customFileName,
      changeName,
      changeShortCut,
      changeDepartment,
      changeDescription,
      openContactDialog,
      addNewContact,
      removeContact,
      openLinkDialog,
      addNewLink,
      removeLink,
      cancel,
      cancelForm,
      error,
      closeError
    }
  }
}
)</script>

<style scoped>

</style>