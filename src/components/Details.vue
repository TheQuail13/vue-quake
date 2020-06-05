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
      :center="{ lat: 0, lng: 0 }"
      :zoom="9"
      style="height: 300px; width: 100%;"
      :options="mapOptions"
    >
      <div v-if="shakeMap">
        <gmap-polyline
          v-for="(feat, index) in shakeMap.features"
          :key="index"
          :path="getPolyLinePath(feat.geometry)"
          :options="getPolyLineOptions(feat.properties)"
        ></gmap-polyline>
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
        mapTypeControl: false,
        streetViewControl: false,
      },
    };
  },

  methods: {
    formatDate(milliseconds) {
      return date.formatDate(milliseconds, "MM-DD-YYYY HH:mm:ss");
    },
    getPolyLinePath(geometry) {
      return geometry.coordinates[0].map((coords) => ({
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
        if (this.$refs) {
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

<style lang="scss" scoped></style>
