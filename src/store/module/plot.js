/**
 * @Time  : 2019/09/15 16:16
 * @Author: michael huang
 * @File  : plot.js
 */

export default {
    state: {
      familyPlotList: [],//家庭社区列表

      propertyManagePlotNumber: "",//备城门社区number
      propertyManagePlotName: "",//备城门社区名称

      isPlotBlankDomicile: true,
    },
    mutations: {
      setFamilyPlotListNative(state, familyPlotList) {
        state.familyPlotList = familyPlotList
      },
      setPropertyManagePlotNumberNative(state, propertyManagePlotNumber) {
        state.propertyManagePlotNumber = propertyManagePlotNumber
      },
      setPropertyManagePlotNameNative(state, propertyManagePlotName) {
        state.propertyManagePlotName = propertyManagePlotName
      },
      setIsPlotBlankDomicileNative(state, isPlotBlankDomicile) {
        state.isPlotBlankDomicile = isPlotBlankDomicile
      }
    },
    getters: {

    },
    actions: {
      setFamilyPlotList({ commit }, familyPlotList) {
        commit('setFamilyPlotListNative', familyPlotList);
      },
      setPropertyManagePlotNumber({ commit }, propertyManagePlotNumber) {
        commit('setPropertyManagePlotNumberNative', propertyManagePlotNumber);
      },
      setPropertyManagePlotName({ commit }, propertyManagePlotName) {
        commit('setPropertyManagePlotNameNative', propertyManagePlotName);
      },
      setIsPlotBlankDomicile({ commit }, isPlotBlankDomicile) {
        commit('setIsPlotBlankDomicileNative', isPlotBlankDomicile);
      },
    }
}