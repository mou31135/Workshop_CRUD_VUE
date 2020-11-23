import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

let mongo_api = "http://localhost:5000/api/food/";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    arr_foods: []
  },

  mutations: {
    fetchFood(state, { res }) {
      state.arr_foods = res.data;
    },
    addFood(state, { n_dat }) {
      state.arr_foods.push(n_dat);
    },
    deleteFood(state, { n_dat }) {
      state.arr_foods.splice(n_dat.index, 1);
    },
    editFood(state, { n_dat }) {
      state.arr_foods[n_dat.index].name = n_dat.name;
      state.arr_foods[n_dat.index].price = n_dat.price;
      if( n_dat.picture){  
        state.arr_foods[n_dat.index].picture = n_dat.picture;
      }
    }
  },

  actions: {
    async fetchFood({ commit }) {
      await Axios.get(mongo_api)
        .then(res => commit("fetchFood", { res }))
        .catch(err => alert(err));
    },
    async addFood({ commit }, n_dat) {
      await Axios.post(mongo_api, n_dat)
        .then(() => commit("addFood", { n_dat }))
        .catch(err => alert(err));
    },
    async deleteFood({ commit }, n_dat) {
      alert('ลบข้อมูล '+n_dat._id);
      await Axios.delete(mongo_api + n_dat._id)
        .then(() => commit("deleteFood", { n_dat }))
        .catch(err => alert(err));
    },
    async editFood({ commit }, n_dat) {
      await Axios.put(mongo_api + n_dat._id, n_dat)
        .then(() => commit("editFood", { n_dat }))
        .catch(err => alert(err));
    }
  },

  getters: {
    arr_foods: state => state.arr_foods
  }
});
