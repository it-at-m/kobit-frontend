<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        cols="8"
        offset="2"
        class="d-flex flex-column align-center mb-10"
      >
        <div>
          <p class="font-weight-light text-justify mb-0 pb-0">
            {{ quote.text }}
          </p>
          <p class="caption body-3 text-right">
            {{ quote.autor }}
          </p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from "vue-property-decorator";
import {
    Quote
} from "@/features/random-quote-generator/quote.type";

@Component({})
export default class TheRandomQuoteGenerator extends Vue {

    quotes: Quote[] = [{
            text: "Der erste Schritt zur Lösung eines Problems ist, es mit jemandem zu besprechen.",
            autor: "E. Schumacher (1941 - 2013)"
        },
        {
            text: "Kommunikation ist ein wunderbares Mittel, Konflikte zu lösen.Oder zu eskalieren.",
            autor: "Thom Renzie"
        },
        {
            text: "Es sind nie die Tatsachen, die uns beunruhigen und ärgern, es sind immer die eigenen Bewertungen.",
            autor: "Marshall B.Rosenberg"
        },
        {
            text: "An der Grenze der Geduld beginnen die Konflikte.",
            autor: "Oscar Wilde"
        },
        {
            text: "Am Besten überzeugt man mit den Ohren, indem man anderen zuhört.",
            autor: "Dean Rusk (1909-1994)"
        },
        {
            text: "Es ist weniger schwierig, Probleme zu lösen, als mit ihnen zu leben",
            autor: "Pierre Teilhard de Chardin"
        },
        {
            text: "Das Problem ist halb gelöst, wenn es klar formuliert ist.",
            autor: "unbekannt"
        },
        {
            text: "Man kann auf einem Standpunkt stehen, aber man sollte nicht darauf sitzen.",
            autor: "Erich Kästner"
        },
        {
            text: "Jenseits von richtig und falsch da liegt ein Raum. Dort treffen wir uns.",
            autor: "Dschalal-Ad-Din-Al Rumi"
        },
        {
            text: "Überall, wo Zwist herrschen kann, da muss es auch eine Entscheidung geben.",
            autor: "Dante Aligheri"
        },
        {
            text: "Wer anfängt zu schreien, hört auf zu denken.",
            autor: "unbekannt"
        },
        {
            text: "Jede Geschichte hat 3 Seiten: deine, meine und die Wahrheit.",
            autor: "unbekannt"
        },
        {
            text: "Konflikte sind wie Regen.",
            autor: "Costantino/Merchant"
        },
        {
            text: "In Konflikten manifestieren sich unsere Werte.",
            autor: "Bernard Beckett"
        },
        {
            text: "Wenn bei einem Gespräch die Tiefe fehlt, zieht es sich in die Länge. ",
            autor: "Ernst Ferstl"
        },
        {
            text: "Mit dem Redeanteil bei Gesprächen ist es wie beim Ballbesitz beim Fußball: Er ist nicht entscheidend.",
            autor: "Horst-Joachim Rahn"
        },
        {
            text: "Gesprächsfäden sollte man nicht abschneiden, sondern aufnehmen, neu knüpfen und weiterspinnen.",
            autor: "Helmut Glaßl"
        },
        {
            text: "Der Mensch sieht ein-und das ist wichtig: Nichts ist ganz falsch und nichts ganz richtig.",
            autor: "Eugen Roth"
        },
        {
            text: "Ein Mensch erkennt: Es ist auch den guten mehr zuzutrauen als zuzumuten.",
            autor: "Eugen Roth"
        },
        {
            text: "Nehmen Sie die Menschen, wie sie sind, andere gibt’s nicht.",
            autor: "Konrad Adenauer"
        },
        {
            text: "Klarheit ist der natürliche Feind des Konflikts.",
            autor: "Christian Prior"
        },
        {
            text: "Wer auf andere Leute wirken will, der muss erst einmal in ihrer Sprache mit ihnen reden.",
            autor: "Kurt Tucholsky"
        },
        {
            text: "Kommunikation ist ein wunderbares Mittel, Missverständnisse in die Welt zu schaffen.",
            autor: "Thom Renzie"
        },
        {
            text: "Kommunikative Kompetenz definiert sich nicht allein über Tiefgang, sondern auch über professionelle Oberflächlichkeit.",
            autor: "Thom Renzie"
        },
        {
            text: "Das größte Problem in der Kommunikation ist, dass wir nicht zuhören, um zu verstehen. Wir hören zu, um zu antworten.",
            autor: "Thomas Schäring"
        },
        {
            text: "Eine echte Führungspersönlichkeit ist nicht auf der Suche nach einem Konsens, sondern formt einen Konsens.",
            autor: "Martin Luther King Jr.",
        }
    ]

    get quote(): Quote {
        const randomQuote = Math.floor(Math.random() * this.quotes.length);
        return this.quotes[randomQuote];
    }
}
</script>

<style scoped>

</style>
