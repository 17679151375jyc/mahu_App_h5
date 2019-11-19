import axios from 'axios';
import utils from "_libs/utils";
import {
    Toast,
    Dialog
} from 'cube-ui';
import Vue from 'vue';
Vue.use(Toast);
Vue.use(Dialog);

import appData from '../app_data';
import store from '@/store';
import md5 from '@/md5';

// const api = 'http://192.168.31.186:8089';//开发
// const apiHome = 'http://192.168.31.122:8181';//开发
// const api = 'http://172.31.1.179:8080';//测试
// const apiHome = 'http://172.31.1.179:8181';//测试
// const api = process.env.NODE_ENV == 'development' ? 'http://192.168.31.186:8089' : 'http://172.31.1.179:8080';//测试
// const apiHome = process.env.NODE_ENV == 'development' ? 'http://192.168.31.122:8181' : 'http://172.31.1.179:8181';//测试
const apiTest = 'https://www.easy-mock.com/mock/5c9f8120e4186562cc16569a';
const apiBaseUrl = '/FamilyJava'; //基础路径 /FamilyAccount
const baseClientUrl = '/FamilyJava/client'; //用户端基础路径
const iosViopUrl = '/FamilyJava/client/updateIosViopToken'; //接口路径-更新IOS推送模块
const loginUrl = '/FamilyJava/client/login'; //接口路径-登录模块
const commonUrl = '/FamilyJava/client/common'; //接口路径-账号模块
const codeUrl = '/FamilyJava/client/code'; //接口路径-验证码模块
const getCodeUrl = '/FamilyJava/client/getCode'; //接口路径-验证码模块
const forgetUrl = '/FamilyJava/client/forget'; //接口路径-忘记密码模块
const changeUrl = '/FamilyJava/client/change'; //接口路径-更换手机模块
const clientUpdateUrl = '/FamilyJava/client/update'; //接口路径-更新账号模块
const entryUrl = '/FamilyJava/client/entry'; //接口路径-出入模块
const recordUrl = '/FamilyJava/client/record'; //接口路径-出入记录模块
const communityUrl = '/FamilyJava/client/community'; //接口路径-社区记录模块
const domicileUrl = '/FamilyJava/client/domicile'; //接口路径-社区模块
const applyPackageUrl = '/FamilyJava/client/applyPackage'; //接口路径-套餐模块
const plotPackageUrl = '/family/server/plotPackage'; //接口路径-“备城门”套餐模块
const comUrl = '/FamilyJava/client/com'; //接口路径-省市区街道模块
const gateCommunityUrl = '/FamilyJava/server/community'; //接口路径-备城门社区记录模块
const hAreaUrl = '/family/server/area'; //接口路径-我家区域模块
const hCommonUrl = '/family/server/common'; //接口路径-我家区域模块
const machineUrl = '/family/server/machine'; //接口路径-主机模块
const alertMessageUrl = '/family/server/alertMessage'; //接口路径-报警模块
const maintainMessageUrl = '/family/server/maintainMessage'; //接口路径-维保模块
const aMMessageAmassUrl = '/family/server/aMMessageAmass'; //接口路径-消息汇总模块
const cameraUrl = '/family/server/camera'; //接口路径-摄像头模块
const dutyRangeUrl = '/family/server/dutyRange'; //接口路径-巡更模块
const userCarUrl = '/family/server/userCar'; //接口路径-车辆模块
const backModifyStatusUrl = '/family/back/domicile/modifyStatus'; //接口路径-后台社区模块

const baseUrl = ''; //

const commonUrlTest = '/family/client/common'; //接口路径-账号模块
const entryUrlTest = '/family/client/entry'; //接口路径-出入模块
const apiModuleUrl = ['/common', '/entry']; //模块-账号、出入
const toastLoading = Toast.$create({
    txt: '请稍后...',
    type: 'loading',
    time: 3000,
    mask: false
});

