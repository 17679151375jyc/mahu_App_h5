/**
 * @Time  : 2020-01-07 10:03:21
 * @Author: michael huang
 * @File  : system.js
 * @LastEditors:  michael huang
 * @LastEditTime: 2020-01-07 10:03:21
 */

import axios from '@/libs/api.request'

export const getSystemInitList = (data) => { //获取公共属性
  return axios.post(
    '/family/server/common/getSystemInitList',
    data
  )
};