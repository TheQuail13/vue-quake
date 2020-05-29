import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    eventList: [],
    dataFeedMinMagnitude: 2.5,
    dataFeedTimeComponent: "day",
    selectedMinMag: "4.5+",
    selectedTimeFrame: "Day",
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload
    },
    setEventList(state, payload) {
      state.eventList = payload
    },
    setMinimumMagnitude(state, payload) {
      state.selectedMinMag = payload;
    },
    setSelectedTimeFrame(state, payload) {
      state.selectedTimeFrame = payload;
    }
  },
  actions: {
    getQuakeDataFeed({ state, commit }) {
      commit('setIsLoading', true)
      axios
        .get(
          `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${state.dataFeedMinMagnitude}_${state.dataFeedTimeComponent}.geojson`
        )
        .then((response) => {
          commit('setEventList', response.data.features)
          commit('setIsLoading', false)
        });
    },
  },
});
