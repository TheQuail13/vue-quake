<template>
  <q-page class="flex flex-center">
    <q-select
      outlined
      dense
      options-dense
      v-model="sortBy"
      :options="sortOptions"
      label="Sort by"
      class="q-my-md q-px-md full-width"
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
      if (this.eventData && this.eventData.length > 0) {
        let arrToSort = JSON.parse(JSON.stringify(this.eventData));
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
};
</script>
