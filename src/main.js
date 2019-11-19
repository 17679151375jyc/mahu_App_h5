// import 'amfe-flexible'
import Vue from 'vue';
import Cube from 'cube-ui'
import App from '@/App.vue';
import router from '@/router';
import store from "@/store/index";
import '@/stylus/index.styl';
import utils from "_libs/utils";

import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(Cube)
Vue.use(VueQuillEditor, {
    placeholder: '请简要描述您提交的内容，我们将尽快跟进处理。（请控制在600字以内）',
    modules: {
        toolbar: [
            ['image']
        ]
    }
})

/* eslint-disable no-unused-vars */
import VConsole from 'vconsole';
const vConsole = process.env.NODE_ENV === 'production' ? null : new VConsole();
// const vConsole = new VConsole();
// export default vConsole;

// import setConsole from './setVconsole'
// const setVcosole = new setConsole('#__vconsole');

// /* fundebug错误调试 */
// import * as fundebug from "fundebug-javascript";
// import fundebugVue from "fundebug-vue";
// fundebug.apikey = "ad1c06eb6e4e3f440702cf6c25b01afc5d08b6e15096587d97a09b10e70cdd32"
// fundebugVue(fundebug, Vue);

// import 'font-awesome/css/font-awesome.css'
//注册全局事件
window.eventBus = new Vue();
window.CYJ = window.CYJ || {};
// window.update = (res)=>{
//   eventBus.$emit('pushUpdate',res)
// }

// if (!utils.isIos()) {//Android返回键
//   window.CYJ.backPressCallback = [];
//   window.CYJ.onReceiveBackPressEvent = function () {
//     for (let i = 0; i < this.backPressCallback.length; i++) {
//       this.backPressCallback[i]()
//     }
//   };
//   window.CYJ.registerOnBackPressCallback = function (callback) {
//     this.backPressCallback.push(callback)
//   };
//   CYJ.unregisterOnBackPressCallback = function (callback) {
//     let index = this.backPressCallback.indexOf(callback);
//     if (index > -1) {
//       this.backPressCallback.splice(index, 1)
//     }
//   };
// }


import {
    post,
    fetch,
    patch,
    put
} from '_libs/http'
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

import VueTouch from 'vue-touch'
//import VueAMap from 'vue-amap';
Vue.use(VueTouch, {
    name: 'v-touch'
});

// 将window的方法直接加在vue的原型链上
Vue['prototype']['unescape'] = (str) => { //这个是将utf8转成utf16
    return window.unescape(str.replace(/\\u/g, "%u"));
}

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')