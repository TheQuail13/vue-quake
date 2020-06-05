<template>
  <q-page class="">
    <div v-if="eventList.length > 0" key="EventsFound">
      <q-select
        outlined
        dense
        options-dense
        label="Sort by"
        class="q-my-md q-px-md full-width"
        v-model="sortBy"
        :options="sortOptions"
      />
      <q-list bordered separator>
        <q-item clickable v-ripple v-for="event in sortedEventList" :key="event.id">
          <q-item-section avatar>
            <q-avatar :color="getMagnitudeColor(event.properties.mag)" text-color="white">
              {{ event.properties.mag ? event.properties.mag.toFixed(1) : "N/A" }}
            </q-avatar>
          </q-item-section>
          <q-item-section>{{ event.properties.place }}</q-item-section>
          <q-item-section side>
            <small>{{ formatDate(event.properties.time) }}</small>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div v-else key="noEvents" class="text-center">
      <q-icon name="warning" class="text-orange q-mb-sm" style="font-size: 5rem;" />
      <div class="text-h5">No earthquakes found. Try expanding your search.</div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import { date } from "quasar";

export default {
  methods: {
    formatDate(milliseconds) {
      return date.formatDate(milliseconds, "MM-DD-YYYY HH:mm:ss");
    },
    getMagnitudeColor(mag) {
      if (mag < 3) {
        return "light-blue";
      } else if (mag < 4) {
        return "green";
      } else if (mag < 5) {
        return "yellow-8";
      } else if (mag < 6) {
        return "orange-8";
      } else {
        return "red-8";
      }
    },
  },

  computed: {
    ...mapState(["sortOptions", "eventList"]),
    sortBy: {
      get() {
        return this.$store.state.sortBy;
      },
      set(value) {
        this.$store.commit("setSoryBy", value);
      },
    },
    sortedEventList() {
      if (this.eventList && this.eventList.length > 0) {
        let arrToSort = JSON.parse(JSON.stringify(this.eventList));
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
