<template>
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

      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: [1050, 1485]
      });

      pdf.setFontSize(17.5);

      pdf.text("Ihre Antworten im Unterstützungsfinder der KoBITApp", 80, 80);

      pdf.text("Ihr KoBIT-Fragebaum:", 80, 125);
      pdf.line(80, 130, 970, 130);


      const decisionTree = this.$store.getters[getGivenAnswers()];
      let pdfSpacer = 125;
      for (let i = 0; i < decisionTree.length; i++) {

        pdf.text(i + 1 + ". Frage: " + decisionTree[i].questionAnswered, 80, 30 + (pdfSpacer));
        pdf.text("Ihre Antwort: " + decisionTree[i].answerValue, 80, 30 + (pdfSpacer + 18));

        pdfSpacer = pdfSpacer + 45;
      }

      pdf.text("Für Ihr Anliegen werden folgende Anlaufstellen vorgeschlagen:", 80, 50 + pdfSpacer);
      pdf.line(80, 55 + pdfSpacer, 970, 55 + pdfSpacer);

 
      const convo = this.$store.getters[getConvo()];
      pdfSpacer = pdfSpacer + 10;
      for (let i = 0; i < convo.contactPoints.length; i++) {

        pdf.text(convo.contactPoints[i].shortCut + ": " + convo.contactPoints[i].name, 80, 75 + (pdfSpacer));
        if (convo.contactPoints[i].contact[0]) {
          pdf.text("Kontakt: " + convo.contactPoints[i].contact[0].email, 80, 75 + (pdfSpacer + 18));
        } else {
          pdf.text("Kontakt: N/A", 80, 75 + (pdfSpacer + 18));
        }

        pdfSpacer = pdfSpacer + 45;

      }

      pdf.line(80, 80 + pdfSpacer, 970, 80 + pdfSpacer);
      pdfSpacer = pdfSpacer + 5;
      pdf.text("Weitere Informationen und Hilfestellungen finden Sie unter ", 80, 100 + pdfSpacer);
      pdf.textWithLink('https://kobit.muenchen.de/#/erfahre-mehr', 537, 100 + pdfSpacer, { url: 'https://kobit.muenchen.de/#/erfahre-mehr' });
      pdf.text(".", 858, 100 + pdfSpacer);

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