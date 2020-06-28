<template>
  <div>
    <GmapMap
      ref="eventMap"
      style="height: 500px; width: 100%;"
      :center="{
        lat: eventDetails.geometry.coordinates[1],
        lng: eventDetails.geometry.coordinates[0],
      }"
      :zoom="7"
      :options="mapOptions"
    >
      <gmap-marker
        :position="{
          lat: eventDetails.geometry.coordinates[1],
          lng: eventDetails.geometry.coordinates[0],
        }"
      ></gmap-marker>
      <div v-if="shakeMap">
        <div v-if="showShapeLines">
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import { gmapApi } from "gmap-vue";

export default {
  data() {
    return {
      mapOptions: {
        streetViewControl: false,
        zoomControl: false,
      },
      showShapeLines: true,
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
    toggleShapeLines() {
      this.showShapeLines = !this.showShapeLines;
    },
    makeInfoBox(controlEl) {
      let elStyle = controlEl.style;
      elStyle.boxSizing = "inherit";
      elStyle.font = "inherit";
      elStyle.fontFamily = "inherit";
      elStyle.textTransform = "none";
      elStyle.background = "none rgb(255, 255, 255)";
      elStyle.border = "0px";
      elStyle.margin = "10px";
      elStyle.padding = "0px";
      elStyle.position = "absolute";
      elStyle.cursor = "pointer";
      elStyle.userSelect = "none";
      elStyle.borderRadius = "2px";
      elStyle.height = "40px";
      elStyle.width = "40px";
      elStyle.boxShadow = "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px";
      elStyle.overflow = "hidden";
      elStyle.top = "48px";
      elStyle.right = "0px";
      elStyle.backgroundColor = "white";
      elStyle.fontSize = "2em";
      controlEl.innerHTML =
        '<i aria-hidden="true" role="img" class="material-icons q-icon">visibility</i>';

      controlEl.addEventListener("click", () => {
        this.toggleShapeLines();
      });
    },
  },

  computed: {
    ...mapState(["eventDetails", "shakeMap", "error"]),
    google: gmapApi,
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

  mounted() {
    if (this.$refs.eventMap) {
      this.$refs.eventMap.$mapPromise.then((map) => {
        var infoBoxDiv = document.createElement("button");
        this.makeInfoBox(infoBoxDiv);
        map.controls[this.google.maps.ControlPosition.RIGHT_TOP].push(infoBoxDiv);
      });
    }
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
