<template>
  <q-layout view="lHh Lpr lFf">
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

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list> </q-list>
    </q-drawer>

    <q-page-container>
      <EventList />
    </q-page-container>
  </q-layout>
</template>

<script>
import EventList from "./components/EventList.vue";

export default {
  name: "LayoutDefault",

  components: {
    EventList,
  },

  data() {
    return {
      leftDrawerOpen: false,
      display: "list",
    };
  },

  methods: {
    setDisplayType(type) {
      this.display = type;
    },
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
