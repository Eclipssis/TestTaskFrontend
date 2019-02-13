import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import store from "./store";
import CKEditor from "@ckeditor/ckeditor5-vue";

Vue.config.productionTip = false;

Vue.use(CKEditor);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
