import Vue from 'vue';
import App from './App.vue';
import AppPanel from './components/AppPanel.vue';
import './style.css';

Vue.config.productionTip = false;

// register it once so we can use this panel anywhere
Vue.component('AppPanel', AppPanel);

new Vue({
  render: function (h) {
    return h(App);
  }
}).$mount('#app');
