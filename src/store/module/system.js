/**
 * @Time  : 2020-01-07 09:39:45
 * @Author: michael huang
 * @File  : system.js
 * @LastEditors:  michael huang
 * @LastEditTime: 2020-01-07 09:39:45
 */

export default {
    state: {
      systemInitList: {}
    },
    mutations: {
      setSystemInitListNative(state, systemInitList) {
        state.systemInitList = systemInitList
      },
    },
    getters: {},
    actions: {
      setSystemInitList({ commit }, systemInitList) {
        commit('setSystemInitListNative', systemInitList);
      },
    },
}