/**
 * @Descripttion: 过滤器
 * @version: 1.0
 * @Author: michael Huang
 * @Date: 2020-01-06 18:05:40
 * @LastEditors: michael Huang
 * @LastEditTime: 2020-01-06 18:05:40
 */

import store from "@/store/index";
import utils from "@/libs/utils";

/** 全局公共属性过滤 **/
export const systemInit = (code, typeName) => {
  let systemInitList = store.state.system.systemInitList;
  for(let item of systemInitList[typeName]) {
    if(code===item.code) {
      return item.name;
    }
  }
};

/** 优惠券价格过滤 **/
export const couponTypePrice = (code, type, couponInfo) => {
  if(type==="money") {
    return code===0 ? (utils.safetyInvoke(couponInfo, "price", "number", 1) * 10).toFixed(2) :
      code===1 ? utils.safetyInvoke(couponInfo, "price", "number", 1) : "";
  } else if (type==="unit") {
    return code===0 ? "折" : code===1 ? "元" : "";
  }
};

