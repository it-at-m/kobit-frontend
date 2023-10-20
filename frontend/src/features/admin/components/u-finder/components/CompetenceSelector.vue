<template>
  <v-row>
    <v-col
      offset="2"
    >
      <v-row>
        <v-list subheader>
          <v-subheader>Verfügbare Anlaufstellen für diesen Pfad</v-subheader>
          <v-list-item
            v-for="item in availableContactPoints"
            :key="item.id"
          >
            <v-list-item-content>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-list-item-title
                    v-on="on"
                    v-text="item.shortCut"
                  />
                </template>
                <span v-text="item.name" />
              </v-tooltip>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                depressed
                color="success"
                @click="handleAddContactPoint(item)"
              >
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
          <v-list-item
            v-for="(contactPoint, index) in editableContactPointList"
            :key="contactPoint.id"
          >
            <v-list-item-content>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-list-item-title
                    v-on="on"
                    v-text="contactPoint.shortCut"
                  />
                </template>
                <span v-text="contactPoint.name" />
              </v-tooltip>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                depressed
                :disabled="editableContactPointList.length < 2"
                @click="handlePositionChange(
                  contactPoint.position ? contactPoint.position-1 : index,
                  contactPoint.position ? contactPoint.position : index+1,
                  contactPoint
                )"
              >
                <v-icon>mdi-menu-up</v-icon>
              </v-btn>
              <v-btn
                depressed
                :disabled="editableContactPointList.length < 2"
                @click="handlePositionChange(
                  contactPoint.position ? contactPoint.position+1 : index,
                  contactPoint.position ? contactPoint.position : index - 1,
                  contactPoint)"
              >
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
              <v-btn
                depressed
                color="warning"
                @click="handleRemoveContactPoint(contactPoint)"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            color="success"
            @click="save"
          >
            <v-icon>mdi-content-save</v-icon>
            Speichern
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            class="ma-2"
            color="error"
            @click="cancel"
          >
            <v-icon>mdi-cancel</v-icon>
            Abbruch
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-snackbar
      v-model="showSnackBar"
      :color="snackBarColor"
      :timeout="30000"
      bottom
    >
      <p class="pa-0 ma-0">
        {{ snackBarText }}
        <v-icon>{{ snackBarIcon }}</v-icon>
      </p>
    </v-snackbar>
  </v-row>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch} from "vue";
import Conversation from "@/features/the-unterstuetzungsfinder/types/conversation.type";
import {QuestionAndAnswer} from "@/features/the-unterstuetzungsfinder/types/QuestionAndAnswer";
import {useGetContactPointListItems} from "@/features/commons/middleware/useGetContactPoints";
import {
  ContactPoint,
  ContactPointListItem,
  ContactPointListItemWithPosition
} from "@/features/commons/types/ContactPoint";
import draggable from "vuedraggable";

import {useRouter} from "vue-router/composables";
import ListItemToCompetenceView from "@/features/admin/components/u-finder/model/ListItemToCompetenceView";
import {useUpdateCompetences} from "@/features/admin/features/the-contact-points/middelware/useContactPoints";

export default defineComponent({
      name: "CompetenceSelector",
      components: {draggable},
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
        const editableContactPointList = ref<ContactPointListItemWithPosition[]>([]);
        const selectedContactPoint = ref<ContactPointListItemWithPosition>();
        const availableContactPoints = ref<ContactPointListItem[]>([]);
        const {isSuccess, mutateAsync} = useUpdateCompetences();
        const router = useRouter();
        const showSnackBar = ref(false);
        const snackBarText = ref<string>("")
        const snackBarColor = ref<string>("")
        const snackBarIcon = ref<string>("")

        onMounted(() => {
          editableContactPointList.value = props.convo.contactPoints.map((it: ContactPoint) => {
            return {
              id: it.id,
              name: it.name,
              image: it.image,
              departments: it.departments,
              shortCut: it.shortCut,
              position: it.position
            } as ContactPointListItemWithPosition
          });
          editableContactPointList.value = editableContactPointList.value.sort((cp1, cp2) => cp1?.position - cp2?.position)
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
          tempList.push({...contactPoint, position: tempList.length + 1});
          editableContactPointList.value = tempList;
          availableContactPoints.value = availableContactPoints.value.filter(it => it.id !== contactPoint.id);
        }

        const handlePositionChange = (newIndex: number, oldIndex: number, element: ContactPointListItemWithPosition) =>{
          const elementToMove = {...editableContactPointList.value[newIndex-1], position: oldIndex};
          const elementTriggered = {...element, position: newIndex};
          //needed to lose the reference
          const temp = [...editableContactPointList.value];
          const a = temp.filter(it => (it.id !== elementToMove.id && it.id !== elementTriggered.id))
          a.push(elementToMove);
          a.push(elementTriggered);
          a.sort((e1, e2) => e1.position - e2.position);
          editableContactPointList.value = a;
        }

        const save = () => {
          const pathCompetences = props.givenAnswers.map((x: QuestionAndAnswer) => x.answerCompetence);
          const competenceList: ListItemToCompetenceView[] = editableContactPointList.value.map((it: ContactPointListItemWithPosition) => {
            return {listItem: it, competences: pathCompetences, position: it.position} as ListItemToCompetenceView
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
          }).finally(() => {
            router.push("/admin/unterstuetzungsfinder");
            router.go(0);
          })
        }

        const cancel = () => {
          router.push("/admin/unterstuetzungsfinder");
          router.go(0);
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
          handleAddContactPoint,
          handlePositionChange
        }
      }
    }
)
</script>
