<template>
    <div class="wrapper-white">
        <return-head title="设备详情"></return-head>
        <div class="box"></div>

        <div class="base-vertical-layout-general-item-center top_div">
            <div class="base-horizontal-layout-space-between-item-center host_css">
                <div class="base-horizontal-layout-general-item-center img_host">
                    <img 
                        :src="this.indexNum == 0 ?
                            require('@/assets/notification/fdhost.png'):
                            (this.indexNum == 1 ? 
                            require('@/assets/notification/vedio.png'):
                            require('@/assets/notification/door.png'))"
                        :class="this.indexNum == 2 ? 'img_door_css' : 'img_host_css'">
                    <span>{{indexNum===0?'防盗主机':(indexNum === 1?'视频主机':'门禁机')}}</span>
                </div>
                <div class="num_host base-horizontal-layout-end-item-center" v-if='boxShow'>
                    <span>防区数量:</span>
                    <span>{{data.count}}</span>
                </div>
            </div>            
            <div class="base-horizontal-layout-center-item-center input_css">
                <span>主机编号：</span>
                <div class="input_div">{{this.indexNum == 2?data.deviceAccount:data.account}}</div>
                <!-- <input 
                    type="text" 
                    v-model="hostName"
                    readonly 
                    :placeholder="indexNum==0?'请编辑防盗主机机的名称':(indexNum === 1?'请编辑视频主机的名称':'请编辑门禁机的名称')" @click="tipBox('设备名称', 0, null, hostName)"> -->
            </div>
            <div class="base-horizontal-layout-center-item-center input_css">
                <span>设备名称：</span>
                <input 
                    type="text" 
                    v-model="hostName"
                    readonly 
                    :placeholder="indexNum==0?'请编辑防盗主机机的名称':(indexNum === 1?'请编辑视频主机的名称':'请编辑门禁机的名称')" @click="tipBox('设备名称', 0, null, hostName)">
            </div>
            <div v-if='!boxShow' class="base-horizontal-layout-center-item-center input_css" style='padding-bottom: 2.67vw;'>
                <span>设备位置：</span>
                <input 
                    type="text" 
                    readonly 
                     @click="tipBox('设备位置', 1, null, positonName)"
                    v-model="positonName"
                    :placeholder="indexNum==2?'请编辑门禁机的位置':'请编辑视频主机的位置'">
            </div>
        </div>

        <div v-if='boxShow' class="div_back_box" >
            <div class="base-vertical-layout-general-item-center fangqu" v-for="(item, index) in data.defenceAreaList" :key="index">
                <div class="base-horizontal-layout-space-between-item-center fangqu_name">
                    <span class="span_fang">防区{{ item.defenceIndex<10?'0'+item.defenceIndex :item.defenceIndex }}</span>
                    <input 
                        v-model='item.name' 
                        class="div_fang" 
                        @click="tipBox('防区名称', 0, index, item.name)" 
                        readonly
                        placeholder="请编辑防区名称"/>
                    <span class="liufang">{{ DefenceAreaProperty[item.property || 1].name }}</span>
                </div>
                <div class="fangqu_hr"></div>
                <div class="base-horizontal-layout-space-between-item-center fangqu_address">
                    <span class="span_one">防区位置：</span>
                    <div @click="tipBox('防区位置', 1, index, item.position)" class="base-horizontal-layout-end-item-center img_name_css">
                        <input 
                            v-model="item.position" 
                            placeholder="请编辑防区位置"
                            class="span1"
                            readonly/>
                        <img :src="require('@/assets/notification/san_jiao.png')">
                    </div>
                </div>
                <div v-if='item.camerList' class="base-horizontal-layout-space-between-item-center fangqu_vedio">
                    <span class="span_one">关联摄像枪：</span>
                    <div 
                        @click="onUpperClick(item.camerList)" 
                        class="base-horizontal-layout-end-item-center img_name_css">
                        <span class="span_two">{{item.camerList[0].name}}</span>
                        <img :src="require('@/assets/notification/san_jiao.png')">
                    </div>
                </div>
            </div>
        </div>

        <base-popup v-if="isPopShow"
                :isShowCloseIcon="true"
                refId="myCarPopup"
                :isShowbtn ='false'
                popTitle="已关联的摄像枪"
                @closePoppup="closePoppup">
      <!--设置车牌名称-->
            <div class="base-vertical-layout-start-item-start hr_css"></div>
            <div class="base-vertical-layout-center list_css" v-for="(item, index) in listData" :key='index'>
                <div class="base-horizontal-layout-general-item-center list_li_css">
                    <img :src="require('@/assets/notification/vedio.png')">
                    <span>{{item.name}}</span>
                </div>
            </div>
        </base-popup>
    </div>
