import md5 from './md5'
import router from './router'
// import Toast from '@/components/global_components/toast.js'
const account = {
    phone: ()=>{
        if(localStorage['__PHONE__']){
           return JSON.parse(localStorage['__PHONE__'])
        }else {

            return null
        }
    },
    token: ()=>{
        if(account.phone() && localStorage[`__USER__${account.phone()}`]){
            return JSON.parse(localStorage[`__USER__${account.phone()}`]).token
        }else {
            router.push({
                name: 'login'
            })
            // Toast.show({
            //     text: '请先登录!',
            //     show: true,
            //     showTime: 1000,
            //     pos: "center"
            // })
            return null
        }
    },
    userId: ()=>{
        if(account.phone() && localStorage[`__USER__${account.phone()}`]){
            return JSON.parse(localStorage[`__USER__${account.phone()}`]).userId
        }else {
            // Toast.show({
            //     text: '请完登录!',
            //     show: true,
            //     showTime: 1000,
            //     pos: "center"
            // })
            router.push({
                name: 'login'
            })
            return null
        }
    },
    sign: (timestamp)=>{
        if(account.phone() && localStorage[`__USER__${account.phone()}`]){
            // eslint-disable-next-line no-console
        //    console.log('timestamp :', timestamp);
           return md5.usersign(account.userId(), account.token(), timestamp)
        }else {
            // Toast.show({
            //     text: '请完登录!',
            //     show: true,
            //     showTime: 1000,
            //     pos: "center"
            // })
            router.push({
                name: 'login'
            })
        }
    },
    secret: ()=>{
        if(account.phone() && localStorage[`__USER__${account.phone()}`]){
            return JSON.parse(localStorage[`__USER__${account.phone()}`]).secret
        }else {
            // Toast.show({
            //     text: '请完登录!',
            //     show: true,
            //     showTime: 1000,
            //     pos: "center"
            // })
            router.push({
                name: 'login'
            })
            return null
        }
    }
}

export default account