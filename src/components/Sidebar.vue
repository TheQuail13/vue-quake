<template>
  <div>
    <q-item>
      <q-item-label header class="text-h4 q-pl-none">Settings</q-item-label>
    </q-item>

    <div class="row full-width">
      <div class="col">
        <q-select
          outlined
          label="Magnitude"
          :options="magOptions"
          class="q-pl-md q-pr-sm"
          v-model="selectedMinMag"
        />
      </div>
      <div class="col">
        <q-select
          outlined
          label="Time Frame"
          :options="timeFrames"
          v-model="selectedTimeFrame"
          class="q-pl-sm q-pr-md"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      //   selectedMinMag: "4.5+",
      magOptions: ["All", "2.5+", "4.5+", "Significant"],
      //   selectedTimeFrame: "Day",
      timeFrames: ["Day", "Week", "Month"],
    };
  },

  methods: {},

  computed: {
    ...mapState(["selectedTimeFrame"]),
    selectedMinMag: {
      get() {
        return this.$store.state.selectedMinMag;
      },
      set(value) {
        this.$store.commit("setMinimumMagnitude", value);
      },
    },
    selectedTimeFrame: {
      get() {
        return this.$store.state.selectedTimeFrame;
      },
      set(value) {
        this.$store.commit("setSelectedTimeFrame", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
