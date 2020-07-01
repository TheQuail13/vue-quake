<template>
  <div class="q-ma-md" v-if="eventDetails">
    <div>
      <div class="text-h5">
        <strong>{{ eventDetails.properties.title }}</strong>
      </div>
      <div class="text-subtitle1">
        {{ $formatDate(eventDetails.properties.time) }} (UTC)
      </div>
    </div>

    <EventMap class="q-my-md" />

    <PropertyList />

    <AdditionalInfo />
  </div>
</template>

<script>
import EventMap from "./DetailsMap.vue";
import PropertyList from "./DetailsExpansionList.vue";
import AdditionalInfo from "./DetailsAdditionalInfo.vue";
import { mapState, mapGetters } from "vuex";

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
