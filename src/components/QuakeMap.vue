<template>
  <q-page class="flex flex-center">
    <GmapMap
      :center="{ lat: 34, lng: -118 }"
      :zoom="7"
      style="width: 100%; height: 95vh"
    />
  </q-page>
</template>

<script>
export default {
  props: {
    eventData: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped></style>
