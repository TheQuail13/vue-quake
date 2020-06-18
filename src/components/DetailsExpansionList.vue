<template>
  <div>
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        group="detailList"
        expand-separator
        icon="satellite"
        label="Regional Info"
        header-class="text-blue"
      >
        <q-card>
          <q-card-section>Blah</q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        v-if="eventProducts.dyfi"
        group="detailList"
        expand-separator
        icon="message"
        label="Did You Feel It?"
        :caption="dyfiCount"
        header-class="text-blue"
      >
        <q-card>
          <q-card-section>Blah</q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        v-if="eventProducts.shakemap"
        group="detailList"
        expand-separator
        icon="public"
        label="ShakeMap"
        :caption="romanNumeral(eventProducts.shakemap[0].properties.maxmmi)"
        header-class="text-blue"
      >
        <q-card>
          <q-card-section>Blah</q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        group="detailList"
        expand-separator
        icon="account_balance"
        label="PAGER"
        caption="GREEN"
        header-class="text-blue"
      >
        <q-card>
          <q-card-section>
            <small>
              The PAGER system provides fatality and economic loss impact estimates
              following significant earthquakes worldwide
            </small>
          </q-card-section>
          <q-card-section>Blah</q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        group="detailList"
        expand-separator
        icon="report_problem"
        label="Ground Failure"
        header-class="text-blue"
      >
        <q-card>
          <q-card-section>Blah</q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        group="detailList"
        expand-separator
        icon="my_location"
        label="Origin"
        header-class="text-blue"
      >
        <q-card>
          <q-card-section>Blah</q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        v-if="eventProducts['moment-tensor']"
        group="detailList"
        expand-separator
        icon="sports_baseball"
        label="Moment Tensor"
        header-class="text-blue"
      >
        <q-card>
          <q-card-section>Blah</q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        group="detailList"
        expand-separator
        icon="waves"
        label="Tsunami"
        header-class="text-blue"
      >
        <q-card>
          <q-card-section>Blah</q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import converter from "../helpers/converterHelper";

export default {
  methods: {
    romanNumeral(num) {
      console.log(typeof num);
      if (typeof num === "string") {
        let float = parseFloat(num);
        const roundedNum = Math.round(float);
        return converter.intToRomanNumeral(roundedNum);
      }
      return 0;
    },
  },
  computed: {
    ...mapState({
      eventProducts: (state) => state.eventDetails.properties.products,
    }),
    dyfiCount() {
      return `${this.eventProducts.dyfi[0].properties.numResp} responses`;
    },
  },
};
</script>
