<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <EventList msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import EventList from "@/components/EventList.vue";

export default {
  name: "Home",
  components: {
    EventList,
  },
};
</script>
