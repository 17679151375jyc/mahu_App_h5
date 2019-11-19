/**
 * @Time  : 2019/09/05 16:16
 * @Author: michael huang
 * @File  : layout.js
 */

export default {
  state: {
    isImmersion: false,//是否沉浸式布局
    myHomeWork: {alertTab: 0,maintainTab: 0},
    isDeleteShareMachine: false,//是否删除共享成员，用作两个页面刷新需要
    indexPageTabIndex: 0,
    indexFamilyPageTabIndex: 0,

    isShowDoorListGatePop: false
  },
  mutations: {
    setIsImmersionNative(state, isImmersion) {
      state.userInfo = isImmersion
    },
    setMyHomeWorkNative(state, myHomeWork) {
      state.myHomeWork = myHomeWork
    },
    setIsDeleteShareMachineNative(state, isDeleteShareMachine) {
      state.isDeleteShareMachine = isDeleteShareMachine
    },
    setIndexPageTabIndexNative(state, indexPageTabIndex) {
      state.indexPageTabIndex = indexPageTabIndex
    },
    setIndexFamilyPageTabIndexNative(state, indexFamilyPageTabIndex) {
      state.indexFamilyPageTabIndex = indexFamilyPageTabIndex
    },

    setIsShowDoorListGatePopNative(state, isShowDoorListGatePop) {
      state.isShowDoorListGatePop = isShowDoorListGatePop
    },

  },
  getters: {

  },
  actions: {
    setIsImmersion({ commit }, isImmersion) {
      commit('setIsImmersionNative', isImmersion);
    },
    setMyHomeWork({ commit }, myHomeWork) {
      commit('setMyHomeWorkNative', myHomeWork);
    },
    setIsDeleteShareMachine({ commit }, isDeleteShareMachine) {
      commit('setIsDeleteShareMachineNative', isDeleteShareMachine);
    },
    setIndexPageTabIndex({ commit }, indexPageTabIndex) {
      commit('setIndexPageTabIndexNative', indexPageTabIndex);
    },
    setIndexFamilyPageTabIndex({ commit }, indexFamilyPageTabIndex) {
      commit('setIndexFamilyPageTabIndexNative', indexFamilyPageTabIndex);
    },

    setIsShowDoorListGatePop({ commit }, isShowDoorListGatePop) {
      commit('setIsShowDoorListGatePopNative', isShowDoorListGatePop);
    },
  }
}
