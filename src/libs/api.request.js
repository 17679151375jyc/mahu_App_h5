/**
 * @Time  : 2020-01-07 09:50:48
 * @Author: michael huang
 * @File  : api.request.js.js
 * @LastEditors:  michael huang
 * @LastEditTime: 2020-01-07 09:50:48
 */

import HttpRequest from '@/libs/axios'

// import config from '@/config/index'
// const baseUrl = config.baseUrl[process.env.NODE_ENV]; // process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
// // console.log('baseUrl', baseUrl, process.env.NODE_ENV)

const axios = new HttpRequest();
export default axios