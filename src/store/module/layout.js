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
    indexPageTabKey: "",
    indexFamilyPageTabIndex: 0,

    isShowDoorListGatePop: false,
    showVisitorPopList: [],//用户已看出入首页记录列表
    isReadNoticeNumber: [],//用户已读社区通知记录列表

    isUntreated: {
      gatePlotApplyIsUntreated: false,
      gateCarApplyIsUntreated: false,
      gateFeedbackIsUntreated: false,
      feedbackIsUntreated: false,
      notificationIsUntreated: false,
    }
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
    setIndexPageTabKeyNative(state, indexPageTabKey) {
      state.indexPageTabKey = indexPageTabKey
    },
    setIndexFamilyPageTabIndexNative(state, indexFamilyPageTabIndex) {
      state.indexFamilyPageTabIndex = indexFamilyPageTabIndex
    },

    setIsShowDoorListGatePopNative(state, isShowDoorListGatePop) {
      state.isShowDoorListGatePop = isShowDoorListGatePop
    },
    setShowVisitorPopListNative(state, showVisitorPopInfo) {
      state.showVisitorPopList.push(showVisitorPopInfo);
    },

    setIsUntreatedNative(state, isUntreatedInfo) {
      if(state.isUntreated){
        state.isUntreated[isUntreatedInfo.key] = isUntreatedInfo.value
      }

    }
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
    setIndexPageTabKey({ commit }, indexPageTabKey) {
      commit('setIndexPageTabKeyNative', indexPageTabKey);
    },
    setIndexFamilyPageTabIndex({ commit }, indexFamilyPageTabIndex) {
      commit('setIndexFamilyPageTabIndexNative', indexFamilyPageTabIndex);
    },

    setIsShowDoorListGatePop({ commit }, isShowDoorListGatePop) {
      commit('setIsShowDoorListGatePopNative', isShowDoorListGatePop);
    },
    setShowVisitorPopList({ commit }, showVisitorPopInfo) {
      commit('setShowVisitorPopListNative', showVisitorPopInfo);
    },

    setIsUntreated({ commit }, isUntreatedInfo) {
      commit('setIsUntreatedNative', isUntreatedInfo);
    }
  }
}
