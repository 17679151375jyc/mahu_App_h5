/*
 * @Descripttion:
 * @version:
 * @Author: Vencent Lum
 * @Date: 2019-12-13 15:05:40
 * @LastEditors: Vencent Lum
 * @LastEditTime: 2019-12-16 17:42:47
 */
import { throws } from "assert";

// import { resolve } from "url";
// import { reject } from "assert";

import axios from 'axios';
import COS from "cos-js-sdk-v5";
const version = 'v201912251759';

import store from "@/store/index";
import router from '@/router';
import user from "../store/module/user";
import layout from "../store/module/layout";
import plot from "../store/module/plot";

const typeFamily = 0;
const typeBusiness = 1;
const typeGate = 2;

let utils = {
    /**
     *  获取cookie
     */
    cookie() {
        return new Promise((resolve, reject) => {
            try {
                resolve(CYJ.cookie());
            } catch (e) {
              reject(e);
            }
        })
    },

    /**
     *  显示原生Tab蒙层
     */
    maskTabShow(...args) {
        return new Promise((resolve, reject) => {
            try {
                // CYJ.maskTabShow(37, 38, 45, 0.4);
                resolve("ok");
            } catch (e) {
              reject(e)
            }
        })
    },
    /**
     *  隐藏原生Tab蒙层
     */
    maskTabHide() {
        return new Promise((resolve, reject) => {
            try {
                // CYJ.maskTabHide();
                resolve("ok");
            } catch (e) {
              reject(e)
            }
        })
    },
    /**
     *  显示原生Tab
     */
    showTab() {
        return new Promise((resolve, reject) => {
            try {
                // CYJ.showTab();
                resolve('ok');
            } catch (e) {
              reject(e);
            }
        })
    },
    /**
     *  隐藏原生Tab
     */
    hideTab() {
        return new Promise((resolve, reject) => {
            try {
                // CYJ.hideTab();
                resolve('ok');
            } catch (e) {
              reject(e);
            }
        })
    },

    registerOnBackPressCallback(callback) {
        return new Promise((resolve, reject) => {
            try {
                CYJ.registerOnBackPressCallback(callback);
                resolve('ok');
            } catch (e) {
              reject(e);
            }
        })
    },

    /**
     *  微信分享方法
     */
    shareUrl(url, title, desc) {
      return new Promise((resolve, reject) => {
        try {
          CYJ.shareUrl(url, title, desc); //todo 之后要加个判断是否有安装微信
          resolve('ok');
        } catch (e) {
          reject(e);
        }
      })
    },

    /**
     *  获取设备的类型
     */
    getDeviceType() { //硬件调用的方法不同
        const u = navigator.userAgent;
        if (u.includes('Android') || u.includes('Linux')) {
            //安卓手机
            return `Android`
        } else if (u.includes('iPhone')) {
            //苹果手机
            return `ios`
        } else {
            //其它
            return null
        }
    },

    /**
     *  获取是否ios
     */
    isIos() { //硬件调用的方法不同
        // const u = navigator.userAgent;
        // if (u.includes('iPhone')) {//苹果手机
        //   return true
        // } else {
        //   return false
        // }
        const u = navigator.userAgent;
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isiOS;
    },

    /**
     *  获取用户ID
     */
    getUserId() {
        return new Promise((resolve, reject) => {
            try {
                resolve(CYJ.userID());
            } catch (e) {
                resolve(e);
            }
        })
    },

    /**
     *  获取用户通讯录
     */
    checkContacts() {
      return new Promise((resolve, reject) => {
        try {
          CYJ.checkContacts();
          resolve('ok');
        } catch (e) {
          reject(e);
        }
      })
    },
    /**
     *  获取用户通讯录
     */
    openContacts() {
      return new Promise((resolve, reject) => {
        try {
          CYJ.openContacts();
          resolve('ok');
        } catch (e) {
          resolve(e);
        }
      })
    },

    /**
     *  获取定位纬度
     */
    getLatitude() {
        return new Promise((resolve, reject) => {
            try {
                resolve(CYJ.getLatitude());
            } catch (e) {
                resolve(e);
            }
        })
    },
    /**
     *  获取定位经度
     */
    getLontitude() {
        return new Promise((resolve, reject) => {
            try {
                resolve(CYJ.getLontitude());
            } catch (e) {
                resolve(e);
            }
        })
    },

    /**
     *  启动人脸添加界面
     */
    openFace() {
        return new Promise((resolve, reject) => {
            try {
                CYJ.openFace();
                resolve('ok');
            } catch (e) {
                resolve(e);
            }
        })
    },

    /**
     *  启动备城门人脸添加界面
     */
    openFaceProp() {
        return new Promise((resolve, reject) => {
            try {
                CYJ.openFaceProp();
                resolve('ok');
            } catch (e) {
                resolve(e);
            }
        })
    },

    /**
     *  警情一分钟视频
     */
    openAlertVideo(accessToken, deviceNum, startTime, endTime) {
        return new Promise((resolve, reject) => {
            try {
                CYJ.openAlertVideo(accessToken, deviceNum, startTime, endTime);
                resolve('ok');
            } catch (e) {
                resolve(e);
            }
        })
    },

    /**
     *  启动萤石视频
     */
    openLiveVideo(accessToken, deviceNum) {
        return new Promise((resolve, reject) => {
            try {
                CYJ.openLiveVideo(accessToken, deviceNum);
                resolve('ok');
            } catch (e) {
                resolve(e);
            }
        })
    },
    /**
     *  启动萤石视频回放
     */
    openBackVideo(accessToken, deviceNum) {
        return new Promise((resolve, reject) => {
            try {
                CYJ.openBackVideo(accessToken, deviceNum);
                resolve('ok');
            } catch (e) {
                resolve(e);
            }
        })
    },
    /**
     *  启动萤石视频播放列表
     */
    openLiveVideoList(jsonString) {
        return new Promise((resolve, reject) => {
            try {
                CYJ.openLiveVideoList(jsonString);
                resolve('ok');
            } catch (e) {
                resolve(e);
            }
        })
    },

    /**
     *  获取自己的小区列表
     */
    comnunities() {
        return new Promise((resolve, reject) => {
            try {
                resolve(CYJ.comnunities());
            } catch (e) {
                resolve(null);
            }
        })
    },

    /**
     *  启动二维码扫描
     */
    openScan() {
      return new Promise((resolve, reject) => {
        try {
          CYJ.openScan();
        } catch (e) {
          resolve(e);
        }
      })
    },

    /**
     *  启动防盗主机配网
     */
    openMainframeConfig() {
        return new Promise((resolve, reject) => {
            try {
                CYJ.openWifiConfig();
                resolve('ok');
            } catch (e) {
                resolve(e);
            }
        })
    },

    /**
     *  启动摄像头配网
     */
    openCameraConfig() {
        return new Promise((resolve, reject) => {
            try {
                CYJ.openYSConfig();
                resolve('ok');
            } catch (e) {
                resolve(e);
            }
        })
    },

  /**
   *  调用原生支付接口
   */
  wxPay(mDataJson) {
    return new Promise((resolve, reject) => {
      let JSONDataJson = JSON.stringify(mDataJson);
      try {
        CYJ.wxPay(JSONDataJson);
        // CYJ.wxPay(mDataJson.appid, mDataJson.partnerid, mDataJson.prepayid, mDataJson.noncestr,
        //   mDataJson.timestamp, mDataJson.package, mDataJson.sign);
        resolve('ok');
      } catch (e) {
        console.log("wxPay",e);
        resolve(e);
      }
    })
  },
  onWxPay(status) {
    return new Promise((resolve, reject) => {
      try {
        window.onWxPay(status);
        resolve('ok');
      } catch (e) {
        resolve(e);
      }
    })
  },
  zfPay(mDataJson) {
    return new Promise((resolve, reject) => {
      try {
        CYJ.zfPay(mDataJson);
        resolve('ok');
      } catch (e) {
        console.log("zfPay",e);
        resolve(e);
      }
    })
  },
  onZfPay(status) {
    return new Promise((resolve, reject) => {
      try {
        window.onZfPay(status);
        resolve('ok');
      } catch (e) {
        resolve(e);
      }
    })
  },

    /**
     *  计算app缓存
     */
    getDataSize() {
        CYJ.getDataSize();
        // return new Promise((resolve,reject)=>{
        //   try{
        //     CYJ.getDataSize();
        //     resolve('ok');
        //   } catch(e) {
        //     resolve(e);
        //   }
        // })
    },
    /**
     *  计算app缓存Str
     */
    getDataSizeStr() {
        CYJ.getDataSizeStr();
        // return new Promise((resolve,reject)=>{
        //   try{
        //     CYJ.getDataSizeStr();
        //     resolve('ok');
        //   } catch(e) {
        //     resolve(e);
        //   }
        // })
    },
    /**
     *  清除app缓存
     */
    clearAppCache() {
        return new Promise((resolve, reject) => {
            try {
                CYJ.clearAppCache();
                resolve('ok');
            } catch (e) {
                resolve(e);
            }
        })
    },

    /**
     *  检查更新
     */
    checkUpdate() {
        return new Promise((resolve, reject) => {
            try {
                CYJ.checkUpdate();
                resolve('ok');
            } catch (e) {
                resolve(e);
            }
        })
    },

    /**
     *  启动帮助页面
     */
    openUserHelperConfig() {
        return new Promise((resolve, reject) => {
            try {
                CYJ.openUserHelper();
                resolve('ok');
            } catch (e) {
                resolve(e);
            }
        })
    },

    /**
     *  初始化推送方法
     */
    setPushAlias(phone, plotID) {
        return new Promise((resolve, reject) => {
            try {
                CYJ.setPushAlias(phone, plotID);
                resolve('ok');
            } catch (e) {
                resolve(e);
            }
        })
    },

    /**
     *  传路由地址给原生
     */
    changePage(path) {
        return new Promise((resolve, reject) => {
            try {
                CYJ.changePage(path);
                resolve('ok');
            } catch (e) {
                resolve(e);
            }
        })
    },

    /**
     *  退出方法
     */
    logout() {

      // store.dispatch('setAreaTypesList', []);

      store.replaceState({user:{}, layout:{}, plot:{}});
      window.localStorage.clear();

      return new Promise((resolve, reject) => {
        try {
          if (CYJ && CYJ.logout) {
            // store.dispatch('setApp', 'app');
            CYJ.setPushAlias("", ""); //清空推送
            // setTimeout(() => {
            //   CYJ.logout();
            // },200)
            CYJ.logout();
          } else {
            if(window.location.hash==null || window.location.hash.indexOf("login")===-1){
              window.location.reload();
            }
          }
            resolve('ok');
          } catch (e) {
            console.log(e);
            resolve(e);
          }
        })
    },

    /**
     *  退出顶部Activity
     */
    finishTop() {
        return new Promise((resolve, reject) => {
            try {
                CYJ.finishTop();
                resolve('ok');
            } catch (e) {
                resolve(e);
            }
        })
    },

    /**
     *  tamp是一个时间戳，可以是9位或者13位，obj表示日期格式，如YY-MM-DD，其它则返回YY-MM-DD hh:mm:ss
     */
    timetrans(TAMP, obj) {
        let now = TAMP > 1000000000000 ? new Date(TAMP) : new Date(TAMP * 1000); //预防千年虫
        let year = now.getFullYear();
        let month = now.getMonth() + 1 > 9 ? now.getMonth() + 1 : `0${now.getMonth()+1}`;
        let date = now.getDate() > 9 ? now.getDate() : `0${now.getDate()}`;
        let hour = now.getHours() > 9 ? now.getHours() : `0${now.getHours()}`;
        let minute = now.getMinutes() > 9 ? now.getMinutes() : `0${now.getMinutes()}`;
        let second = now.getSeconds() > 9 ? now.getSeconds() : `0${now.getSeconds()}`;
        if (obj == "yymm") {
            return `${year}-${month}`
        } else if (obj == "yymmdd") {
            return `${year}-${month}-${date}`
        } else if (obj == "YYMMDD") {
          return `${year}年${month}月${date}日`
        } else if (obj == "hhmmss") {
            return `${hour}:${minute}:${second}`
        } else if (obj == "yymmddhhmm") {
            return `${year}-${month}-${date} ${hour}:${minute}`
        } else if (obj == "mmddhhmm") {
            return `${month}-${date} ${hour}:${minute}`
        } else if (obj == "版本号") { //todo 去掉，没用了
            return year + month + date + hour + minute + second;
        } else return `${year}-${month}-${date} ${hour}:${minute}:${second}`
    },
    /**
     *  获取星期几
     */
    toWeek(TAMP) {
        const allWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        let now = TAMP > 1000000000000 ? new Date(TAMP) : new Date(TAMP * 1000); //预防千年虫
        return allWeek[now.getDay()];
    },
    /**
     *  second是一个秒数，返回时间格式
     */
    secondTrans(second) {
        let d = Math.floor(second / 60 / 60 / 24);
        let h = Math.floor(second / 60 / 60 % 24);
        let m = Math.floor(second / 60 % 60);
        let s = Math.floor(second % 60);
        d = this.checkTimeRemove0(d) === "" ? "" : d;
        h = this.checkTimeRemove0(h) === "" ? "" : this.checkTimeAdd0(h);
        m = this.checkTimeAdd0(m);
        s = this.checkTimeAdd0(s);
        if (d === "" && h !== "") {
            return h + ":" + m + ":" + s;
        } else if (d === "" && h === "") {
            return m + ":" + s;
        } else {
            return d + " " + h + ":" + m + ":" + s;
        }
    },
    /**
     *  补0去0
     */
    checkTimeAdd0(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    },
    /**
     *  去0
     */
    checkTimeRemove0(i) {
        if (i === 0) {
            i = "";
        }
        return i;
    },

  /**
   *  url解析
   */
  urlParse(urlStr){
    let obj = {};
    let reg = /[?&][^?&]+=[^?&%]+/g;
    let arr = urlStr.match(reg);
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
    return obj;
  },

    /**
     *  获取文件的base64编码
     */
    toFileBase64(target) {
        return new Promise((resolve, reject) => {
            if (target instanceof Object) {
                let readFile = new FileReader();
                readFile.readAsDataURL(target);
                readFile.onload = function() {
                    if (this.result) {
                        //console.log(typeof target)
                        resolve(this.result)
                    } else {
                        reject('读取文件失败')
                    }

                }
            } else throw `希望传入的数据类型是object,传入的是${ typeof target}`
        })
    },

    /**
     *  保存本地数据方法
     */
    localStorage(key, value) {
        value = value instanceof Object ? JSON.stringify(value) : value;
        return new Promise((resolve, reject) => {
            if (window.localStorage) {
                localStorage.setItem(key, value);
                resolve('suceess')
            } else {
                reject('error')
            }
        })
    },

    /**
     *  获取字符宽度，汉字算两个单位宽度
     */
    getStringLen(str) {
        let len = 0;
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                len += 2;
            } else {
                len++;
            }
        }
        return len;
    },

    /**
     *  阻止点击事件冒泡
     */
    stopBubbling(e) {
        e = window.event || e;
        if (e.stopPropagation) {
            e.stopPropagation(); //阻止事件 冒泡传播
        } else {
            e.cancelBubble = true; //ie兼容
        }
    },

    /**
     *  回车符转换
     */
    changeEnter(str) {
        return str.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>").replace(/\r/g, "<br>");
    },

    /**
     *  手机号码隐藏方法
     */
    hiddenPhoneNum(phoneNum) {
        if (phoneNum.length === 11) //todo 仅限中国大陆手机
            return phoneNum.substring(0, 3) + "****" + phoneNum.substring(7, 11);
    },

    /**
     *  证件号码隐藏方法
     */
    hiddenIdentityCardNum(identityCard) {
        let len = identityCard.length;
        let starStr = "";
        for (let count = 0; count < len - 2; count++) {
            starStr = starStr + "*";
        }
        return identityCard.substring(0, 1) + starStr + identityCard.substring(len - 1, len);
    },

    /**
     *  号码验证
     */
    numberVerification(type, value) {
      let identityCardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
      // let identityCardReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      // let telephoneReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      let telephoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
      // let telephoneReg = /^1[3|4|5|8][0-9]\d{4,8}$/;
      // let passwordReg = /^(?![^a-zA-Z]+$)(?!\D+$){6,18}/;
      let passwordReg = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,18})$/; //配合java
      // let passwordReg = /^[0-9a-zA-Z]{6,18}$/;
      // let carNumberReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]{1}$/;
      // let carNumberReg = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z0-9]{4}$)|(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/;
      let carNumberReg = /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/;
      let xCarNumberReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;

      let carNumberReg1 = /[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新使]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{5}$/;
      let carNumberReg2 = /[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[挂警学领港澳]{1}$/;
      let carNumberReg3 = /^WJ[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]?[A-HJ-NP-Z0-9]{5}$/;
      let carNumberReg4 = /[A-HJ-NP-Z]{2}[0-9]{5}$/;
      let carNumberReg5 = /[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]{1}[A-Z]{1}[DF]{1}[A-HJ-NP-Z0-9]{5}$/;
      let carNumberReg6 = /[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{5}[DF]{1}$/;

        if (type === "identityCard") { //todo 中国大陆居民身份证 15位和18位
            return identityCardReg.test(value);
        } else if (type === "telephone") { //todo 中国大陆手机号码
            return telephoneReg.test(value);
        } else if (type === "password") { //todo 密码为数字与字母组成，6-12位
            return passwordReg.test(value);
        } else if (type === "carNumber") {
          let isCarNumber = false;
          console.log(carNumberReg1.test(value), carNumberReg.test(value))
          if(carNumberReg1.test(value) || carNumberReg2.test(value) || carNumberReg3.test(value) ||
            carNumberReg4.test(value) || carNumberReg5.test(value) || carNumberReg6.test(value)) {
            isCarNumber = true;
            return isCarNumber;
          }
            // if (value.length === 7) {
            //     return carNumberReg.test(value);
            // } else if (value.length === 8) {
            //     return xCarNumberReg.test(value);
            // }
        }
    },

    /**
     *  input组件强制丢失焦点
     */
    inputBlur(inputID) {
        let mInputBlur = document.getElementById(inputID);
        mInputBlur.blur();
    },

    /**
     *  对象数组去重
     */
    uniqueArray(arr, itemKey) {
        let result = {};
        let finalResult = [];
        for (let count = 0; count < arr.length; count++) {
            result[arr[count][itemKey]] = arr[count];
            //因为arr[count].key不能重复,达到去重效果,且这里必须知晓"key"或是其他键名
        }
        //现在result内部都是不重复的对象了，只需要将其键值取出来转为数组即可
        let item = {};
        for (item in result) {
            finalResult.push(result[item]);
        }
        return finalResult;
    },

    /**
     *  判空
     */
    isEmpty(value) {
        if (value === null || value === undefined) {
            return true;
        } else {
            return false;
        }
    },
    /**
     *  判空（+字符串）
     */
    isEmptyAddStr(value) {
        if (value === null || value === undefined || value === "") {
            return true;
        } else {
            return false;
        }
    },
    /**
     *  判空（+字符串+对象）
     */
    isEmptyAddStrAddObj(value) {
        if (value === null || value === undefined || value === "" || value === {}) {
            return true;
        } else {
            return false;
        }
    },

    /**
     *  判断是否包含字符串
     */
    isStrInclude(value, includeValue) {
        let isInclude = false;
        isInclude = value.indexOf(includeValue) !== -1;
        return isInclude
    },

    /**
     *  COS上传方法
     */
    toCOSUpLoad(file) {
        let cos = new COS({
            getAuthorization: function(options, callback) {
                axios.post("http://244255m67e.zicp.vip:54496/FamilyAccount/cos/key", {
                    linkNumber: 'sdf4safd5s74df57sfa4sdf55fdsf'
                }).then(response => {
                    callback({
                        TmpSecretId: response.data.data.tmpSecretId,
                        TmpSecretKey: response.data.data.tmpSecretKey,
                        XCosSecurityToken: response.data.data.sessionToken,
                        ExpiredTime: response.data.data.expiredTime
                    });
                });
            }
        });

        let urlArray = [];
        for (let count = 0; count < file.length; count++) {
            if (file[count].type.split("/")[0] !== "image") {
                const toast = this.$createToast({
                    type: 'warn',
                    txt: "请选择正确的图片类型上传"
                });
                toast.show();
                return;
            }
            // self.form.info.files[name].isLoading = true;
            return new Promise((resolve, reject) => {
                cos.sliceUploadFile({
                        Bucket: 'family-1257195390',
                        Region: 'ap-guangzhou',
                        Key: "/web/service/" + "family-" +
                            new Date().getTime() +
                            "-" +
                            Math.ceil(Math.random() * 100) +
                            "." +
                            file[count].type.split("/")[1],
                        Body: file[count]
                    },
                    (err, data) => {
                        // self.form.info.files[name].isLoading = false;
                        if (err) {
                            const toast = this.$createToast({
                                type: 'warn',
                                txt: "照片上传出现错误!"
                            });
                            toast.show();
                        }
                        console.log(data.Location);
                        // self.form.info.files[name].path = "https://" + data.Location;
                        urlArray.push("https://" + data.Location);
                        if (file.length === count + 1) {
                            resolve(urlArray);
                        }
                    }
                );
            })
        }
    },

    // cos: {
    //   bucket: "",
    //   region: ""
    // }

    getAppVersion() {
      return new Promise((resolve, reject) => {
        try {
          CYJ.getAppVersion();
          resolve('ok');
        } catch (e) {
          resolve(e);
        }
      })
    },

    returnVersion() {
        // return process.env.VUE_APP_Version;
        return version;
    },

    returnTypeFamily() {
        return typeFamily;
    },
    returnTypeBusiness() {
        return typeBusiness;
    },
    returnTypeGate() {
        return typeGate;
    },
    /**
     * @name: 对象属性安全调用
     * @msg:  判断一个对象里面是否含有某个属性，并且输出成希望的数据类型
     * @param {target<Object>,key<String>,outputType<string|number>, defaultOutput:缺省值}
     * @return: 希望的数据类型
     */
    safetyInvoke(target = null, key = 'unknow', outputType, defaultOutput='unknow'){
       if(!target){
          return defaultOutput;
       }
       else if(target instanceof Object && target.hasOwnProperty(key) ){
            if(typeof target[key] == outputType){
                return target[key];
            }else {
                 let output = defaultOutput;
                 switch (outputType) {
                     case 'string':
                         try {
                            output = target[key].toString();
                         } catch (error) {
                            output = defaultOutput;
                            console.error('object :', error);
                         }
                         break;
                     case 'number':
                        try {
                            output = isNaN(parseInt(target[key]))? defaultOutput : parseInt(target[key]);
                         } catch (error) {
                            output = defaultOutput;
                            console.error('object :', error);
                         }
                         break;
                     default:
                         break;
                 }
                 return output;
            }
        }else {
            return defaultOutput
        }
    },

    getImageUrl(url,w,h){
      w = w || 64;
      h= h|| 64;
      if(url &&url.length>0 &&  url.indexOf('family-1257195390.cos.ap-guangzhou.myqcloud.com')!=-1){
        return url.replace('family-1257195390.cos.ap-guangzhou.myqcloud.com','family-1257195390.picgz.myqcloud.com')+'?imageMogr2/thumbnail/'+(w +'x'+h);
      }
      return url;
    },



}

export default utils