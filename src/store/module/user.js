/**
 * @Time  : 2019/08/15 16:16
 * @Author: michael huang
 * @File  : user.js
 */

// import { login } from '@/api/user'
export default {
    state: {
      userInfo: {},
      userID: '',
      userToken: '',
      userNickName: '',
      userRealName: '',
      userHeadPortrait: '',//用户头像
      userPhone: '',
      userIdCard: '',
      userHasProprietor: '',//是否加入社区
      userPlotList: [],//社区列表
      areaTypesList: [],//权限列表

      isShowMinePop: false,
      isShowOtherPop: false,

      pushInfo: '',

      appPath: '',//当前页面
    },
    mutations: {
      setUserInfoNative(state, userInfo) {
        state.userInfo = userInfo
      },
      setUserIDNative(state, userID) {
        state.userID = userID
      },
      setUserTokenNative(state, userToken) {
        state.userToken = userToken
      },
      setUserNickNameNative(state, userNickName) {
        state.userNickName = userNickName
      },
      setUserRealNameNative(state, userRealName) {
        state.userRealName = userRealName
      },
      setUserHeadPortraitNative(state, userHeadPortrait) {
        state.userHeadPortrait = userHeadPortrait
      },
      setUserPhoneNative(state, userPhone) {
        state.userPhone = userPhone
      },
      setUserIdCardNative(state, userIdCard) {
        state.userIdCard = userIdCard
      },
      setUserHasProprietorNative(state, userHasProprietor) {
        state.userHasProprietor = userHasProprietor
      },
      setUserPlotListNative(state, userPlotList) {
        state.userPlotList = userPlotList
      },
      setAreaTypesListNative(state, areaTypesList) {
        state.areaTypesList = areaTypesList
      },

      setIsShowMinePopNative(state, isShowMinePop) {
        state.isShowMinePop = isShowMinePop
      },
      setIsShowOtherPopNative(state, isShowOtherPop) {
        state.isShowOtherPop = isShowOtherPop
      },

      setPushInfoNative(state, pushInfo) {
        state.pushInfo = pushInfo
      },

      setAppPathNative(state, appPath) {
        state.appPath = appPath
      }
    },
    getters: {

    },
    actions: {
      setUserInfo({ commit }, userInfo) {
        commit('setUserInfoNative', userInfo);
      },
      setUserID({ commit }, userID) {
        commit('setUserIDNative', userID);
      },
      setUserToken({ commit }, userToken) {
        commit('setUserTokenNative', userToken);
      },
      setUserNickName({ commit }, userNickName) {
        commit('setUserNickNameNative', userNickName);
      },
      setUserRealName({ commit }, userRealName) {
        commit('setUserRealNameNative', userRealName);
      },
      setUserHeadPortrait({ commit }, userHeadPortrait) {
        commit('setUserHeadPortraitNative', userHeadPortrait);
      },
      setUserPhone({ commit }, userPhone) {
        commit('setUserPhoneNative', userPhone);
      },
      setUserIdCard({ commit }, userIdCard) {
        commit('setUserIdCardNative', userIdCard);
      },
      setUserHasProprietor({ commit }, userHasProprietor) {
        commit('setUserHasProprietorNative', userHasProprietor);
      },
      setUserPlotList({ commit }, userPlotList) {
        commit('setUserPlotListNative', userPlotList);
      },
      setAreaTypesList({ commit }, areaTypesList) {
        commit('setAreaTypesListNative', areaTypesList);
      },

      setIsShowMinePop({ commit }, isShowMinePop) {
        commit('setIsShowMinePopNative', isShowMinePop);
      },
      setIsShowOtherPop({ commit }, isShowOtherPop) {
        commit('setIsShowOtherPopNative', isShowOtherPop);
      },

      setPushInfo({ commit }, pushInfo) {
        commit('setPushInfoNative', pushInfo);
      },

      setAppPath({ commit }, appPath) {
        commit('setAppPathNative', appPath);
      }
    }
}