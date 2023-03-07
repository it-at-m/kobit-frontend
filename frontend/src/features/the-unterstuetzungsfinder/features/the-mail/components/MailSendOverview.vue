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
    },
    needToSendMail: {
      type: Boolean
    },
    afterMailSend: {
      type: Function
    }
  },
  setup(props) {
    //work around because hooks are only allowed to be called inside setup
    if(props.needToSendMail) {
      const {isLoading, isError, isSuccess} = useSendMail(props.email);
      props.afterMailSend();
      return {
        isLoading,
        isError,
        isSuccess
      }
    }
    return {
      isLoading: true,
      isError: false,
      isSuccess: false
    }
  }
})
</script>

<style scoped>

</style>