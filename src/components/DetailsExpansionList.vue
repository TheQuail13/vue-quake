<template>
  <div>
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        v-if="nearbyCities"
        group="detailList"
        expand-separator
        icon="satellite"
        label="Regional Info"
        header-class="text-blue"
      >
        <q-card>
          <q-card-section>
            <div class="text-h6 text-center">Nearby Places</div>
            <q-item v-for="city in nearbyCities" :key="city.name" class="q-px-none">
              <q-item-section>
                <q-item-label> {{ city.name }}</q-item-label>
                <q-item-label caption>
                  {{ city.distance }} km {{ city.direction }}
                </q-item-label>
              </q-item-section>
              <span class="float-right"> Population: {{ city.population || "-" }} </span>
            </q-item>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        v-if="eventProducts.dyfi"
        group="detailList"
        expand-separator
        icon="message"
        label="Did You Feel It?"
        :caption="dyfiCount"
        :header-class="`mmi-${romanNumeral(eventProducts.dyfi[0].properties.maxmmi)}`"
      >
        <q-card>
          <q-card-section class="text-center">
            <div class="text-h6">Community Intensity Map</div>
            <q-img
              v-if="eventProducts.dyfi[0].contents[`${eventDetails.id}_ciim.jpg`]"
              :src="eventProducts.dyfi[0].contents[`${eventDetails.id}_ciim.jpg`].url"
              spinner-color="white"
            />
            Contibute to citizen science - Please <a :href="dyfiUrl">share</a> your
            experience!
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        v-if="eventProducts.shakemap"
        group="detailList"
        expand-separator
        icon="public"
        label="ShakeMap"
        :caption="romanNumeral(eventProducts.shakemap[0].properties.maxmmi)"
        :header-class="`mmi-${romanNumeral(eventProducts.shakemap[0].properties.maxmmi)}`"
      >
        <q-card>
          <q-card-section class="text-center">
            <div class="text-h6">Estimated Intensity Map</div>
            <q-img
              v-if="eventProducts.shakemap[0].contents['download/intensity.jpg']"
              :src="eventProducts.shakemap[0].contents['download/intensity.jpg'].url"
              spinner-color="white"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        v-if="eventProducts.losspager"
        group="detailList"
        expand-separator
        icon="account_balance"
        label="PAGER"
        :caption="capitalizeWord(pagerAlertStatus)"
        :header-class="`pager-${pagerAlertStatus}`"
      >
        <q-card>
          <q-card-section class="q-pb-none">
            <div class="text-caption text-center">
              The PAGER system provides fatality and economic loss impact estimates
              following significant earthquakes worldwide
            </div>
          </q-card-section>
          <q-card-section class="text-center">
            <div class="text-h6">Estimated Economic Losses</div>
            <q-img
              v-if="eventProducts.losspager[0].contents['alertecon_small.png']"
              :src="eventProducts.losspager[0].contents['alertecon_small.png'].url"
              spinner-color="white"
            />
            <div class="text-h6">Estimated Fatalities</div>
            <q-img
              v-if="eventProducts.losspager[0].contents['alertfatal_small.png']"
              :src="eventProducts.losspager[0].contents['alertfatal_small.png'].url"
              spinner-color="white"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        group="detailList"
        expand-separator
        icon="report_problem"
        label="Ground Failure"
        header-class="text-blue"
      >
        <q-card>
          <q-card-section>
            <div style="height: 25%; width: 25%; fill: orange;"></div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        group="detailList"
        expand-separator
        icon="my_location"
        label="Origin"
        header-class="text-blue"
      >
        <q-card>
          <q-card-section>Blah</q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        v-if="eventProducts['moment-tensor']"
        group="detailList"
        expand-separator
        icon="sports_baseball"
        label="Moment Tensor"
        header-class="text-blue"
      >
        <q-card>
          <q-card-section>Blah</q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        v-if="eventDetails.properties.tsunami === 1"
        group="detailList"
        expand-separator
        icon="waves"
        label="Tsunami"
        header-class="text-blue"
      >
        <q-card>
          <q-card-section>
            To view any current tsunami advisories for this and other events, please
            visit: <a href="https://www.tsunami.gov"> https://www.tsunami.gov</a>.
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { intToRomanNumeral } from "@/helpers/converterHelper";
import { parseString } from "xml2js";
import { format } from "quasar";
const { capitalize } = format;

export default {
  data() {
    return {
      regionInfo: null,
      originInfo: null,
      placeInfo: null,
      nearbyCities: null,
    };
  },

  methods: {
    capitalizeWord(word) {
      if (typeof word === "string") {
        return capitalize(word);
      }

      return word;
    },
    romanNumeral(num) {
      if (typeof num === "string") {
        let float = parseFloat(num);
        if (!isNaN(float)) {
          const roundedNum = Math.round(float);
          return intToRomanNumeral(roundedNum);
        }
      }
      return null;
    },
    getRegionInformation() {
      this.$http
        .get(
          `https://earthquake.usgs.gov/ws/geoserve/regions.json?latitude=${this.eventDetails.geometry.coordinates[1]}&longitude=${this.eventDetails.geometry.coordinates[0]}`
        )
        .then((response) => {
          this.regionInfo = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOriginInfo() {
      if (this.eventProducts.origin) {
        this.$http
          .get(
            `https://earthquake.usgs.gov/archive/product/origin/${this.eventDetails.id}/${this.eventProducts.origin[0].source}/${this.eventProducts.origin[0].updateTime}/quakeml.xml`
          )
          .then((response) => {
            parseString(response.data, (err, result) => {
              this.originInfo = result;
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    getNearbyCities() {
      if (this.eventProducts["nearby-cities"]) {
        this.$http
          .get(this.eventProducts["nearby-cities"][0].contents["nearby-cities.json"].url)
          .then((response) => {
            this.nearbyCities = response.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },

  computed: {
    ...mapState({
      eventDetails: (state) => state.eventDetails,
      eventProducts: (state) => state.eventDetails.properties.products,
    }),
    ...mapGetters(["pagerAlertStatus"]),
    dyfiCount() {
      let responseCount = 0;
      if (this.eventProducts.dyfi) {
        responseCount = this.eventProducts.dyfi[0].properties.numResp;
      }
      return `${responseCount} responses`;
    },
    dyfiUrl() {
      if (this.eventDetails) {
        return `https://earthquake.usgs.gov/earthquakes/eventpage/${this.eventDetails.id}/tellus`;
      }
      return "#";
    },
  },

  mounted() {
    this.getRegionInformation();
    this.getOriginInfo();
    this.getNearbyCities();
  },
};
</script>