</template>
<script>
import returnHead from "_c/head/return-head";
import basePopup from '_c/popup/base-popup';
export default {
    name: "device-audit",
    components: { returnHead, basePopup },
    data(){
        return{
            listData: [],
            isPopShow: false,
            boxShow: false,
            indexNum: null,
            hostName: null,
            positonName: null,
            data: {
                areaName: null,
                defenceAreaList: []
            },
            DefenceAreaProperty: {
                1: {
                    code: 1,
                    name: "普通"
                },
                2: {
                    code: 2,
                    name: "留守"
                },
                3: {
                    code: 3,
                    name: "紧急"
                }
            }
        }
    },
    methods:{
        closePoppup(value){
            this.isPopShow = false;
        },
        onUpperClick(listData){
            this.listData = listData
            this.isPopShow = true;
        },
        tipBox(text, type, index, value){
            let urlPath;
            if(this.indexNum == 0){
                urlPath = "/family/server/machine/setName"//修改防盗/视频主机名称、位置
            }else if(this.indexNum == 1){
                urlPath = "/family/server/machine/setName"//修改防盗/视频主机名称、位置
            }else if(this.indexNum == 2){
                urlPath = "/FamilyJava/client/machine/setName"//修改门禁机名称、位置2
            }
            value = value ? value : '';
            this.$createDialog({
                type: 'prompt',
                title: `修改${text}`,
                prompt: {
                    value: `${value}`,
                    placeholder:  `请输入${text}`
                },
                onConfirm: (e, promptValue) => {
                    let url = urlPath;
                    let data;
                    if(text == "防区名称" || text == "防区位置"){
                        url =  "/family/server/defenceArea/update" //修改防区信息
                    }
                    if(type == 0){
                        data = {
                            id: ( text=="防区名称"||text=="防区位置"?
                                this.data.defenceAreaList[index].id : 
                                this.data.id ),
                            name: promptValue,
                        }
                    }else{
                        data = {
                            id: ( text=="防区名称"||text=="防区位置"?
                                this.data.defenceAreaList[index].id : 
                                this.data.id ),
                            position: promptValue,
                        }
                        if(this.indexNum == 1 && type == 1){
                            let name = {
                                name: this.hostName
                            }
                            Object.assign(data, name);
                        }

                    }
                    this.$post('base', url, data).then(({ data, errorCode })=>{
                        if(errorCode === 0){
                            if(this.indexNum == 0){
                                if(text == "防区名称" || text == "防区位置"){
                                    if(type == 0){
                                         this.data.defenceAreaList[index].name = promptValue
                                    }else{
                                        this.data.defenceAreaList[index].position = promptValue
                                    } 
                                }else{
                                    this.hostName = promptValue;
                                }
                            }
                            if(this.indexNum == 1){
                                if(type == 0){
                                    this.hostName = promptValue;
                                }else{
                                    this.positonName = promptValue
                                }
                            }else if(this.indexNum == 2){
                               if(type == 0){
                                    this.hostName = promptValue;
                                }else{
                                    this.positonName = promptValue;
                                } 
                            }
                        }
                        this.$emit('Refresh');//调用页面刷新的函数
                    })
                }
            }).show();
        },
        deingth(){
            this.indexNum = this.$route.query.indexNum
            this.data = this.$route.query.data
            this.boxShow = this.indexNum === 0 ? true : false;
            this.hostName = this.indexNum === 2 ? this.data.deviceName:this.data.name
            this.positonName = this.indexNum === 2 ? this.data.positionDesc:this.data.position
            console.log(this.data)
        }
    },
    mounted(){
        this.deingth();
    }
}
</script>
<style lang="stylus" scoped>

