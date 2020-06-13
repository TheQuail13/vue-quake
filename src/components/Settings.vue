<template>
  <div>
    <q-card class="q-pa-xs">
      <q-card-section class="row q-pb-none">
        <div class="text-h6">Settings</div>
      </q-card-section>

      <q-card-section class="q-py-none">
        <div class="row">
          <div class="col-12 col-sm">
            <q-select
              outlined
              label="Magnitude"
              :options="magOptions"
              v-model="selectedMinimumMag"
              class="q-my-xs q-mx-xs"
            />
          </div>
          <div class="col-12 col-sm">
            <q-select
              outlined
              label="Time Frame"
              :options="timeFrames"
              v-model="selectedTimeFrame"
              class="q-my-xs q-mx-xs"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Update" @click.prevent="getQuakes" />
        <q-btn color="red-8" label="Close" v-close-popup />
      </q-card-actions>
    </q-card>

    <q-inner-loading :showing="isLoading">
      <q-spinner-facebook size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["getQuakeDataFeed"]),
    getQuakes() {
      this.getQuakeDataFeed()
        .then(() => {
          this.notify("positive");
        })
        .catch(() => {
          this.notify("negative");
        });
    },
    notify(type) {
      this.$q.notify({
        message: "Results updated",
        position: "top",
        timeout: 1200,
        type: type,
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
};
</script>
