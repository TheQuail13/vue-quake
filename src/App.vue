<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Vue-Quake
        </q-toolbar-title>

        <div>
          <transition name="fade" mode="out-in">
            <q-icon
              v-if="display !== 'list'"
              name="list"
              size="md"
              @click="setDisplayType('list')"
              key="list"
            ></q-icon>
            <q-icon
              v-else
              name="map"
              size="md"
              @click="setDisplayType('map')"
              key="map"
            ></q-icon>
          </transition>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      elevated
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <Sidebar />
    </q-drawer>

    <q-page-container>
      <EventList v-if="display === 'list'" :event-data="eventList" />
      <QuakeMap v-else :event-data="eventList" />
    </q-page-container>

    <q-inner-loading :showing="isLoading">
      <q-spinner-ball size="50px" color="primary" />
    </q-inner-loading>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Sidebar from "./components/Sidebar.vue";
import EventList from "./components/EventList.vue";
import QuakeMap from "./components/QuakeMap.vue";

export default {
  name: "LayoutDefault",

  components: {
    Sidebar,
    EventList,
    QuakeMap,
  },

  data() {
    return {
      leftDrawerOpen: false,
      display: "list",
    };
  },

  methods: {
    ...mapActions(["getQuakeDataFeed"]),
    setDisplayType(type) {
      this.display = type;
    },
    // getQuakeDataFeed() {
    //   this.isLoading = true;
    //   this.$http
    //     .get(
    //       `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${this.dataFeedMinMagnitude}_${this.dataFeedTimeComponent}.geojson`
    //     )
    //     .then((response) => {
    //       this.quakeList = response.data.features;
    //       this.isLoading = false;
    //     });
    // },
  },

  computed: {
    ...mapState(["isLoading", "eventList"]),
  },

  mounted() {
    this.getQuakeDataFeed();
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
