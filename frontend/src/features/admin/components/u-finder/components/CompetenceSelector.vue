<template>
  <v-row>
    <v-col
    offset="2">
      <v-row>
        <v-list subheader>
          <v-subheader>Verfügbare Anlaufstellen für diesen Pfad</v-subheader>
            <v-list-item
                v-for="item in availableContactPoints"
                :key="item.id">
              <v-list-item-content>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-list-item-title v-on="on" v-text="item.shortCut"></v-list-item-title>
                  </template>
                  <span v-text="item.name"></span>
                </v-tooltip>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                    depressed
                    color="success"
                    @click="handleAddContactPoint(item)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
        </v-list>
      </v-row>
    </v-col>
    <v-col>
      <v-row>
        <v-list subheader>
          <v-subheader>Anlaufstellen als Antworten auf diesen Pfad</v-subheader>
          <v-list-item-group
              :v-model="selectedContactPoint"
              color="primary">
            <v-list-item
                v-for="contactPoint in editableContactPointList"
                :key="contactPoint.id">
              <v-list-item-content>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-list-item-title v-on="on" v-text="contactPoint.shortCut"></v-list-item-title>
                  </template>
                  <span v-text="contactPoint.name"></span>
                </v-tooltip>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                    depressed
                    color="warning"
                    @click="handleRemoveContactPoint(contactPoint)">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
          @click="save">
            Save
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
          @click="cancel">
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-snackbar
        v-model="showSnackBar"
        :color="snackBarColor"
        :timeout="3000"
        bottom
    >
      <p class="pa-0 ma-0">
        {{ snackBarText }}
        <v-icon>{{snackBarIcon}}</v-icon>
      </p>
    </v-snackbar>
  </v-row>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch} from "vue";
import Conversation from "@/features/the-unterstuetzungsfinder/types/conversation.type";
import {QuestionAndAnswer} from "@/features/the-unterstuetzungsfinder/types/QuestionAndAnswer";
import {useGetContactPointListItems} from "@/features/commons/middleware/useGetContactPoints";
import {ContactPointListItem} from "@/features/commons/types/ContactPoint";
import {
  useUpdateCompetences
} from "@/features/admin/components/contactpoints/middelware/useContactPoints";
import {useRouter} from "vue-router/composables";
import ListItemToCompetenceView from "@/features/admin/components/u-finder/model/ListItemToCompetenceView";

export default defineComponent({
      name: "CompetenceSelector",
      props: {
        convo: {
          type: Object as () => Conversation,
          required: true
        },
        givenAnswers: {
          type: Array as () => QuestionAndAnswer[],
          required: true
        },
        restart: {
          type: Function
        }
      },
      setup(props) {
        const {isLoading, isError, data: listItems, error} = useGetContactPointListItems();
        const editableContactPointList = ref<ContactPointListItem[]>([]);
        const selectedContactPoint = ref<ContactPointListItem>();
        const availableContactPoints = ref<ContactPointListItem[]>([]);
        const {isSuccess, mutateAsync} = useUpdateCompetences();
        const router = useRouter();
        const showSnackBar = ref(false);
        const snackBarText = ref<string>("")
        const snackBarColor = ref<string>("")
        const snackBarIcon = ref<string>("")

        onMounted(() => {
          editableContactPointList.value = props.convo.contactPoints
        });

        watch(listItems, (newValue) => {
          if (newValue) {
            const presentContactPointIds = editableContactPointList.value.map((it: ContactPointListItem) => it.id);
            availableContactPoints.value = newValue.filter((it: ContactPointListItem) => !presentContactPointIds.includes(it.id));
          }
        })

        const handleRemoveContactPoint = (contactPoint: ContactPointListItem) => {
          editableContactPointList.value = editableContactPointList.value.filter(it => it.id !== contactPoint.id);
          const tempList = availableContactPoints.value;
          tempList.push(contactPoint);
          availableContactPoints.value = tempList;
        }

        const handleAddContactPoint = (contactPoint: ContactPointListItem) => {
          const tempList = editableContactPointList.value;
          tempList.push(contactPoint);
          editableContactPointList.value = tempList;
          availableContactPoints.value = availableContactPoints.value.filter(it => it.id !== contactPoint.id);
        }

        const save = () => {
          const pathCompetences = props.givenAnswers.map((x: QuestionAndAnswer) => x.answerCompetence);
          const competenceList: ListItemToCompetenceView[] = editableContactPointList.value.map((it: ContactPointListItem) => {
            return {listItem: it, competences: pathCompetences} as ListItemToCompetenceView
          });
          mutateAsync(competenceList)
              .then(() => {
                if (isSuccess) {
                  showSnackBar.value = true;
                  snackBarText.value = "Anlaufstellen wurden erfolgreich dem Unterstützungsfinderpfad hinzugefügt.";
                  snackBarColor.value = "success";
                  snackBarIcon.value = "mdi-check";
                }
              }).catch(() => {
            showSnackBar.value = true;
            snackBarText.value = "Beim Speichern gab es ein Problem. Versuchen Sie es bitte erneut oder wenden Sie sich an die Betreiber der Anwendung.";
            snackBarColor.value = "error";
            snackBarIcon.value = "mdi-cross";
          }).finally(() => router.push("/admin/unterstuetzungsfinder"));
        }

        const cancel = () => {
          router.push("/admin/unterstuetzungsfinder");
        }

        return {
          isLoading,
          isError,
          listItems,
          error,
          selectedContactPoint,
          availableContactPoints,
          editableContactPointList,
          showSnackBar,
          snackBarColor,
          snackBarText,
          snackBarIcon,
          save,
          cancel,
          handleRemoveContactPoint,
          handleAddContactPoint
        }
      }
    }
)
</script>