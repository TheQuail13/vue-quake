<template>
  <div>
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
        <div v-if="toggleShapeLines">
          <div v-for="(feat, outerIdx) in shakeMap.features" :key="outerIdx">
            <gmap-polyline
              v-for="(geo, innerIdx) in feat.geometry.coordinates"
              :key="innerIdx"
              :path="getPolyLinePath(geo)"
              :options="getPolyLineOptions(feat.properties)"
            ></gmap-polyline>
          </div>
        </div>
      </div>
    </GmapMap>
    <q-btn
      v-if="shakeMap"
      color="primary"
      class="q-mt-xs full-width"
      label="Toggle Shape Lines"
      @click="toggleShapeLines = !toggleShapeLines"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      mapOptions: {
        streetViewControl: false,
        zoomControl: false,
      },
      toggleShapeLines: true,
    };
  },

  methods: {
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

<style lang="scss" scoped></style>
