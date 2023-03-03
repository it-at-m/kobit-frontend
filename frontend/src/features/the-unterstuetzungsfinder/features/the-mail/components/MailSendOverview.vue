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
import {defineComponent} from "vue";
import {Email} from "@/features/the-unterstuetzungsfinder/features/the-mail/types/Email";
import {useSendMail} from "@/features/the-unterstuetzungsfinder/features/the-mail/middleware/EmailService";
import {I18nLabel} from "@/core/core.translation";

export default defineComponent({
  name: "MailSendOverview",
  props: {
    email: {
      type: Object as () => Email
    },
    lables: {
      type: Object as () => I18nLabel
    }
  },
  setup(props) {
    const {isLoading, isError, isSuccess} = useSendMail(props.email);

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