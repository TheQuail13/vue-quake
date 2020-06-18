<template>
  <div class="q-ma-md" v-if="eventDetails">
    <div>
      <div class="text-h5">
        <strong>{{ eventDetails.properties.title }}</strong>
      </div>
      <div>{{ formatDate(eventDetails.properties.time) }} UTC</div>
      <!-- <div>
        {{ eventDetails.geometry.coordinates[1] }},
        {{ eventDetails.geometry.coordinates[0] }}
      </div> -->
      <!-- <div>{{ eventDetails.geometry.coordinates[2] }}</div> -->
      <div>Status: {{ eventDetails.properties.status }}</div>
    </div>

    <EventMap class="q-my-md" />

    <List />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { date } from "quasar";
import EventMap from "./DetailsMap.vue";
import List from "./DetailsExpansionList.vue";

export default {
  components: {
    EventMap,
    List,
  },

  methods: {
    formatDate(milliseconds) {
      return date.formatDate(milliseconds, "MM-DD-YYYY HH:mm:ss");
    },
  },

  computed: {
    ...mapState(["eventDetails", "error"]),
  },

  watch: {
    "$route.query.eventId": {
      handler() {
        this.$store.dispatch("getEventDetailsById", this.$route.query.eventId);
      },
      immediate: true,
    },
  },
};
</script>
