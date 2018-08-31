import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import localforage from "localforage";
//import router from "App/router";
import queryString from "query-string";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import states from "./states";

Vue.use(Vuex);

export default {
  // we have to use this name key:State
  states,
  mutations,
  actions,
  getters
};
