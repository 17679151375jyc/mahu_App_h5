import md5 from './md5'

const APP = {

   get appid() {
        return 'ANDROID_ZrcSecUHIMXM2cLj3CgceevoUrvY4iI1'
    },
   get appKey() {
        return 'cAy183kI1P6qyFlHfXtFgBt0hY40EZo2'
    },
    //app签名 md5(md5(appid + appkey + timestamp))
    appsign (timestamp){
        return md5.appsign(APP.appid, APP.appKey, timestamp)
    }

}
export default APP