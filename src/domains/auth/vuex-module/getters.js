export default {
  isAuthenticated(state) {
    return state.token !== null;
  },
  user(state) {
    return state.user;
  },
  token(state) {
    return state.token;
  },
  isLogging(state) {
    return state.logging;
  },
  isSenhaErrada(state) {
    return state.senhaErrada;
  },
  getLocalization(state) {
    return state.localization;
  },
  getPerfis(state) {
    return state.perfis;
  }
};
