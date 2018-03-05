// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import $ from 'jquery'

Vue.config.productionTip = false
/* eslint-disable no-new */
let vm = new Vue({
  el: '#designForm',
  data: {
    id: $('#designForm').data('id'),
    device: 'pc',
    isIE: (!!window.ActiveXObject || "ActiveXObject" in window) ? true : false
  },
  components: {
    App
  }
})
