<template>
  <q-page class="flex flex-center">
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="event in eventList" :key="event.id">
        <q-item-section avatar>
          <q-avatar :color="getMagnitudeColor(event.properties.mag)" text-color="white">
            {{ event.properties.mag.toFixed(1) }}
          </q-avatar>
        </q-item-section>
        <q-item-section>{{ event.properties.place }}</q-item-section>
        <q-item-section side>
          <small>{{ formatDate(event.properties.time) }}</small>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { date } from "quasar";

export default {
  name: "EventList",
  data() {
    return {
      eventList: null,
    };
  },
  methods: {
    formatDate(milliseconds) {
      return date.formatDate(milliseconds, "MM-DD-YYYY HH:mm:ss");
    },
    getMagnitudeColor(mag) {
      if (mag < 4) {
        return "positive";
      } else if (mag < 5.5) {
        return "warning";
      } else {
        return "negative";
      }
    },
  },
  mounted() {
    this.$http
      .get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson")
      .then((response) => {
        this.eventList = response.data.features;
      });
  },
};
</script>
