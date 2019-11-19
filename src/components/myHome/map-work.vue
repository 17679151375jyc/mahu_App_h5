<template>
  <div style="height:100%">
    <!--<iframe v-if="open"-->
            <!--:src="url"-->
            <!--frameborder="0"-->
            <!--:width="width"-->
            <!--:height="height"-->
            <!--name="amap"-->
            <!--seamless="seamless">你的浏览器不支持此项功能-->
    <!--</iframe>-->

    <div v-if="hasLocalData" style="width: 100%;height: 100%">
      <!--<div style="width: 100%;height: 0;position: relative;top: 0;z-index: 10">-->
        <div class="info">
          <p>
            <span class="fa fa-spinner fa-spin fa-2x fa-fw" style="color:rgba(51,136,255,0.8)"></span>
          </p>
        </div>
      <!--</div>-->
      <div style="width: 100%;height: 0;position: relative;top: 0;z-index: 11">
        <div class="header">
          <p id="headStatus">
            正在获取位置信息 <span class='fa fa-circle-o-notch fa-spin ' style='color:rgba(51,136,255,0.8)'></span>
          </p>
        </div>
      </div>
      <div id="container"></div>
    </div>

    <div v-else class="no-local-storage" :style="{width:width,height:height}">
      <span class="fa fa-spinner fa-spin fa-2x fa-fw" style="color:rgba(51,136,255,0.8)"></span>
    </div>
  </div>
</template>

