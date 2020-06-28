<template>
  <div>
    <div class="q-mt-md" v-if="eventProducts['general-text']">
      <div class="text-h5 q-mb-sm">Tectonic Summary</div>
      <span v-html="tectonicSummary"></span>
    </div>

    <div v-if="eventProducts['general-link']">
      <div class="text-h5 q-mb-sm">Supplemental Information</div>
      <ul>
        <li v-for="link in eventProducts['general-link']" :key="link.indexid">
          <a :href="link.properties.url">{{ link.properties.text }}</a>
        </li>
      </ul>
    </div>

    <div v-if="eventProducts['general-link']">
      <div class="text-h5 q-mb-sm">External Links</div>
      <a :href="eventDetails.properties.url">Original USGS Page</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      eventDetails: (state) => state.eventDetails,
      eventProducts: (state) => state.eventDetails.properties.products,
    }),
    tectonicSummary() {
      if (this.eventProducts["general-text"]) {
        const regEx = /<h2>(.*?)<\/h2>/s;
        return this.eventProducts["general-text"][0].contents[""].bytes.replace(
          regEx,
          ""
        );
      }
      return null;
    },
  },
};
</script>
