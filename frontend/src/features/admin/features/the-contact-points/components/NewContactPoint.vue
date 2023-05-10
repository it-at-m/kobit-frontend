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
                :disabled="! isCentralAdmin"
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
          <v-row class="ma-0 pa-0">
            <v-col cols="6">
              <v-textarea
                :value="newContactPoint?.description"
                label="Beschreibung"
                :rules="[v => !!v || 'Beschreibung ist erforderlich', v => (v && v.length <= 2000) || 'Die Beschreibung muss weniger als 2000 Zeichen umfassen']"
                :counter="2000"
                prepend-inner-icon="mdi-format-align-left"
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
      </v-card-text>
      <v-card-actions class="ma-0 pa-0">
        <SaveNewButton
          :contact-point-to-save="newContactPoint"
          :disabled="!isFormValid"
          @error="error"
        />
        <v-btn
          class="ma-2"
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
import {computed, defineComponent, ref, watch} from "vue";
import {I18nLabel} from "@/core/core.translation";
import ErrorHandler from "@/features/commons/components/ErrorHandler.vue";
import {useGetAdminUserInfo} from "@/features/admin/components/middleware/useGetAdminUserInfoText";
import { Contact, ContactPoint, Link } from "@/features/commons/types/ContactPoint";
import MarkDownAlert from "@/features/admin/features/commons/MarkDownAlert.vue";
import { marked } from "marked";
import AddContactDialog from "@/features/admin/features/the-contact-points/components/AddContactDialog.vue";
import AddLinkDialog from "@/features/admin/features/the-contact-points/components/AddLinkDialog.vue";
import SaveNewButton from "@/features/admin/features/the-contact-points/components/SaveNewButton.vue";
import { useRouter } from "vue-router/composables";

export default defineComponent({
      name: "NewContactPoint",
      components: {SaveNewButton, AddLinkDialog, AddContactDialog, MarkDownAlert, ErrorHandler},
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
        const {data: adminUserInfo} = useGetAdminUserInfo();

        watch(adminUserInfo, (newValue) => {
          if (newValue) {
            const department = newValue.department;
            newContactPoint.value = {...newContactPoint.value, departments: [department]} as ContactPoint;
            isCentralAdmin.value = newValue.isCentralAdmin;
          }
        })

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
          newContactPoint.value = {...newContactPoint.value, shortCut: value} as ContactPoint;
        }

        const changeDepartment = (value: string[]) => {
          newContactPoint.value = {...newContactPoint.value, departments: value} as ContactPoint;
        }


        const changeDescription = (value: string) => {
          newContactPoint.value = {...newContactPoint.value, description: value} as ContactPoint;
        }

        const cancelForm = () => {
          router.push("/admin/contactpoints/");
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

        return {
          newContactPoint,
          computeMarkdown,
          isContactDialogOpen,
          isLinkDialogOpen,
          isWriteError,
          errorMessage,
          isCentralAdmin,
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
          closeError,

        }
      }
    }
)</script>

<style scoped>

</style>