<script>
  import utils from '_libs/utils';

  export default {
    name: "amap",
    props: {
      locationData: {},
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    data() {
      return {
        url: 'map.html',
        hasLocalData: false,
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        // console.log(this.locationData.WITHINNUMBER)
        this.loadMap();
      },
      loadMap() {
        let self = this;
        if (this.locationData.WITHINNUMBER && this.locationData.staff) {
          self.hasLocalData = true;
          utils.localStorage('locationData', this.locationData).then((res) => {

            //初始化
            let customize = new Object();
            (function () {
              if (localStorage && localStorage.getItem('locationData')) {
                let local = JSON.parse(localStorage.getItem('locationData'));
                customize = {
                  user: {
                    userLocation: [], //这个用户个人坐标会通过接下来的高德获取
                    userIcon: '',
                  },
                  staff: local.staff,
                  WITHINNUMBER: local.WITHINNUMBER, //给定的范围，单位m
                }
              } else {
                location.reload();
                return;
              }
            })()
            //移除加载中动画
            let stopAnimation = function () {
              document.getElementsByClassName('info')[0].style.display = 'none';
            };

            //状态栏信息
            let headStatus = function (text) {
              if (text) {
                document.getElementById('headStatus').innerHTML = text;
                document.getElementsByClassName('header')[0].style.background = 'rgba(37, 38, 45, 0.7)'
              }
            };
            headStatus();

            //初始化地图
            let map = null;
            map = new AMap.Map('container', {
              zoom: 12,
              resizeEnable: true,
              // center: [data.position.lng, data.position.lat]
            });
            map && map.destroy();
            map = new AMap.Map('container', {
              zoom: 12,
              resizeEnable: true,
              // center: [data.position.lng, data.position.lat]
            });

            //借助h5的geolocation来精确定位，但是可能获取不到权限
            map.plugin('AMap.Geolocation', function () {
              let geolocation = new AMap.Geolocation({
                // 与原生联动
                useNative: true,
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 6000,
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: 'RB'
              });

              geolocation.getCurrentPosition()
              AMap.event.addListener(geolocation, 'complete', onComplete)
              AMap.event.addListener(geolocation, 'error', onError)

              function onComplete(data) {
                // data是具体的定位信息
                console.log("AMap.event",data);
                //停止动画
                stopAnimation();
                //重定义地图中心位置
                map = new AMap.Map('container', {
                  zoom: 13,
                  resizeEnable: true,
                  center: [data.position.lng, data.position.lat]
                });
                //加载缩放组件
                AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {

                  var zoomCtrl1 = new BasicControl.Zoom({
                      theme: 'dark'
                    }),
                    zoomCtrl2 = new BasicControl.Zoom({
                      position: 'br', //bottom-right
                      showZoomNum: true
                    });

                  //map.addControl(zoomCtrl1);

                  map.addControl(zoomCtrl2);
                });



                //设定用户位置
                customize.user.userLocation = [data.position.lng, data.position.lat];
                //返回距离用户在设定范围内的技术人员的数量 @range区域半径 @userLocation用户经纬度(array) @staffLocation技术人员经纬度(array)
                let within = function (range = customize.WITHINNUMBER, userLocation = customize.user.userLocation, staffLocation = customize.staff.staffLocation) {
                  let count = 0;
                  // console.log(staffLocation)
                  staffLocation.map((item, index) => {
                    count += AMap.GeometryUtil.distance(userLocation, item) < range ? 1 : 0;
                  });
                  return count
                };

                //加载simpleMarker组件
                AMapUI.loadUI(['overlay/SimpleMarker'], function (SimpleMarker) {
                  if (customize.staff.staffType === "alert") {
                    headStatus(`有${customize.WITHINNUMBER}`);//改变状态信息

                  } else {
                    headStatus(`${customize.WITHINNUMBER}米范围内共有 ${within()} 名安保人员`);//改变状态信息
                    //标记用户的位置,创建点
                    new SimpleMarker({
                      showPositionPoint: true, //显示定位基点
                      /**
                       * iconStyle: {
                   *     src: customize.user.userIcon,
                   * style: {
                   *         width: '20px',
                   *         height: '20px'
                   *     }
                   *   },
                       **/
                      iconStyle: 'red',
                      iconLabel: '',
                      map: map,
                      position: customize.user.userLocation
                    });
                  }

                  //标记技术人员位置,创建点
                  for (let i = 0; i < customize.staff.staffLocation.length; ++i) {
                    // 创建一个 Icon
                    let icon = new AMap.Icon({
                      // 图标尺寸
                      size: new AMap.Size(48, 46),
                      // 图标的取图地址
                      image: '',
                      // 图标所用图片大小
                      imageSize: new AMap.Size(48, 46),
                      // 图标取图偏移量
                      // imageOffset: new AMap.Pixel(-9, -3)
                    });

                    let srcImg = require('./icon_police-caps.png');
                    let markerContent = '' +
                      '<div class="amap-custom-content-marker">' +
                      '   <img src="'+srcImg+'">' +
                      '</div>';

                    if (customize.staff.staffType) {
                      //获取具体位置名称
                      let geocoder = new AMap.Geocoder({
                        // city : cityCode, //城市，默认：“全国”
                        radius: 500 //范围，默认：500
                      });
                      try {
                        geocoder.getAddress(customize.staff.staffLocation[i], function (status, result) {
                          if (status === 'complete' && result.info === 'OK') {
                            if (customize.staff.staffType === "alert") {
                              let isTop = customize.staff.staffLocation[0][1] - customize.staff.staffLocation[1][1] > 0 ? 0 : 1;
                              geocoderAlert_CallBack(i, result, isTop);
                            }
                          } else {
                            alert(result);
                          }
                        });
                      } catch (e) {
                        alert(e);
                      }
                    } else {
                      geocoder_CallBack();
                    }

                    function geocoder_CallBack() {
                      let marker = new AMap.Marker({
                        position: customize.staff.staffLocation[i],
                        // 将 icon 传入 marker
                        // icon: icon,
                        // 将 html 传给 content
                        content: markerContent,
                        // offset: new AMap.Pixel(-48, -48)
                      });
                      map.add(marker);
                    }

                    function geocoderAlert_CallBack(index, data, isTop) {
                      let marker = new AMap.Marker({
                        position: customize.staff.staffLocation[i],
                        // 将 icon 传入 marker
                        // icon: icon,
                        // 将 html 传给 content
                        content: markerContent,
                        // offset: new AMap.Pixel(-48, -48)
                      });

                      let title, mPixelY;
                      if (isTop === 0) {
                        switch (index) {
                          case 0:
                            title = "我家";
                            mPixelY = -44;
                            break;
                          case 1:
                            title = "安保";
                            mPixelY = 30;
                            break;
                          default:
                            break;
                        }
                      }
                      // 设置label标签
                      // label默认蓝框白底左上角显示，样式className为：amap-marker-label
                      marker.setLabel({
                        //修改label相对于maker的位置
                        offset: new AMap.Pixel(-170, mPixelY),
                        content:  "<div class='amap-custom-content-marker-info'>" + title + "位置 " + data.regeocode.formattedAddress + "</div>"
                        // 江门市环市二路10号幸福豪庭附近
                      });
                      map.add(marker);
                    }

                    // new SimpleMarker({
                    //     showPositionPoint: true, //显示定位基点
                    //
                    //     // iconStyle: {
                    //     //    src: customize.user.userIcon,
                    //     //    style: {
                    //     //      width: '20px',
                    //     //      height: '20px'
                    //     //    }
                    //     // },
                    //
                    //     iconStyle: 'blue',
                    //     iconLabel: '',
                    //     map: map,
                    //     position: customize.staff.staffLocation[i]
                    // });
                  }
                })

                //在用户位置处绘制圆形区域
                var circleMarker = new AMap.Circle({
                  center: new AMap.LngLat(customize.user.userLocation[0], customize.user.userLocation[1]),  // 圆心位置
                  radius: customize.WITHINNUMBER, // 圆半径,单位m
                  fillColor: 'rgba(51,136,255,0.3)',   // 圆形填充颜色
                  strokeColor: 'rgba(51,136,255,0.8)', // 描边颜色
                  strokeWeight: 1, // 描边宽度
                });

                map.add(circleMarker);

              }

              function onError(data) {
                stopAnimation();
                headStatus("获取位置信息失败！")
                alert("获取位置信息出错，请确保页面有获取GPS的权限!")
              }
            })


            // 两点之间的距离
            function computeDis(m1x, m1y, m2x, m2y) {
              var m1 = new AMap.Marker({
                map: map,
                draggable: true,
                position: new AMap.LngLat(m1x, m1y)
              });
              var m2 = new AMap.Marker({
                map: map,
                draggable: true,
                position: new AMap.LngLat(m2x, m2y)
              });
              map.setFitView();

              var line, text;

              var p1 = m1.getPosition();
              var p2 = m2.getPosition();
              var textPos = p1.divideBy(2).add(p2.divideBy(2));
              var distance = Math.round(p1.distance(p2));
              var path = [p1, p2];
              if (!line) {
                line = new AMap.Polyline({
                  map: map,
                  strokeColor: '#80d8ff',
                  isOutline: true,
                  outlineColor: 'white',
                  path: path
                });
              } else {
                line.setPath(path);
              }
              if (!text) {
                text = new AMap.Text({
                  text: '两点相距' + distance + '米',
                  position: textPos,
                  map: map,
                  style: {
                    'background-color': '#29b6f6',
                    'border-color': '#e1f5fe',
                    'font-size': '12px'
                  }
                })
              } else {
                text.setText('两点相距' + distance + '米')
                text.setPosition(textPos)
              }
            }
          });
        } else return false
      }
    },
    watch: {
      // 深度监听对象属性的变化
      locationData: {
        deep: true,
        handler(newValue, oldValue) {
          this.loadMap();
          console.log(newValue)
          console.log(oldValue)
        }
      }
    },
    computed: {
      open() {
        return this.hasLocalData
      }
    }
  }
</script>

<style lang="scss" scoped>
  .no-local-storage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }




  #container {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .info {
    width: 100%;
    height: 100%;
    background: rgba(37, 38, 45, 0);
    position: absolute;
    /*z-index: 1000;*/
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .header {
    height: 10vw;
    width: 100%;
    background: rgba(37, 38, 45, 0.7);
    /*position: absolute;*/
    /*top: 20vw;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /*z-index: 1200;*/
    color: #fff;
    font-size: 13px;
    font-weight: 500;
  }
</style>
