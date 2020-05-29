import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    eventList: [],
    selectedMinimumMag: "4.5",
    selectedTimeFrame: "Day",
    magOptions: ["All", "2.5", "4.5", "Significant"],
    timeFrames: ["Day", "Week", "Month"],
  },
  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload
    },
    setEventList(state, payload) {
      state.eventList = payload
    },
    setMinimumMagnitude(state, payload) {
      state.selectedMinimumMag = payload;
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
          `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${state.selectedMinimumMag.toLowerCase()}_${state.selectedTimeFrame.toLowerCase()}.geojson`
        )
        .then((response) => {
          commit('setEventList', response.data.features)
          commit('setIsLoading', false)
        });
    },
  },
});