.wrapper-white{
  display: flex;
  flex-flow: column;
}
.box{
    width: 100%;
    position: absolute;
    top: 11.7333vw;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
}
.popup-container{
    width: 84vw!important;
    min-height: 91.7vw;
    padding: 0!important;
}
.closeIcon_css{
    width: 9.6vw;
    height: 9.6vw;
    margin-top: 1.8vw;
    margin-right: 2.13vw;
}
.popup-container h3{
    padding-top: 3.73vw;
    font-weight: bold;
    font-size: 4.27vw;
    color: #333;
}
>>>.hr_css{
    width: 100%;
    height: 0.27vw;
    background-color: #EEEEEE;
    margin-top: 1.87vw;
}
>>>.list_css{
    width: 60vw;
    width: 73.34vw;
    margin: 0 5.33vw;
}
.list_css .list_li_css{
    height: 14.4vw;
    line-height: 14.4vw;
    border-bottom: 0.27vw solid #eee; 
}
.list_css .list_li_css img{
    width: 5.33vw;
    height: 5.33vw;
    margin-right: 1.6vw;
}
.list_css .list_li_css span{
    font-size: 4.27vw;
    font-weight: bold;
    color: #333;
}
>>>.img_host_css{
  height: 4vw!important;
}
.img_door_css{
    width: 4vw!important;
    margin: 0 2vw 0 0.93vw!important;
}
.span_active_css{
    font-weight: bold;
}
.top_div{
    width: 100%;
    min-height: 32vw;
    background-color: #fff;
    z-index: 1;
}
.div_back_box{
  width: 100%;
  overflow-y: auto;
  flex: 1;
  padding-bottom: 5vw;
  z-index: 1;
}
.host_css{
    height: 12.81vw;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.host_css .img_host{
    width: 50%;
    height: 100%;
    margin-left: 5.33vw;
}
.host_css .img_host span{
  font-weight: bold;
  color: #333;
  font-size: 5.33vw;
}
.host_css .img_host img{
    width: 5.33vw;
    height: 5.33vw;
    margin-right: 1.6vw;
}
.host_css .num_host{
    height: 100%;
    width: 40%;
    margin-right: 5.33vw;
}
.host_css .num_host span:nth-child(1){
    font-size: 4.27vw;
    font-weight: bold;
    color: #666;
}
.host_css .num_host span:nth-child(2){
    font-size: 4.27vw;
    font-weight: bold;
    color: #3388FF;
}
.input_css{
    height: 13.33vw;
    width: 100%;
}
.input_css span{
    font-size: 4.27vw;
    font-weight: bold;
    color: #666;
    margin-left: 5vw;
}
.input_div{
    width: 58.67vw;
    height: 8.53vw;
    line-height: 8.53vw;
    text-align: center;
    font-size: 4.27vw;
    color: #38f;
    font-weight: bold;
}
.input_css input{
    border: 0.27vw solid #eee;
    border-radius: 0.53vw;
    outline: 0;
    width: 58.67vw;
    height: 8.53vw;
    text-align: center;
    font-size: 4.27vw;
    color: #999;
}
input::-ms-input-placeholder{
    text-align: center;
    color: #999;
    font-size: 4.27vw;
}
input::-webkit-input-placeholder{
    text-align: center;
    color: #999;
    font-size: 4.27vw;
}

input[type="button"], input[type="submit"], input[type="reset"], input[type="text"] {
    -webkit-appearance: none;
}
.fangqu{
    width: 94.67vw;
    /* min-height: 30vw; */
    background-color: #fff;
    z-index: 1;
    margin: 0 auto;
    margin-top: 2.67vw;
}
.fangqu .fangqu_name{
    width: 86.67vw;
    height: 13.06vw;
}
.fangqu .fangqu_name .span_fang{
    margin-left: 5.33vw;
    color: #333;
    font-size: 4.8vw;
    font-weight: bold;
}
.fangqu .fangqu_name .div_fang{
    width: 37.33vw;
    height: 8.53vw;
    line-height: 8.53vw;
    border: 0.27vw solid #eee;
    font-weight: bold;
    color: #38f;
    background-color: #fff;
    text-align: center;
    font-size: 4.27vw;
    outline: 0;
}
.fangqu .fangqu_name .liufang{
    color: #38f;
    font-size: 3.73vw;
}
.fangqu .fangqu_hr{
    width: 86.67vw;
    height: 1px;
    background-color: #eee;
    padding: 0;
    border: 0;
}
.fangqu .fangqu_address{
    width: 86.67vw;
    height: 13.33vw;
    margin-top: 2.67vw;
}
.fangqu .fangqu_vedio{
    width: 86.67vw;
    margin-top: 0.27vw;
    line-height: 13.33vw;
}
.span_one{
    margin-left: 5.33vw;
    color: #666;
    font-weight: bold;
    font-size: 4.27vw;
}
.img_name_css .span1{
    color: #666;
    font-size: 3.73vw;
    text-align: right;
    display: block;
    max-width: 40vw;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    line-height: 5.33vw;
    outline: 0;
 }
 .img_name_css img{
    width: 3.2vw;
    height: 3.2vw;
    margin-left: 1.6vw;
 }
 .span_two{
    color: #38f;
    font-size: 3.73vw;
 }
</style>