// http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
//     let token;
//     try {
//       token = CYJ.cookie()
//     } catch (e) {
//       token = null;
//     }
//     // config.data = JSON.stringify(config.data);
//     config.headers = {
//       // 'Content-Type': 'application/json'
//       // 'Content-Type': 'multipart/form-data'
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//     if (token) {
//       config.params = {
//         'token': token
//       }
//     } else {
//
//     }
//     //toast.hide()
//     return config;
//   },
//   error => {
//     // console.table(error)
//     return Promise.reject(error)
//   }
// );
// var token = "";
// if(CYJ.token) {
//   token = CYJ.token();
// }
axios.interceptors.request.use(
    config => {
        if (window.CYJ && window.CYJ.token) {
            config.headers.token = CYJ.token();
        } else {
            if (store.state && store.state.user) {
                config.headers.token = store.state.user.userToken;
            }
        }

        // config.headers = {
        //   // 'Content-Type': 'application/json'
        //   // 'Content-Type': 'multipart/form-data'
        //   // 'Content-Type': 'application/x-www-form-urlencoded',
        //   // 'appid': appData.appid,
        //   'token': token
        // }
        return config;
    },
    // error => {
    //   // console.table(error)
    //   // return Promise.reject(error)
    // }
);

//http 全局默认配置
axios.defaults.timeout = 10000;
// axios.defaults.baseURL = '';
// axios.defaults.headers.origin = process.env.VUE_APP_Origin;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
let token = "";
if (window.CYJ && window.CYJ.token) {
    token = CYJ.token();
    axios.defaults.headers.token = CYJ.token();
}

// // 处理重复请求-start
// let pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
// let cancelToken = axios.CancelToken
// let removePending = (ever) => {
//   for (let p in pending) {
//     if (pending[p].u === ever.url + '&' + ever.method) { //当当前请求在数组中存在时执行函数体
//       pending[p].f(); //执行取消操作
//       pending.splice(p, 1); //把这条记录从数组中移除
//     }
//   }
// }
// // 处理重复请求-end
let loginConfigFlag = false;
//http response 拦截器
axios.interceptors.response.use(
    response => {
        // // 发送前处理
        // removePending(response); //在一个ajax发送前执行一下取消操作
        // response.cancelToken = new cancelToken((c) => {
        //   // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        //   pending.push({ u: response.url + '&' + response.method, f: c});
        // });

        console.log("拦截器", response);
        checkHttpData(response);
        return response;
    }, error => {
        checkHttpData(error.response);
        return Promise.reject(error)
    }
)

function checkHttpData(response) {
    if (response.status === 200) {
        if (response.data.errorCode === -999) {
            toastLoading.hide();
            if (!loginConfigFlag) {
                loginConfigFlag = true;
                Dialog.$create({
                    type: 'alert',
                    icon: '',
                    title: '登录失效',
                    // content: response.data.errorMsg,
                    content: "确定要退出吗？",
                    confirmBtn: {
                        text: '确定',
                        active: true,
                        disabled: false,
                        href: 'javascript:;'
                    },
                    // cancelBtn: {
                    //   text: '取消',
                    //   active: false,
                    //   disabled: false,
                    //   href: 'javascript:;'
                    // },
                    onConfirm: () => {
                        loginConfigFlag = false;
                        utils.logout();
                    },
                    // onCancel: () => {
                    //     loginConfigFlag = false;
                    // }
                }).show();

            }

        } else if (response.data.errorCode != 0) {
            const dialog = Dialog.$create({
                type: 'alert',
                title: `错误提示`,
                content: response.data.errorMsg || '未知错误',
                icon: ''
            }).show()
        }
        return true;
    } else {
        let message;
        if (response && response.status) {
            switch (response.status) {
                case 400:
                    message = '请求错误(400)';
                    break;
                case 401:
                    message = '未授权，请重新登录(401)';
                    break;
                case 403:
                    message = '拒绝访问(403)';
                    break;
                case 404:
                    message = '请求出错(404)';
                    break;
                case 408:
                    message = '请求超时(408)';
                    break;
                case 500:
                    message = '服务器繁忙中,请稍后访问';
                    break;
                case 501:
                    message = '找不到请求类型(501)';
                    break;
                case 502:
                    message = '网络错误(502)';
                    break;
                case 503:
                    message = '服务不可用(503)';
                    break;
                case 504:
                    message = '网络超时(504)';
                    break;
                case 505:
                    message = 'HTTP版本不受支持(505)';
                    break;
                default:
                    message = `未知错误!`;
            }
        } else {
            // message = error+"出现了一个错误,请稍后再试！"
            message = "网络超时，请稍后再试！"
        }
        const dialog = Dialog.$create({
            type: 'alert',
            title: '网络故障',
            content: message,
            icon: '' //fa fa-times-circle-o
        }).show()
    }
}

