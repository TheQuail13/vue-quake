<template>
  <q-page class="">
    <GmapMap
      ref="quakeMap"
      :center="{ lat: 34, lng: -118 }"
      :zoom="2"
      :style="mapStyle"
      :options="mapOptions"
    >
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>
      <gmap-marker
        v-for="(event, idx) in eventData"
        :key="event.id"
        clickable
        :position="{
          lat: event.geometry.coordinates[1],
          lng: event.geometry.coordinates[0],
        }"
        :icon="getMagnitudeColor(event.properties.mag)"
        @click="toggleInfoWindow(event, idx)"
      />
    </GmapMap>
  </q-page>
</template>

<script>
import { date } from "quasar";

export default {
  props: {
    eventData: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  data() {
    return {
      mapOptions: {
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      },
      infoWinOpen: false,
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },

  methods: {
    formatDate(milliseconds) {
      return date.formatDate(milliseconds, "MM-DD-YYYY HH:mm:ss");
    },
    getMagnitudeColor(mag) {
      if (mag < 3) {
        return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
      } else if (mag < 4) {
        return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
      } else if (mag < 5.5) {
        return "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
      } else {
        return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
      }
    },
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = {
        lat: marker.geometry.coordinates[1],
        lng: marker.geometry.coordinates[0],
      };
      this.infoContent = `
      <div><strong>${marker.properties.place}</strong></div>
      <div class="q-mb-xs"><small>${this.formatDate(
        marker.properties.time
      )} UTC</small></div>
      <div><strong>Mag: </strong>${marker.properties.mag}</div>
      <div><strong>Depth: </strong>${marker.geometry.coordinates[2]} km</div>
      <div><strong>Lat: </strong>${marker.geometry.coordinates[1]}</div>
      <div><strong>Long: </strong>${marker.geometry.coordinates[0]}</div>
      `;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    getCircle(magnitude) {
      return {
        path: "SymbolPath.CIRCLE",
        fillColor: "red",
        fillOpacity: 0.2,
        scale: Math.pow(2, magnitude) / 2,
        strokeColor: "white",
        strokeWeight: 0.5,
      };
    },
  },

  computed: {
    mapStyle() {
      if (window) {
        return {
          width: "100%",
          height: `${window.innerHeight - 50}px`,
        };
      }

      return {
        width: "100%",
        height: "89vh",
      };
    },
  },

  mounted() {},
};
</script>
