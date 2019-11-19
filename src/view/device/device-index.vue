<template>
  <div class="wrapper-white back">
    <return-head title="设备列表"></return-head>

    <div class="scroll-wrapper-addition-title">
      <cube-scroll :data="allList">
        <div class="heder-title">{{ areaName }}</div>

        <div v-if='defenceInfo.count>0'>
          <div class="h-flex machine-header">
            <div>防盗主机信息</div>
            <div>主机数量：<span>{{ defenceInfo.count }}</span></div>
          </div>
          <div class="machine-item" v-for="(items, indexs) in defenceInfo.list" :key="indexs">
            <div class="h-flex machine-item-info">
              <div><i class="icon-machine"></i>{{ items.account }}</div>
              <div>防区数量：<span>{{ items.count }}</span></div>
            </div>
            <p v-if="items.phone && mUserPhone!==items.phone"
               class="base-text-details-normal-black-666"
               style="margin: 0 0 2vw 8vw">分享于：{{items.shareUserPhone?items.shareUserPhone:items.phone}}</p>
            <div class="h-flex machine-item-modify">
              <div>设备名称：</div>
              <input class="edittext" type="text" placeholder="请编辑主机的名称" v-model="items.name" :readonly='true' @click='changeName(1, items)'/>
            </div>

            <div class="machine-item-divider"></div>

            <div class="machine-item-areas" v-for="(item, index) in items.defenceAreaList" :key="index">
              <div class="h-flex area-info">
                <div>防区 {{ item.defenceIndex < 10 ? '0' + item.defenceIndex : item.defenceIndex }} </div>
                <input class="edittexts" type="text" placeholder="请编辑防区名称" :value="item.name" :readonly='true' @click='changeName(3, item)'/>
                <div>{{ DefenceAreaProperty[item.property || 0].name }}</div>
              </div>
              <div class="h-flex area-info-modify">
                <div>防区位置</div>
                <input class="edittext wid_css" type="text" placeholder="请编辑防区位置"  :value="item.position || ''" :readonly='true' @click='changeName(4, item)'/>
              </div>
              <div class="h-flex area-info-shex" v-if='item.cameraList.length>0'>
                <div class="label_css">关联摄像枪</div>
                <div class="textAll_css">
                  <span v-for='(itemData, indexLen) in item.cameraList' :key='indexLen'>{{itemData.name}}</span>
                </div>
              </div>
              <div class="machine-item-divider"></div>
            </div>
          </div>
        </div>
        
        <!-- <div class="divider"></div> -->

        <div v-if="cameraInfo.count>0">
          <div class="h-flex machine-header">
            <div>视频主机信息</div>
            <div>主机数量：<span>{{ cameraInfo.count }}</span></div>
          </div>
          <div class="machine-item" v-for="(items, indexs) in cameraInfo.list" :key="indexs">
            <div class="h-flex machine-item-info">
              <div><i class="icon-video"></i>{{ items.account }}</div>
              <div class='mac_css'></div>
            </div>

            <div class="h-flex machine-item-modify">
              <div>设备名称：</div>
              <input class="edittext" type="text" placeholder="请编辑视频主机的名称" v-model="items.name" :readonly='true' @click='changeName(1, items)'/>
            </div>
            <div class="h-flex machine-item-modify" style='margin-top: 1.6vw;'>
              <div>设备位置：</div>
              <input class="edittext" type="text" placeholder="请编辑视频主机的位置" v-model="items.position" :readonly='true' @click='changeName(2, items)'/>
            </div>
            <div class="machine-item-divider"></div>

            <!-- <div class="h-flex machine-item-modify">
              <div>设备位置：{{ items.position }}</div>
            </div> -->
          </div>
        </div>

        <!-- <div class="divider"></div>

        <div class="divider"></div> -->

        <div v-if="doorInfo.count>0">
          <div class="h-flex machine-header">
            <div>门禁机信息</div>
            <div>门禁数量：<span>{{ doorInfo.count }}</span></div>
          </div>
          <div class="machine-item" v-for="(items, indexs) in doorInfo.list" :key="indexs">
            <div class="h-flex machine-item-info">
              <div><i class="icon-guard"></i>{{ items.deviceAccount }}</div>
              <div class="mac_css"></div>
            </div>

            <div class="h-flex machine-item-modify">
              <div>设备名称：</div>
              <input class="edittext" type="text" placeholder="请编辑门禁机的名称" v-model="items.deviceName" :readonly='true' @click='changeName(5, items)'/>
            </div>
            <div class="h-flex machine-item-modify" style='margin-top: 1.6vw;'>
              <div>设备位置：</div>
              <input class="edittext" type="text" placeholder="请编辑门禁机的位置" v-model="items.positionDesc" :readonly='true' @click='changeName(6, items)'/>
            </div>
            <!-- <div class="h-flex machine-item-info">
              <div>设备名称：<i class="icon-guard"></i>{{ items.deviceName }}</div>
              <div v-if="items.position">设备位置：<i class="icon-guard"></i>{{ items.position }}</div>
            </div> -->
            <div class="machine-item-divider" style='bottom:0;'></div>
          </div>
        </div>

        <!-- <div class="divider"></div> -->

      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import returnHead from "_c/head/return-head";
  import { mapState } from 'vuex';

  export default {
    name: "device-index",
    components: { returnHead },
    data() {
      return {
        areaName: '',
        areaNumber: '77e5329e6b1d4fd3b26f675a893ab99b',
        defenceName: '',
        defenceInfo: {
          count: 0,
          list: [
            {
              count: 0,
              name: '',
              position: '',
              status: '',
              defenceAreaList: []
            }
          ]
        },
        cameraInfo: {
          count: 0,
          list: [
            {
              count: 0,
              name: '',
              position: '',
              status: '',
              defenceAreaList: []
            }
          ]
        },
        doorInfo: {
          count: 0,
          list: [
            {
              count: 0,
              name: '',
              position: '',
              status: '',
              defenceAreaList: []
            }
          ]
        },
        allList: [],

        DefenceAreaProperty: {
          0: {
            code: 0,
            name: "关闭"
          },
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
      };
    },
    watch: {},
    computed: {
      ...mapState({
        'mUserPhone': state => state.user.userPhone
      })
    },
    created() {
    },
    mounted() {
      this.areaName = this.$route.query.areaName;
      this.areaNumber = this.$route.query.areaNumber;
      this.getList();
    },
    methods: {
      changeName(type, val){
        // console.log(val.name)
        let doorData;
        if(type == 1 || type == 3){
          doorData = val.name?val.name:''
        }else if(type == 2 || type == 4){
          doorData = val.position?val.position:''
        }else if(type == 5){
          doorData = val.deviceName?val.deviceName:''
        }else if(type == 6){
          doorData = val.positionDesc?val.positionDesc:''
        }
        console.log(val.id, doorData)
          this.dialog = this.$createDialog({
          type: 'prompt',
            title: type == 0 ? '改修主机名称' : type == 1 ? "修改防区名称" : "修改防区位置",
            prompt: {
              value: `${doorData}`,
              placeholder: '请填写修改的内容',
              style:{
                'border-radius': '4vw'
              }
            },
            onConfirm: (e, promptValue) => {
              var postUrl = ""
              var postParam = {}
              if(type == 1){
                postUrl = "/family/server/machine/setName"  //修改防盗/视频主机(名称)、位置
                postParam = {
                  id: val.id,
                  name: promptValue,
                  position: val.position
                }
              }else if(type == 2){
                postUrl = "/family/server/machine/setName"//修改防盗/视频主机名称、(位置)
                postParam = {
                  id: val.id,
                  name: val.name,
                  position: promptValue
                }
              }else if(type == 3){
                postUrl = "/family/server/defenceArea/update" //修改防区(名称)信息
                postParam = {
                  id: val.id,
                  // name: val.doorName,
                  name: promptValue
                }
              }else if(type == 4){
                postUrl = "/family/server/defenceArea/update"  //修改防区(位置)信息
                postParam = {
                  id: val.id,
                  position: promptValue,
                  // position: val.positionDesc
                }
              }else if(type == 5){
                postUrl = "/FamilyJava/client/machine/setName"  //修改门禁机(名称)、位置
                postParam = {
                  id: val.id,
                  name: promptValue
                }
              }else if(type == 6){
                postUrl = "/FamilyJava/client/machine/setName"  ///修改门禁机名称、(位置)
                postParam = {
                  id: val.id,
                  position: promptValue
                }
              }

              this.$post("base", postUrl, {
                ...postParam
              }).then(({ data, errorCode }) => {
                if(errorCode == 0){
                  if(type == 1 || type == 3){
                    val.name = promptValue
                  }                   
                  else if(type == 2 || type == 4){
                    val.position = promptValue
                  }
                  else if(type == 5){
                    val.deviceName = promptValue
                  }
                  else if(type == 6){
                    val.positionDesc = promptValue
                  }
                }
              })

            }
          }).show()
      },
      getList() {
        let self = this;
        this.$post("base", "/family/server/area/getPlotAreaDeviceList", {
          areaNumber: self.areaNumber
        }).then(({ data, errorCode }) => {
          if (errorCode === 0) {
            if (data) {
              self.defenceInfo = data.defenceMachine;
              self.cameraInfo = data.cameraMachine;
              self.doorInfo = data.doorDevice;
            }
          }
        });
      }
    }
  };
</script>

<style scoped>
*{
  font-family: '微软';
}
  .heder-title {
    width: 55.2vw;
    height: 7.47vw;
    font-size: 3.74vw;
    background-color: #f5f5f5;
    line-height: 7.47vw;
    text-align: center;
    margin: 3.2vw auto 0 auto;
    color: #666;
    border-radius: 1.07vw;
    margin-bottom: 3.73vw;
  }

.edittext {
  width:63.5vw;
  height: 6.4vw;
  background-color: #f5f5f5;
  border-radius: 0.3rem;
  text-align: center;
  font-size: 0.8rem;
  color: #999;
  outline: none;
}
.edittexts {
  width:60vw;
  height: 6.4vw;
  background-color: #f5f5f5;
  border-radius: 0.3rem;
  text-align: center;
  font-size: 0.8rem;
  color: #999;
  outline: none;
}
.wid_css{
  width: 70vw;
}
.icon-guard {
  background-image: url('~@/assets/notification/door.png');
  display: inline-block;
  height: 6vw;
  width: 5vw;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  vertical-align: middle;
  margin-right: 3vw;
  /* 修正图片边缘的空白，导致显示效果布局中 */
  margin-top: -0.4vh;
}

.icon-video {
  background-image: url('~@/assets/notification/vedio.png');
  display: inline-block;
  height: 8vw;
  width: 5vw;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  vertical-align: middle;
  margin-right: 3vw;
  /* 修正图片边缘的空白，导致显示效果布局中 */
  margin-top: -0.4vh;
}

.icon-machine {
  display: inline-block;
  height: 8vw;
  width: 5vw;
  background-image: url('~@/assets/notification/fdhost.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  vertical-align: middle;
  margin-right: 3vw;
  /* 修正图片边缘的空白，导致显示效果布局中 */
  margin-top: -0.4vh;
}

.divider {
  height: 3vw;
  width: 100%;
  background-color: #f5f5f5;
}

.h-flex{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.machine-header{
  color: #666;
  font-size: 4.27vw;
  padding: 0vw 7vw 0vw 5vw;
  background-color: #EDEEF0;
  height: 9.74vw;
}
.area-info-shex{
  margin-top: 3vw;
  min-height: 6.4vw;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
}
.area-info-shex .label_css{
  line-height: 6.4vw;
  height: 6.4vw;
  color: #999;
  text-align: center;
}
.area-info-shex .textAll_css{
  width: 66vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.area-info-shex .textAll_css span{
  color: #38f;
  font-size: 3.2vw;
  display: block;
  height: 5vw;
  line-height: 5vw;
}
.area-info-shex .textAll_css span:nth-child(2n+1){
  margin-right: 8vw;
}
.hengX{
  height: 1px;
  width: 100%;
  background-color: #F5F5F5;
}
.machine-header div:first-child{
  font-weight: bold;
  font-size: 4.27vw;
}
.machine-header div:last-child{
  font-weight: normal;
  flex: 1;
  font-size: 0.75rem;
  text-align: right;
  color: #999;
}
.mac_css{
  font-size: 3.74vw!important;
  color: #38f!important;
}
.machine-header div:last-child span{
  color: #38f
}

.machine-item {
  position: relative;
  background-color: #fff;
  padding: 2vw 7vw 3vw 5vw;
  /* margin-top: 2vw; */
}
.machine-item-info {
  background-color: #fff;
  margin-bottom: 1.07vw;
}
.machine-item-info div:first-child {
  color: #333;
  font-weight: bold;
  font-size: 4.27vw;
}
.machine-item-info div:first-child ia{
  display: inline-block;
  height: 8vw;
  width: 5vw;
  background-image: url('~@/assets/notification/fdhost.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  vertical-align: middle;
  margin-right: 3vw;
  /* 修正图片边缘的空白，导致显示效果布局中 */
  margin-top: -0.4vh;
}

.machine-item-info div:last-child {
  font-weight: normal;
  flex: 1;
  font-size: 3.47vw;
  text-align: right;
  color: #999;
}
.machine-item-info div:last-child span{
  color: #38f;
}
.machine-item-modify {
  
}
.machine-item-modify div:first-child{
  color: #333;
  font-size: 0.75rem;
  /* 对齐图标右边 = 图标宽度 + 图标的margin-right */
  margin-left: calc(5vw + 3vw);
}

.machine-item-divider {
  height: 1px;
  background-color: #eee;
  position: absolute;
  margin-top: 2vw;
  left: 0;
  right: 0;
}

.machine-item-areas {
  /* 上边距 = 分割线上边距 + 需要的上边距 */
  margin-top: calc(2vw + 3vw)
}
.machine-item-areas .area-info div:nth-child(1) {
  color: #333;
  font-weight: bold;
  font-size: 0.8rem;
  width: 20vw;
}
.machine-item-areas .area-info div:nth-child(3) {
  color: #999;
  font-weight: normal;
  font-size: 0.7rem;
  text-align: right;
  flex: 1;
}
.machine-item-areas .area-info-modify {
  margin-top: 3vw;
}
.machine-item-areas .area-info-modify div:nth-child(1){
  color: #999;
  font-weight: normal;
  font-size: 0.8rem;
  width: 20vw;
}

</style>