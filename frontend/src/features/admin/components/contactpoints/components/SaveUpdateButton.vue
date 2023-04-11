<template>
  <v-btn
      color="success"
      :loading="isLoading"
      :disabled="isLoading"
      @click="save">
    Speichern
  </v-btn>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {ContactPoint} from "@/features/commons/types/ContactPoint";
import {useUpdateContactPoint} from "@/features/admin/components/contactpoints/middelware/useContactPoints";
import {useRouter} from "vue-router/composables";

export default defineComponent({
      name: "SaveUpdate",
      props: {
        contactPointToSave: {
          type: Object as () => ContactPoint
        },
        id: {
          type: String
        }
      },
      setup(props, {emit}) {
        const {isLoading, mutateAsync} = useUpdateContactPoint();
        const router = useRouter();

        const save = () => {
          const result = mutateAsync({contactPoint: props.contactPointToSave, id: props.id});
          result.then((it) => router.push("/anlaufstellen/"+it.id))
              .catch(() => emit('error'));
        }

        return {
          isLoading,
          save
        }
      }
    }
)</script>

<style scoped>

</style>