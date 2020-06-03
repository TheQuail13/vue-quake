<template>
  <div>
    <q-card class="q-pa-xs">
      <q-card-section class="row q-pb-none">
        <div class="text-h6">Settings</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup class="float-right" />
      </q-card-section>

      <q-card-section class="q-p-none">
        <div class="row">
          <div class="col">
            <q-select
              outlined
              label="Magnitude"
              :options="magOptions"
              class="q-pl-md q-pr-sm"
              v-model="selectedMinimumMag"
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
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["getQuakeDataFeed"]),
    notifySuccess() {
      this.$q.notify({
        message: "Results updated",
        position: "top",
        timeout: 1200,
        type: "positive",
      });
    },
  },
  computed: {
    ...mapState(["isLoading", "selectedTimeFrame", "magOptions", "timeFrames"]),
    selectedMinimumMag: {
      get() {
        return this.$store.state.selectedMinimumMag;
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

  watch: {
    selectedMinimumMag(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getQuakeDataFeed();
      }
    },
    selectedTimeFrame(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getQuakeDataFeed();
      }
    },
    isLoading(newVal, oldVal) {
      if (!this.isLoading && oldVal) {
        this.notifySuccess();
      }
    },
  },
};
</script>
