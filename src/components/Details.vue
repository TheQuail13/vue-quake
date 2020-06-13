<template>
  <div class="q-ma-md" v-if="eventDetails">
    <div class="text-h5">
      <strong>{{ eventDetails.properties.title }}</strong>
    </div>
    <div>{{ formatDate(eventDetails.properties.time) }} UTC</div>
    <div>
      {{ eventDetails.geometry.coordinates[1] }},
      {{ eventDetails.geometry.coordinates[0] }}
    </div>
    <div>{{ eventDetails.geometry.coordinates[2] }}</div>
    <div>Status: {{ eventDetails.properties.status }}</div>

    <GmapMap
      ref="eventMap"
      style="height: 500px; width: 100%;"
      :center="{
        lat: eventDetails.geometry.coordinates[1],
        lng: eventDetails.geometry.coordinates[0],
      }"
      :zoom="8"
      :options="mapOptions"
    >
      <gmap-marker
        :position="{
          lat: eventDetails.geometry.coordinates[1],
          lng: eventDetails.geometry.coordinates[0],
        }"
      ></gmap-marker>
      <div v-if="shakeMap">
        <div
          v-show="toggleShapeLines"
          v-for="(feat, outerIdx) in shakeMap.features"
          :key="outerIdx"
        >
          <gmap-polyline
            v-for="(geo, innerIdx) in feat.geometry.coordinates"
            :key="innerIdx"
            :path="getPolyLinePath(geo)"
            :options="getPolyLineOptions(feat.properties)"
          ></gmap-polyline>
        </div>
      </div>
    </GmapMap>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { date } from "quasar";

export default {
  data() {
    return {
      mapOptions: {
        streetViewControl: false,
      },
      toggleShapeLines: true,
    };
  },

  methods: {
    formatDate(milliseconds) {
      return date.formatDate(milliseconds, "MM-DD-YYYY HH:mm:ss");
    },
    getPolyLinePath(coords) {
      return coords.map((coords) => ({
        lat: coords[1],
        lng: coords[0],
      }));
    },
    getPolyLineOptions(props) {
      return {
        strokeColor: props.color,
        strokeWeight: props.weight,
      };
    },
  },

  computed: {
    ...mapState(["eventDetails", "shakeMap", "error"]),
    path() {
      if (this.shakeMap) {
        return this.shakeMap.features[0].geometry.coordinates[0].map((coords) => ({
          lat: coords[1],
          lng: coords[0],
        }));
      }
      return [{ lat: 34, lng: -118 }];
    },
  },

  watch: {
    "$route.query.eventId": {
      handler() {
        this.$store.dispatch("getEventDetailsById", this.$route.query.eventId);
      },
      immediate: true,
    },
    shakeMap: {
      handler(newVal) {
        if (this.$refs.eventMap) {
          if (newVal) {
            this.$refs.eventMap.$mapPromise.then((map) => {
              map.setCenter({
                lat: this.shakeMap.metadata.latitude,
                lng: this.shakeMap.metadata.longitude,
              });
            });
          }
        }
      },
      immediate: true,
    },
  },
};
</script>
