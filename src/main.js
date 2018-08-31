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

const PaginasPerfis = new Map();
PaginasPerfis.set("CONDOMINO", [
  "/",
  "/login",
  "/dashboard",
  "/ultimasVotacoes"
]);
PaginasPerfis.set("ADMIN", [
  "/",
  "/login",
  "/dashboard",
  "/usuarios",
  "/perfis",
  "/novoUsuario",
  "/editarUsuario"
]);

const openPaths = ["/login"];

const checarPermissoes = to => {
  for (let x = 0; x <= store.state.user.perfis.length; x++) {
    if (
      PaginasPerfis.get(store.state.user.perfis[x]) &&
      PaginasPerfis.get(store.state.user.perfis[x]).includes(to.path)
    ) {
      return true;
    }
  }
  return false;
};

//TODO: ver forma melhor de fazer isto aqui
const checkarLocalStorage = () => {
  localforage.getItem("token").then(res => {
    if (res === null) {
      router.push("login");
    }
  });

  return true;
};

const checkToken = (to, from, next) => {
  if (
    (store.state.token != null &&
      checarPermissoes(to) &&
      checkarLocalStorage()) ||
    openPaths.includes(to.path)
  ) {
    next();
  } else {
    next("/login");
  }
};

router.beforeEach((to, from, next) => {
  checkToken(to, from, next);
});

Vue.use(FlagIcon);

Vue.config.productionTip = false;

axios.defaults.baseURL = "http://localhost:8080/";

const resInterceptor = axios.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    if (error.response.status == HTTPStatus.FORBIDDEN) {
      localforage.setItem("token", null);
      router.push("login");
    }
    // cancela o tratamento de erro e passa direto
    return Promise.reject(error);
  }
);

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
