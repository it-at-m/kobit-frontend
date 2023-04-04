<template>
  <v-btn
      class="ma-2"
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
import {useCreateNewContactPoint} from "@/features/admin/components/contactpoints/middelware/useContactPoints";
import {useRouter} from "vue-router/composables";

export default defineComponent({
      name: "SaveNewButton",
      props: {
        contactPointToSave: {
          type: Object as () => ContactPoint
        }
      },
      setup(props, {emit}) {
        const {isLoading, mutateAsync} = useCreateNewContactPoint();
        const router = useRouter();

        const save = () => {
          console.log(props.contactPointToSave)
          const result = mutateAsync(props.contactPointToSave);
          result.then(() => router.push("/anlaufstellen"))
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