// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Router from "vue-router";
import router from "./app/router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import Vuex from "vuex";
import { sync } from "vuex-router-sync";
import "../static/custom.css";
import axios from "axios";
import globalStore from "./domains/auth/vuex-module";
import localforage from "localforage";
import VeeValidate, { Validator } from "vee-validate";
import CpfValidator from "./support/validators/cpf.validator";
import pt_BR from "vee-validate/dist/locale/pt_BR";
import es from "vee-validate/dist/locale/es";
import en from "vee-validate/dist/locale/en";
import FlagIcon from "vue-flag-icon";
import HTTPStatus from "http-status";

Validator.extend("cpf", CpfValidator);

Vue.use(Vuex);
Vue.use(Router);
Vue.use(Vuetify);
Vue.use(VeeValidate);

const store = new Vuex.Store(globalStore);
sync(store, router);

Vue.use(FlagIcon);
Vue.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:8080/";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  data() {
    return {
      breadcrumbs: []
    };
  },
  created() {
    this.$validator.localize("es", {
      messages: es.messages
    });

    this.$validator.localize("br", {
      messages: pt_BR.messages
    });

    //  this.$validator.localize('en', {
    //    messages: en.messages,
    //  });
  },
  render: h => h(App)
});
