import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueGapi from "vue-gapi";

const config = {
  apiKey: process.env.API_KEY,
  clientId: '102304335748-hql78fc75ij3fhv2eo1ee35hm7ckcmub.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/drive',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
}

Vue.config.productionTip = false;

Vue.use(VueGapi, config);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
