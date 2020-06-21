<template>
  <div class="q-ma-md" v-if="eventDetails">
    <div>
      <div class="text-h5">
        <strong>{{ eventDetails.properties.title }}</strong>
      </div>
      <div class="text-subtitle1">{{ formatDate(eventDetails.properties.time) }} UTC</div>
      <!-- <div>
        {{ eventDetails.geometry.coordinates[1] }},
        {{ eventDetails.geometry.coordinates[0] }}
      </div> -->
      <!-- <div>{{ eventDetails.geometry.coordinates[2] }}</div> -->
      <div>
        <q-chip
          dense
          :color="eventDetails.properties.status === 'reviewed' ? 'info' : 'warning'"
          class="q-ma-none text-weight-medium"
        >
          {{ capitalizeWord(eventDetails.properties.status) }}
        </q-chip>
        <q-chip
          dense
          :color="pagerAlertStatus === 'green' ? 'positive' : pagerAlertStatus"
          class="q-ma-none text-weight-medium float-right"
          @click.prevent="tooltipVisible = true"
        >
          PAGER: {{ capitalizeWord(pagerAlertStatus) }}
          <q-tooltip
            v-model="tooltipVisible"
            transition-show="scale"
            transition-hide="scale"
          >
            See PAGER tab for more info
          </q-tooltip>
        </q-chip>
      </div>
    </div>

    <EventMap class="q-my-md" />

    <List />
  </div>
</template>

<script>
import { format } from "quasar";
const { capitalize } = format;

import { mapState, mapGetters } from "vuex";
import { date } from "quasar";
import EventMap from "./DetailsMap.vue";
import List from "./DetailsExpansionList.vue";

export default {
  components: {
    EventMap,
    List,
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
    ...mapState(["eventDetails", "error"]),
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
