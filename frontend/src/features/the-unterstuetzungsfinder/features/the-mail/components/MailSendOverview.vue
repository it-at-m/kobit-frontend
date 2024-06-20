<template>
  <v-row>
    <v-col>
      <div v-if="isLoading">
        {{ lables.mailIsSend }}
      </div>
      <div v-if="isError">
        {{ lables.mailSendError }}
      </div>
      <div v-if="isSuccess">
        {{ lables.mailSendSuccess }}
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { Email } from "@/features/the-unterstuetzungsfinder/features/the-mail/types/Email";
import { useSendMail } from "@/features/the-unterstuetzungsfinder/features/the-mail/middleware/EmailService";
import { I18nLabel } from "@/core/core.translation";

export default defineComponent({
  name: "MailSendOverview",
  props: {
    email: {
      type: Object as () => Email
    },
    lables: {
      type: Object as () => I18nLabel
    },
    needToSendMail: {
      type: Boolean
    },
    afterMailSend: {
      type: Function
    }
  },
  setup(props) {
    const { mutate, isLoading, isError, isSuccess } = useSendMail();

    onMounted(() => {
      if (props.needToSendMail) {
        mutate(props.email, {
          onSuccess: () => {
            props.afterMailSend();
          },
        });
      }
    });

    return {
      isLoading,
      isError,
      isSuccess
    }
  }
})
</script>

<style scoped>

</style>
