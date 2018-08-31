import { updateField } from "vuex-map-fields";

export default {
  updateField,
  /* Quando é detectado que o usuário não tem permissão para acessar alguma funcionalidade de app
    * o token á settado para null.
    */
  authUser(state, userData) {
    state.token = userData.token;
  },
  setUser(state, userData) {
    state.user = userData.user;
  },
  clearAuthData(state) {
    state.token = null;
  },
  logging(state, data) {
    state.logging = data.logging;
  },
  setSenhaErrada(state, data) {
    state.senhaErrada = data.senhaErrada;
  },
  localization(state, data) {
    state.localization = data;
  },
  perfis(state, data) {
    state.perfis = data;
  },
  email(state, data) {
    state.email = data;
  },
  password(state, data) {
    state.password = data;
  }
};
