<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <transition name="fade" mode="out-in">
          <q-btn
            v-if="$route.name !== 'Details'"
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            icon="settings"
            key="settings"
          />
          <q-btn
            v-else
            flat
            dense
            round
            @click="routeTo('list')"
            icon="keyboard_backspace"
            key="back"
          />
        </transition>

        <q-toolbar-title>
          Vue-Quake
        </q-toolbar-title>

        <div>
          <transition name="fade" mode="out-in">
            <q-icon
              v-if="display !== 'list' && display !== 'detail'"
              name="list"
              size="md"
              @click="routeTo('list')"
              key="list"
            ></q-icon>
            <q-icon
              v-else
              name="map"
              size="md"
              @click="routeTo('map')"
              key="map"
            ></q-icon>
          </transition>
        </div>
      </q-toolbar>
    </q-header>

    <q-dialog v-model="leftDrawerOpen">
      <Settings style="width: 700px; max-width: 80vw;" />
    </q-dialog>

    <q-page-container>
      <router-view />
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="accent" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Settings from "./components/Settings.vue";

export default {
  name: "LayoutDefault",

  components: {
    Settings,
  },

  data() {
    return {
      leftDrawerOpen: false,
    };
  },

  methods: {
    ...mapActions(["getQuakeDataFeed"]),
    routeTo(type) {
      this.$store.commit("setDisplay", type);
      if (type === "list") {
        this.$router.push({ name: "List" });
      } else {
        this.$router.push({ name: "Map" });
      }
    },
  },

  computed: {
    ...mapState(["isLoading", "display", "eventList"]),
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
