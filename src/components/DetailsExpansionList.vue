<template>
  <div>
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        v-if="this.originInfo"
        group="detailList"
        expand-separator
        icon="my_location"
        label="Origin"
        header-class="text-blue"
      >
        <q-card>
          <q-card-section>
            <q-list dense>
              <OriginItem :label="'Status'"
                >{{ $capitalize(eventDetails.properties.status) }}
              </OriginItem>
              <OriginItem :label="'Time'">
                {{ $formatDate(originInfo.origin[0].time[0].value[0]) }} UTC
              </OriginItem>
              <OriginItem :label="'Location'"
                >{{
                  formatCoordinates(
                    originInfo.origin[0].latitude[0].value[0],
                    originInfo.origin[0].longitude[0].value[0]
                  )
                }}
              </OriginItem>
              <OriginItem :label="'Magnitude'">
                {{ originInfo.magnitude[0].mag[0].value[0] }}
                {{ originInfo.magnitude[0].type[0] }}
              </OriginItem>
              <OriginItem :label="'Depth'">
                {{ parseFloat(originInfo.origin[0].depth[0].value[0]) / 1000 }}
                km
              </OriginItem>
              <OriginItem :label="'Number of Stations'">
                {{ originInfo.magnitude[0].stationCount[0] }}
              </OriginItem>
              <OriginItem :label="'Number of Phases'">
                {{ originInfo.origin[0].quality[0].usedPhaseCount[0] }}
              </OriginItem>
              <!-- <OriginItem :label="'Minimum Distance'">
                {{ originInfo.origin[0].quality[0].minimumDistance[0] }}
              </OriginItem> -->
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>

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
        :caption="$capitalize(pagerAlertStatus)"
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
            <div class="text-h6 q-pt-md">Estimated Fatalities</div>
            <q-img
              v-if="eventProducts.losspager[0].contents['alertfatal_small.png']"
              :src="eventProducts.losspager[0].contents['alertfatal_small.png'].url"
              spinner-color="white"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        v-if="eventProducts['ground-failure']"
        group="detailList"
        expand-separator
        icon="report_problem"
        label="Ground Failure"
        :header-class="`text-${groundFailureMetaAlertLevel}`"
      >
        <q-card>
          <q-card-section class="q-pb-none">
            <div class="text-h6 text-center q-pb-xs">Landslide Estimate</div>
            <div class="row">
              <div
                :style="
                  `height: 20%; width: 20%; fill: ${eventProducts['ground-failure'][0].properties['landslide-alert']};`
                "
                class="col-4"
              >
                <Landslide />
              </div>
              <div class="col-8 q-ml-sm self-center">
                <div
                  class="text-body2"
                  v-html="groundFailureFullText('landslide', 'hazard')"
                ></div>
                <div
                  class="text-body2"
                  v-html="groundFailureFullText('landslide', 'population')"
                ></div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-center q-pb-xs">Liquefaction Estimate</div>
            <div class="row">
              <div
                :style="
                  `height: 20%; width: 20%; fill: ${eventProducts['ground-failure'][0].properties['liquefaction-alert']};`
                "
                class="col-4"
              >
                <Liquefaction />
              </div>
              <div class="col-8 q-ml-sm self-center">
                <div
                  class="text-body2"
                  v-html="groundFailureFullText('liquefaction', 'hazard')"
                ></div>
                <div
                  class="text-body2"
                  v-html="groundFailureFullText('liquefaction', 'population')"
                ></div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- <q-expansion-item
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
      </q-expansion-item> -->

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
import Landslide from "./Svg/LandslideSvg.vue";
import Liquefaction from "./Svg/LiquefactionSvg.vue";
import OriginItem from "./OriginInfoItem.vue";

import { mapState, mapGetters } from "vuex";
import { intToRomanNumeral } from "@/helpers/converterHelper";
import { parseString } from "xml2js";

export default {
  components: {
    Landslide,
    Liquefaction,
    OriginItem,
  },

  data() {
    return {
      regionInfo: null,
      originInfo: null,
      placeInfo: null,
      nearbyCities: null,
    };
  },

  methods: {
    romanNumeral(num) {
      if (typeof num === "string") {
        let float = parseFloat(num);
        if (!isNaN(float)) {
          const roundedNum = Math.round(float);
          return intToRomanNumeral(roundedNum);
        }
      }
      return num;
    },
    formatCoordinates(lat, lng) {
      const degree = String.fromCharCode(176);
      let latDir = lat > 0 ? "N" : "S";
      let lngDir = lng > 0 ? "E" : "W";
      let finalLat = `${Math.abs(lat)}${degree}${latDir}`;
      let finalLng = `${Math.abs(lng)}${degree}${lngDir}`;

      return `${finalLat} ${finalLng}`;
    },
    groundFailureFullText(type = "landslide", subtype = "population") {
      if (type && subtype) {
        const groundFailureRef = this.eventProducts["ground-failure"][0].properties;

        const number = groundFailureRef[`${type}-${subtype}-alert-value`];
        const severity = this.groundFailureText(
          groundFailureRef[`${type}-${subtype}-alert-color`]
        );
        const subtypeDesc =
          subtype === "population"
            ? `population exposed <small>(${number})</small>`
            : `area affected <small>(${number} km${"2".sup()})</small>`;
        return `${severity} ${subtypeDesc}`;
      }

      return "No analysis currently available";
    },
    groundFailureText(color) {
      if (color) {
        switch (color) {
          case "red":
            return "Extensive";
          case "yellow":
            return "Limited";
          case "orange":
            return "Significant";
          default:
            break;
        }
      }

      return "Little or no";
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
              this.originInfo = result["q:quakeml"].eventParameters[0].event[0];
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
    groundFailureMetaAlertLevel() {
      if (this.eventProducts["ground-failure"]) {
        const groundFailureRef = this.eventProducts["ground-failure"][0].properties;
        const combinedAlerts = `${groundFailureRef["landslide-alert"]}${groundFailureRef["liquefaction-alert"]}`;

        if (combinedAlerts.toLocaleLowerCase().indexOf("red") > -1) {
          return "red";
        } else if (combinedAlerts.toLocaleLowerCase().indexOf("orange") > -1) {
          return "orange";
        } else if (combinedAlerts.toLocaleLowerCase().indexOf("yellow") > -1) {
          return "yellow";
        }
      }

      return "green";
    },
  },

  mounted() {
    this.getRegionInformation();
    this.getOriginInfo();
    this.getNearbyCities();
    this.formatCoordinates(1, 27);
  },
};
</script>
