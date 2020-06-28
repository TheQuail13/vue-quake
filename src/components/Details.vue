<template>
  <div class="q-ma-md" v-if="eventDetails">
    <div>
      <div class="text-h5">
        <strong>{{ eventDetails.properties.title }}</strong>
      </div>
      <div class="text-subtitle1">
        {{ formatDate(eventDetails.properties.time) }} (UTC)
      </div>
    </div>

    <EventMap class="q-my-md" />

    <PropertyList />

    <AdditionalInfo />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { date, format } from "quasar";
const { capitalize } = format;
import EventMap from "./DetailsMap.vue";
import PropertyList from "./DetailsExpansionList.vue";
import AdditionalInfo from "./DetailsAdditionalInfo.vue";

export default {
  components: {
    EventMap,
    PropertyList,
    AdditionalInfo,
  },

  data() {
    return {
      tooltipVisible: false,
    };
  },

  methods: {
    formatDate(milliseconds) {
      return date.formatDate(milliseconds, "MM-DD-YYYY HH:mm:ss");
    },
    capitalizeWord(word) {
      if (typeof word === "string") {
        return capitalize(word);
      }

      return word;
    },
  },

  computed: {
    ...mapState({
      eventDetails: (state) => state.eventDetails,
      error: (state) => state.error,
    }),
    ...mapGetters(["pagerAlertStatus"]),
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
