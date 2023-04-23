import Vue from 'vue'
import App from './App'
import {JerryRequest} from "util/api.js"
import store from "./store/index.js"
import msgstore from "@/store/msg.js"
Vue.prototype.$JerryRequest = JerryRequest;
Vue.config.productionTip = false;
App.mpType = 'app'
import {JerrySecond} from "util/api.js"
import uView from '@/uni_modules/uview-ui'
Vue.prototype.$JerryRequest=JerryRequest;
Vue.prototype.$JerrySecond=JerrySecond;
import {api} from '@/util/interface.js'// 1、引入app.js
import {Inter} from "@/util/Intercepter.js"

const Demo = Vue.extend({});
const d = new Demo();
Vue.prototype.x = d;
Vue.prototype.$ws_url = "ws://localhost:8080";
Vue.prototype.$api = api;
Vue.prototype.$Inter = Inter;
Vue.use(uView);



const app = new Vue({
    ...App,
	store,
	msgstore,
})
app.$mount()
