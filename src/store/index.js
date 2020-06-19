import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    display: 'list',
    eventList: [],
    eventDetails: null,
    shakeMap: null,
    error: null,
    selectedMinimumMag: "4.5",
    selectedTimeFrame: "Day",
    magOptions: ["All", "2.5", "4.5", "Significant"],
    timeFrames: ["Day", "Week", "Month"],
    sortBy: "Date Descending",
    sortOptions: [
      "Date Ascending",
      "Date Descending",
      "Magnitude Ascending",
      "Magnitude Descending",
    ],
  },

  getters: {
    eventId: state => { 
      return state.eventDetails.id;
    }
  },

  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload
    },
    setDisplay(state, payload) {
      state.display = payload
    },
    setEventList(state, payload) {
      state.eventList = payload
    },
    setEventDetails(state, payload) {
      state.eventDetails = payload
    },
    setShakeMap(state, payload) {
      state.shakeMap = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setMinimumMagnitude(state, payload) {
      state.selectedMinimumMag = payload;
    },
    setSelectedTimeFrame(state, payload) {
      state.selectedTimeFrame = payload;
    },
    setSortBy(state, payload) {
      state.sortBy = payload;
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
        })
        .catch(err => { 
          commit('setError', err)
          commit('setIsLoading', false)
        });
    },
    getEventDetailsById({ commit, dispatch }, id) {
      commit('setIsLoading', true)
      axios
        .get(
          `https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/${id}.geojson`
        )
        .then((response) => {
          commit('setEventDetails', response.data)
          if (response.data.properties.products.shakemap && response.data.properties.products.shakemap.length > 0) {
            dispatch('getShakeMap', response.data.properties.products.shakemap[0])
          } else {
            commit('setShakeMap', null)
            commit('setIsLoading', false)
          }
        })
        .catch(err => { 
          commit('setError', err)
          commit('setIsLoading', false)
        });
    },
    getShakeMap({ commit }, event) {
      axios
        .get(
          `https://earthquake.usgs.gov/archive/product/shakemap/${event.code}/${event.source}/${event.updateTime}/download/cont_mi.json`
        )
        .then((response) => {
          commit('setShakeMap', response.data)
          commit('setIsLoading', false)
        })
        .catch(err => { 
          commit('setError', err)
          commit('setIsLoading', false)
        });
    }
  },
});