/**
 * 封装get方法
 * @param data
 * @returns {Promise}
 */

export function fetch(params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(api, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(portUrl, url, data = {}) {
    let mApi = { api: "", apiHome: "" };
    let mUrl = "",
        api = process.env.VUE_APP_ApiUrl,
        apiHome = process.env.VUE_APP_ApiHomeUrl;
    // let mUrl = "", api = window.location.host, apiHome = window.location.host;

    // switch (process.env.NODE_ENV) {
    //   case "development":
    //     mApi.api = "http://192.168.31.186:8089";//开发
    //     mApi.apiHome = "http://192.168.31.122:8181";//开发
    //     break;
    //   case "test":
    //     mApi.api = "http://172.31.1.179:8080";//测试
    //     mApi.apiHome = "http://172.31.1.179:8181";//测试
    //     break;
    //   case "production":
    //     mApi.api = "http://172.31.1.179:8080";//测试
    //     mApi.apiHome = "http://172.31.1.179:8181";//测试
    //     break;
    //   case "aaa":
    //     mApi.api = "http://192.168.31.186:8089";//开发
    //     mApi.apiHome = "http://192.168.31.122:8181";//开发
    //     break;
    //   default:
    //     break;
    // }
    // api = mApi.api;
    // apiHome = mApi.apiHome;

    let headers = {},
        transformRequest = [],
        isJson = false;
    switch (portUrl) {
        case "base":
            mUrl = api + baseUrl + url;
            break;
        case "baseClient":
            mUrl = api + baseClientUrl + url;
            break;
        case "iosViop":
            mUrl = api + iosViopUrl + url;
            break;
        case "login":
            mUrl = api + loginUrl + url;
            break;
        case "common":
            mUrl = api + commonUrl + url;
            break;
        case "code":
            mUrl = api + codeUrl + url;
            break;
        case "getCode":
            mUrl = api + getCodeUrl + url;
            break;
        case "forget":
            mUrl = api + forgetUrl + url;
            break;
        case "change":
            mUrl = api + changeUrl + url;
            break;
        case "clientUpdate":
            mUrl = api + clientUpdateUrl + url;
            break;
        case "entry":
            mUrl = api + entryUrl + url;
            break;
        case "record":
            mUrl = api + recordUrl + url;
            break;
        case "community":
            mUrl = api + communityUrl + url;
            break;
        case "domicile":
            mUrl = api + domicileUrl + url;
            break;
        case "applyPackage":
            mUrl = api + applyPackageUrl + url;
            break;
        case "plotPackage":
          mUrl = api + plotPackageUrl + url;
          break;
        case "com":
            mUrl = api + comUrl + url;
            break;
        case "gateCommunity":
            mUrl = api + gateCommunityUrl + url;
            break;
        case "hArea":
            mUrl = apiHome + hAreaUrl + url;
            break;
        case "hCommon":
            mUrl = apiHome + hCommonUrl + url;
            break;
        case "machine":
            mUrl = apiHome + machineUrl + url;
            break;
        case "alertMessage":
            mUrl = apiHome + alertMessageUrl + url;
            break;
        case "maintainMessage":
            mUrl = apiHome + maintainMessageUrl + url;
            break;
        case "aMMessageAmass":
            mUrl = apiHome + aMMessageAmassUrl + url;
            break;
        case "camera":
            mUrl = apiHome + cameraUrl + url;
            break;
        case "userCar":
            mUrl = apiHome + userCarUrl + url;
            break;
        case "backModifyStatus":
            mUrl = apiHome + backModifyStatusUrl + url;
            break;
        case "dutyRange":
            mUrl = apiHome + dutyRangeUrl + url;
            headers = { 'Content-Type': 'application/json;charset=UTF-8' };
            isJson = true;
            break;
        default:
            break;
    }

    if (!isJson) {
        transformRequest.push(function(data) {

            let ret = '';
            for (let it in data) {
                if (data[it] != null) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }

            }
            return ret
        });
    }

    // switch (portUrl) {
    //   case "common":
    //     mUrl = api+commonUrlTest+url;
    //     break;
    //   case "entry":
    //     mUrl = api+entryUrlTest+url;
    //     break;
    //   default:
    //     break;
    // }
    // toast.show(mUrl);

    let mDate = new Date().getTime();
    return new Promise((resolve, reject) => {
        /*if(window.CYJ.userID) {
         data.userid = CYJ.userID();
        data.timestamp = mDate;
         data.sign = CYJ.userSign(mDate);
         data.secret = CYJ.secret();
         data.appid = CYJ.appID();
         data.appsign = CYJ.appSign(mDate);
        } else {
          if (!(portUrl==='login')) {
            console.log(store.state)
            data.userid = store.state.user.userID;
            data.timestamp = mDate;
            data.sign = md5.usersign(store.state.user.userID, store.state.user.userToken, mDate);
            data.secret = "";
            // data.appid = appData.appid;
            // data.appsign = appData.appsign(mDate);
          }
        }*/

        // let mCancelToken = null;
        // console.log(axios.CancelToken);
        // let config = {
        //   CancelToken:axios.CancelToken(function executor(c)
        //     {
        //       mCancelToken = c;
        //     }
        //   )
        // };


        for (let item in data) {
            let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
            if (regStr.test(data[item])) {
                const toast = this.$createToast({
                    type: 'warn',
                    txt: "输入的内容不能包含emoji表情包"
                });
                toast.show();
                return;
            }
        }

        toastLoading;
        toastLoading.show();
        axios.post(mUrl, data, { headers: headers, transformRequest: transformRequest }) //config
            // axios.post(api+apiBaseUrl+apiAppUrl+url, data)

        // data.userid = 'aX1WzfdweeKoGltpjP73TtG89GjNLy8A'
        // data.sign = 'aX1WzfdweeKoGltpjP73TtG89GjNLy8A';
        // data.timestamp = new Date().getTime();
        // data.secret = 'secretGU76kzWHgHiLjlE7Yr4mMC7T2qbjjzGk';
        // axios.post(apiTest+apiBaseUrlTest+apiAppUrl+url, data)
        .then(response => {
            // console.log(mCancelToken)
            // console.log(config);
            // mCancelToken();
            //------------------------------------------------------------------------------------------
            // removePending(response.config); //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
            //-------------------------------------------------------------------------------------------

            if (response.data.errorCode === 0) {
                resolve(response.data);

                //emojiContent = window.unescape(response.data.replace(/\\u/g,"%u"));//todo 接收表情包

            }
            toastLoading.hide();
        }, err => {
            toastLoading.hide();
            // this.$createDialog({
            //   type: 'confirm',
            //   icon: '',
            //   title: '确定要退出吗？',
            //   content: err,
            //   confirmBtn: {
            //     text: '确定',
            //     active: true,
            //     disabled: false,
            //     href: 'javascript:;'
            //   },
            //   cancelBtn: {
            //     text: '取消',
            //     active: false,
            //     disabled: false,
            //     href: 'javascript:;'
            //   },
            //   onConfirm: () => {
            //     utils.logout();
            //   },
            //   onCancel: () => {
            //     reject(err);
            //   }
            // }).show();

            // process.env.NODE_ENV==='production'? utils.logout():reject(err);
        })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(api, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(api, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}