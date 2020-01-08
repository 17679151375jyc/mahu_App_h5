
import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import plot from './module/plot'
import layout from './module/layout'
import system from './module/system'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex);

 const store =  new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
    },

    mutations: {
      //
    },
    actions: {
      //
    },
    modules: {
        user, layout, plot, system
    }
});

export default store