<template>
  <q-page class="flex flex-center">
    <h4 class="q-my-md">M {{ this.dataFeedMinMagnitude }}, Previous days</h4>
    <q-select
      outlined
      v-model="sortBy"
      :options="sortOptions"
      label="Sort by"
      class="q-mb-md q-px-md full-width"
    />
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="event in sortedEventList" :key="event.id">
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

    <q-inner-loading :showing="isLoading">
      <q-spinner-ball size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import { date } from "quasar";

export default {
  data() {
    return {
      isLoading: false,
      quakeList: null,
      dataFeedMinMagnitude: 2.5,
      dataFeedTimeComponent: "day",
      sortBy: "Date Descending",
      sortOptions: [
        "Date Ascending",
        "Date Descending",
        "Magnitude Ascending",
        "Magnitude Descending",
      ],
    };
  },

  methods: {
    formatDate(milliseconds) {
      return date.formatDate(milliseconds, "MM-DD-YYYY HH:mm:ss");
    },
    getQuakeDataFeed() {
      this.isLoading = true;
      this.$http
        .get(
          `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${this.dataFeedMinMagnitude}_${this.dataFeedTimeComponent}.geojson`
        )
        .then((response) => {
          this.quakeList = response.data.features;
          this.isLoading = false;
        });
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

  computed: {
    sortedEventList() {
      if (this.quakeList && this.quakeList.length > 0) {
        let arrToSort = JSON.parse(JSON.stringify(this.quakeList));
        switch (this.sortBy) {
          case "Date Ascending":
            return arrToSort.sort((a, b) => a.properties.time - b.properties.time);
          case "Magnitude Ascending":
            return arrToSort.sort((a, b) => a.properties.mag - b.properties.mag);
          case "Magnitude Descending":
            return arrToSort.sort((a, b) => b.properties.mag - a.properties.mag);
          default:
            return arrToSort;
        }
      }
      return [];
    },
  },

  mounted() {
    this.getQuakeDataFeed();
  },
};
</script>
