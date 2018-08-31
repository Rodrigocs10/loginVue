import axios from "axios";
import localforage from "localforage";
import HTTPStatus from "http-status";

//import router from "App/router";
import queryString from "query-string";
// import Router from 'vue-router'
// import Vue from 'vue'
// Vue.use(Router)
import router from "../../../app/router";
export default {
  signup({ commit }, authData) {},
  login({ commit, dispatch }, authData) {
    // muda o estado de logging para true usando o mutation logging
    commit("logging", { logging: true });

    // configura o client axios
    const client = axios.create({
      headers: {
        "Content-Type": "application/json"
      }
    });

    // authData foi passado por parametro em Login.vue:
    // this.$store.dispatch
    client
      .post("/login", {
        email: authData.email,
        senha: authData.senha
      })
      .then(res => {
        const now = new Date();
        // TODO: expirationDate não está sendo usado
        const expirationDate = new Date(
          now.getTime() + res.data.expiresIn * 1000
        );

        // Pega o token que retornou e setta no header do axios, depois faz a requisição
        if (res.status === HTTPStatus.OK) {
          axios.defaults.headers.common["Authorization"] =
            res.headers.authorization;
          var config = {
            params: { value: authData.email }
            //headers: {Authorization: res.headers.authorization}
          };

          // Salva o token no cliente
          localforage.setItem("token", res.headers.authorization).then(() => {
            // Muda o status do token para o valor do token
            commit("authUser", {
              token: res.headers.authorization
            });

            // 1. Faz requisição de perfis da aplicação (Não do cliente) e salva no state de perfis
            // 2. O state de logging é settado para false
            // 3. Redireciona para rota raiz, que no case carrega Home.vue
            axios.get("/perfis", config).then(res => {
              commit("perfis", {
                perfis: res.data
              });
              commit("logging", { logging: false });

              // 1. Carrega o dados do usuario
              // 2. Setta status de logging para false
              axios.get("/usuarios/email", config).then(res => {
                commit("setUser", { user: res.data });
                commit("logging", { logging: false });
                router.push("/");
              });
            });
          });
        }
      })
      .catch(error => {
        if (error.response.status == HTTPStatus.UNAUTHORIZED) {
          commit("setSenhaErrada", { senhaErrada: true });
          commit("logging", { logging: false });
          router.push("/");
        }
      });
  },
  logout({ commit }) {
    commit("clearAuthData");
    localforage.removeItem("token");
    // this.$router.replace("/login");
  },
  setLocalization({ commit }, data) {
    commit("localization", data.localization);
  }
};
