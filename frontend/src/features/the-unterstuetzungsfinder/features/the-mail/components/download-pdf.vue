<template>
  <v-col
    cols="12"
    sm="6"
    md="6"
    lg="3"
    xl="3"
    class="text-right"
  >
    <v-btn
      class="justify-end"
      @click="download()"
    >
      <i
        data-v-25febbcc=""
        aria-hidden="true"
        class="v-icon notranslate mdi mdi-file-pdf theme--dark"
      />
      Ihre Antworten drucken
    </v-btn>
  </v-col>
</template>

<script lang="ts">

import { jsPDF } from "jspdf";
import {
  getGivenAnswers
} from "@/features/the-unterstuetzungsfinder/the-unterstuezungsfinder-store.module";

import { getConvo } from "@/features/the-unterstuetzungsfinder/the-unterstuezungsfinder-store.module";

import { defineComponent } from "vue";


export default defineComponent({
  name: "DownloadPDF",
  methods: {

    async download() {

      const decisionTree = this.$store.getters[getGivenAnswers()];

      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: [1050, 1485]
      });

      pdf.setFontSize(20);

      pdf.text("Ihre Antworten im Unterstützungsfinder der KoBITApp", 80, 80);

      pdf.setFontSize(14);

      pdf.text("Ihr KoBIT Fragebaum:", 80, 120);
      pdf.line(80, 125, 970, 125);

      let pdfSpacer = 120;
      for (let i = 0; i < decisionTree.length; i++) {

        pdf.text(i + 1 + ". Frage: " + decisionTree[i].questionAnswered, 80, 30 + (pdfSpacer));
        pdf.text("Ihre Antwort: " + decisionTree[i].answerValue, 80, 30 + (pdfSpacer + 16));

        pdfSpacer = pdfSpacer + 45;
      }

      pdf.text("Für Ihr Anliegen werden folgende Anlaufstellen vorgeschlagen:", 80, 120 + pdfSpacer);
      pdf.line(80, 125 + pdfSpacer, 970, 125 + pdfSpacer);

      const convo = this.$store.getters[getConvo()];

      for (let i = 0; i < convo.contactPoints.length; i++) {

        pdf.text(convo.contactPoints[i].shortCut + ": " + convo.contactPoints[i].name, 80, 160 + (pdfSpacer));
        if (convo.contactPoints[i].contact[0]) {
          pdf.text("Kontakt: " + convo.contactPoints[i].contact[0].email, 80, 160 + (pdfSpacer + 16));
        } else {
          pdf.text("Kontakt: N/A", 80, 160 + (pdfSpacer + 16));
        }


        pdfSpacer = pdfSpacer + 45;

      }

      pdf.setFontSize(12);

      const today = new Date().toLocaleDateString();

      pdf.text(today, 915, 30);
      pdf.text(today, 915, 1455);

      pdf.text("KoBIT. Digital. Erleben.", 80, 30);
      pdf.text("KoBIT. Digital. Erleben.", 80, 1455);

      pdf.save("kobit_fragebogen.pdf");

    }


  }


});
</script>

<style scoped>

</style>