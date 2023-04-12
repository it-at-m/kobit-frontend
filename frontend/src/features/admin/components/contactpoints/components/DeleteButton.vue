<template>
  <v-row justify="center">
    <v-btn
      color="warning"
      :loading="isLoading"
      :disabled="isLoading"
      @click="openDialog"
    >
      Löschen
    </v-btn>
    <v-dialog
      v-model="isDialogActive"
      persistent
      max-width="590"
    >
      <v-card>
        <v-card>Soll die Anlaufstelle wirklich gelöscht werden?</v-card>
        <v-card-text>
          Das Löschen der Anlaufstelle kann nicht rückgängig gemacht werden. Eine Löschung kann nur durch das
          erneute Anlegen der Anlaufstelle bereinigt werden.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="isDialogActive = false"
          >
            Abbrechen
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteContactPoint"
          >
            Löschen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useDeleteContactPoint} from "@/features/admin/components/contactpoints/middelware/useContactPoints";
import {useRouter} from "vue-router/composables";

export default defineComponent({
      name: "DeleteButton",
      props: {
        id: {
          type: String
        }
      },
      setup(props, {emit}) {
        const router = useRouter();
        const {isLoading, mutateAsync} = useDeleteContactPoint();
        const isDialogActive = ref(false);

        const openDialog = () => {
          isDialogActive.value = true;
        }

        const deleteContactPoint = () => {
          isDialogActive.value = false;
          mutateAsync(props.id).then(() =>
              router.push("/anlaufstellen")
          ).catch(() => emit('error'))
        }

        return {
          isLoading,
          isDialogActive,
          openDialog,
          deleteContactPoint
        }
      }
    }
)</script>

<style scoped>

</style>