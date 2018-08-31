import routes from "../../app/router/routes";
import Router from "vue-router";

const router = new Router({
  waitForData: true,
  routes,
  mode: "history"
});

export default router;
