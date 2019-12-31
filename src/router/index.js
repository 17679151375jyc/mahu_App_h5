import Vue from "vue";
import Router from "vue-router";

Router.prototype.goBack = function(event) {
    // eventBus.$emit('goBack', event)
    window.history.go(-1);
};

Vue.use(Router);

export default new Router({
    // mode: "hash",
    // mode: "history",
    routes: [{
            path: "/login",
            name: "login",
            component: (resolve) => require(['../view/login/login.vue'], resolve),
            children: [],
        },
        {
            path: "/ma-hu-index",
            name: "ma-hu-index",
            component: (resolve) => require(['../view/mahuIndex/ma-hu-index.vue'], resolve),
            // component: () => import("../view/mahuIndex/ma-hu-index.vue"),
            children: [{
                    path: 'work-details',
                    name: 'work-details',
                    component: (resolve) => require(['../view/myHome/work-details.vue'], resolve),
                    // component: () => import("../view/myHome/work-details.vue"),
                },
                {
                    path: 'work',
                    name: 'work',
                    component: (resolve) => require(['../view/myHome/work.vue'], resolve),
                    // component: () => import("../view/myHome/work.vue"),
                    children: [{
                        path: 'work-details',
                        name: 'work-details',
                        component: (resolve) => require(['../view/myHome/work-details.vue'], resolve),
                        // component: () => import("../view/myHome/work-details.vue"),
                    }]
                },
                {
                    path: "community-add",
                    name: "community-add",
                    component: (resolve) => require(['../view/mine/communityManage/add/add.vue'], resolve),
                    // component: () => import("../view/mine/communityManage/add/add.vue"),
                    children: [{
                            path: 'choose-city',
                            name: 'choose-city',
                            component: (resolve) => require(['../view/choose/choose-city.vue'], resolve),
                            // component: () => import("../view/choose/choose-city.vue"),
                        },
                        {
                            path: 'choose-plot',
                            name: 'choose-plot',
                            component: (resolve) => require(['../view/choose/choose-plot.vue'], resolve),
                            // component: () => import("../view/choose/choose-plot.vue"),
                        }
                    ]
                },
                {
                    path: "visitor-index",
                    name: "visitor-index",
                    component: (resolve) => require(['../view/mahuIndex/myVisitor/visitor-index.vue'], resolve),
                    // component: () => import("../view/mahuIndex/myVisitor/visitor-index.vue"),
                    children: [{
                        path: "addVisitorInfo",
                        name: "addVisitorInfo",
                        component: (resolve) => require(['../components/inAndOut/addVisitorInfo.vue'], resolve),
                        // component: () => import("../components/inAndOut/addVisitorInfo.vue"),
                    }]
                },
                {
                    path: "temporary-door-index",
                    name: "temporary-door-index",
                    component: (resolve) => require(['../view/mahuIndex/myVisitor/temporary-door-index.vue'], resolve),
                    // component: () => import("../view/mahuIndex/myVisitor/temporary-door-index.vue"),
                },
                {
                    path: "addVisitorInfo",
                    name: "addVisitorInfo",
                    component: (resolve) => require(['../components/inAndOut/addVisitorInfo.vue'], resolve),
                    // component: () => import("../components/inAndOut/addVisitorInfo.vue"),
                },
                {
                    path: "inOutRecord",
                    name: "inOutRecord",
                    component: (resolve) => require(['../view/inAndOut/inOutRecord.vue'], resolve),
                    // component: () => import("../view/inAndOut/inOutRecord.vue"),
                },
                { // 设备列表
                    path: "device-index",
                    name: "device-index",
                    component: (resolve) => require(['../view/device/device-index.vue'], resolve),
                    children: [{
                            path: 'device-audit',
                            name: 'device-audit',
                            component: (resolve) => require(['../view/device/device-audit.vue'], resolve),
                        }]
                        // component: () => import('../view/device/device-audit.vue'),
                },
                { // 我的附近
                    path: "map-index",
                    name: "map-index",
                    component: (resolve) => require(['../view/map-view/map-index.vue'], resolve),
                    // component: () => import('../view/map-view/map-index.vue'),
                },
            ],
        },
        {
            path: "/service-index",
            name: "service-index",
            component: (resolve) => require(['../view/mahuService/service-index.vue'], resolve),
            // component: () => import("../view/mahuService/service-index.vue"),
            children: [{
                    path: 'family-notification-detail',
                    name: 'family-notification-detail',
                    component: (resolve) => require(['../view/mahuService/myFamily/family-notification-detail.vue'], resolve),
                    // component: () => import("../view/mahuService/myFamily/family-notification-detail.vue"),
                },
                {
                    path: 'feedback',
                    name: 'serviceFeedback',
                    component: (resolve) => require(['../view/service/feedback/feedback.vue'], resolve),
                    // component: () => import("../view/service/feedback/feedback.vue"),
                    children: [{
                            path: "feedback-apply-audit",
                            name: "feedback-apply-audit",
                            component: (resolve) => require(['../view/gate/feedbackAudit/feedback-apply-audit.vue'], resolve),
                            // component: () => import("../view/gate/feedbackAudit/feedback-apply-audit.vue"),
                        },
                        {
                            path: 'addFeedback',
                            name: 'addFeedback',
                            component: (resolve) => require(['../view/service/addFeedback/addFeedback.vue'], resolve),
                            // component: () => import("../view/service/addFeedback/addFeedback.vue"),
                            children: [{
                                path: 'picture-dispose-larger',
                                name: 'picture-dispose-larger',
                                component: (resolve) => require(['../view/other/picture-dispose-larger.vue'], resolve),
                                // component: () => import("../view/other/picture-dispose-larger.vue"),
                            }]
                        }
                    ]
                },
                {
                    path: "community-apply-list",
                    name: "community-apply-list",
                    component: (resolve) => require(['../view/gate/communityAudit/community-apply-list.vue'], resolve),
                    // component: () => import("../view/gate/communityAudit/community-apply-list.vue"),
                    children: [{
                        path: "community-apply-audit",
                        name: "community-apply-audit",
                        component: (resolve) => require(['../view/gate/communityAudit/community-apply-audit.vue'], resolve),
                        // component: () => import("../view/gate/communityAudit/community-apply-audit.vue"),
                    }, ]
                },
                {
                    path: "car-apply-list",
                    name: "car-apply-list",
                    component: (resolve) => require(['../view/gate/carAudit/car-apply-list.vue'], resolve),
                    // component: () => import("../view/gate/carAudit/car-apply-list.vue"),
                    children: [{
                        path: "car-apply-audit",
                        name: "car-apply-audit",
                        component: (resolve) => require(['../view/gate/carAudit/car-apply-audit.vue'], resolve),
                        // component: () => import("../view/gate/carAudit/car-apply-audit.vue"),
                    }, ]
                },
                {
                    path: "feedback-apply-list",
                    name: "feedback-apply-list",
                    component: (resolve) => require(['../view/gate/feedbackAudit/feedback-apply-list.vue'], resolve),
                    // component: () => import("../view/gate/feedbackAudit/feedback-apply-list.vue"),
                    children: [{
                        path: "feedback-apply-audit",
                        name: "feedback-apply-audit",
                        component: (resolve) => require(['../view/gate/feedbackAudit/feedback-apply-audit.vue'], resolve),
                        // component: () => import("../view/gate/feedbackAudit/feedback-apply-audit.vue"),
                    }, ]
                },
                {
                    path: "notification-list",
                    name: "notification-list",
                    component: (resolve) => require(['../view/gate/notification/notification-list.vue'], resolve),
                    // component: () => import("../view/gate/notification/notification-list.vue"),
                    children: [{
                            path: "notification-add",
                            name: "notification-add",
                            component: (resolve) => require(['../view/gate/notification/notification-add.vue'], resolve),
                            // component: () => import("../view/gate/notification/notification-add.vue"),
                        },
                        {
                            path: "notification-detail",
                            name: "notification-detail",
                            component: (resolve) => require(['../view/gate/notification/notification-detail.vue'], resolve),
                            // component: () => import("../view/gate/notification/notification-detail.vue"),
                        },
                    ]
                }
            ]
        },
        // {
        //   path: "/inAndOut",
        //   name: "inOut",
        //   component: (resolve)=>require(['../view/inAndOut/inAndOut.vue'],resolve),
        //   // component: () => import("../view/inAndOut/inAndOut.vue"),
        //   children: [
        //     {
        //       path: "inOutRecord",
        //       name: "inOutRecord",
        //       component: (resolve)=>require(['../view/inAndOut/inOutRecord.vue'],resolve),
        //       // component: () => import("../view/inAndOut/inOutRecord.vue"),
        //     },
        //     {
        //       path: "addVisitorInfo",
        //       name: "addVisitorInfo",
        //       component: (resolve)=>require(['../components/inAndOut/addVisitorInfo.vue'],resolve),
        //       // component: () => import("../components/inAndOut/addVisitorInfo.vue"),
        //     },
        //   ],
        //   meta: {
        //     keepAlive: false
        //   },
        //   error: import("../view/inAndOut/inAndOut.vue"),
        // },
        // {
        //   path: "/service",
        //   name: "service",
        //   component: (resolve)=>require(['../view/service/service.vue'],resolve),
        //   // component: () => import("../view/service/service.vue"),
        //   children: [
        //     {
        //       path: 'feedback',
        //       name: 'serviceFeedback',
        //       component: (resolve)=>require(['../view/service/feedback/feedback.vue'],resolve),
        //       // component: () => import("../view/service/feedback/feedback.vue"),
        //       children: [
        //         {
        //           path: 'addFeedback',
        //           name: 'addFeedback',
        //           component: (resolve)=>require(['../view/service/addFeedback/addFeedback.vue'],resolve),
        //           // component: () => import("../view/service/addFeedback/addFeedback.vue"),
        //           children: [
        //             {
        //               path: 'picture-dispose-larger',
        //               name: 'picture-dispose-larger',
        //               component: (resolve)=>require(['../view/other/picture-dispose-larger.vue'],resolve),
        //               // component: () => import("../view/other/picture-dispose-larger.vue"),
        //             }
        //           ]
        //         }
        //       ]
        //     },
        //     {
        //       path: 'propertyDetails',
        //       name: 'propertyDetails',
        //       component: (resolve)=>require(['../view/service/propertyDetails/propertyDetails.vue'],resolve),
        //       // component: () => import("../view/service/propertyDetails/propertyDetails.vue"),
        //     }
        //   ]
        // },
        // {
        //   path: "/my-home",
        //   name: "my-home",
        //   component: (resolve)=>require(['../view/myHome/my-home.vue'],resolve),
        //   // component: () => import("../view/myHome/my-home.vue"),
        //   children: [
        //     {
        //       path: 'work',
        //       name: 'work',
        //       component: (resolve)=>require(['../view/myHome/work.vue'],resolve),
        //       // component: () => import("../view/myHome/work.vue"),
        //       children: [
        //         {
        //           path: 'work-details',
        //           name: 'work-details',
        //           component: (resolve)=>require(['../view/myHome/work-details.vue'],resolve),
        //           // component: () => import("../view/myHome/work-details.vue"),
        //         }
        //       ]
        //     },
        //     {
        //       path: "installation",
        //       name: "installation",
        //       component: (resolve)=>require(['../view/myHome/installation.vue'],resolve),
        //       // component: () => import("../view/myHome/installation.vue"),
        //       children: [
        //         {
        //           path: "address-management",
        //           name: "address-management",
        //           component: (resolve)=>require(['../view/myHome/address-management.vue'],resolve),
        //           // component: () => import("../view/myHome/address-management.vue"),
        //           children: [
        //             {
        //               path: "address-management-change",
        //               name: "address-management-change",
        //               component: (resolve)=>require(['../view/myHome/address-management-change.vue'],resolve),
        //               // component: () => import("../view/myHome/address-management-change.vue"),
        //             }
        //           ]
        //         }
        //       ]
        //     },
        //   ]
        // },
        {
          path: "/mine",
          name: "mine",
          component: (resolve) => require(['../view/mine/mine.vue'], resolve),
          // component: () => import("../view/mine/mine.vue"),
          children: [{
                    path: "userManage",
                    name: "userManage",
                    component: (resolve) => require(['../view/mine/userManage/userManage.vue'], resolve),
                    // component: () => import("../view/mine/userManage/userManage.vue"),
                },
                {
                    path: 'community-add',
                    name: 'community-add',
                    component: (resolve) => require(['../view/mine/communityManage/add/add.vue'], resolve),
                    // component: () => import("../view/mine/communityManage/add/add.vue"),
                    children: [{
                            path: 'choose-city',
                            name: 'choose-city',
                            component: (resolve) => require(['../view/choose/choose-city.vue'], resolve),
                            // component: () => import("../view/choose/choose-city.vue"),
                        },
                        {
                            path: 'choose-plot',
                            name: 'choose-plot',
                            component: (resolve) => require(['../view/choose/choose-plot.vue'], resolve),
                            // component: () => import("../view/choose/choose-plot.vue"),
                        }
                    ]
                },
                // {
                //   path: 'community-add-manage',
                //   name: 'community-add-manage',
                //   component: (resolve)=>require(['../view/mine/communityManage/community-add-manage.vue'],resolve),
                //   // component: () => import("../view/mine/communityManage/community-add-manage.vue"),
                //   children: [
                //     {
                //       path: 'community-add',
                //       name: 'community-add',
                //       component: (resolve)=>require(['../view/mine/communityManage/add/add.vue'],resolve),
                //       // component: () => import("../view/mine/communityManage/add/add.vue"),
                //     }
                //   ]
                // },
                {
                    path: 'communityManage',
                    name: 'communityManage',
                    component: (resolve) => require(['../view/mine/communityManage/communityManage.vue'], resolve),
                    // component: () => import("../view/mine/communityManage/communityManage.vue"),
                    children: [{
                        path: 'add',
                        name: 'communityAdd',
                        component: (resolve) => require(['../view/mine/communityManage/add/add.vue'], resolve),
                        // component: () => import("../view/mine/communityManage/add/add.vue"),
                    }]
                },
                {
                    path: 'deviceManage',
                    name: 'deviceManage',
                    component: (resolve) => require(['../view/mine/deviceManage/deviceManage.vue'], resolve),
                    // component: () => import("../view/mine/deviceManage/deviceManage.vue"),
                    children: [{
                        path: 'editArea',
                        name: 'deviceEditArea',
                        component: (resolve) => require(['../view/mine/deviceManage/editArea/editArea.vue'], resolve),
                        // component: () => import("../view/mine/deviceManage/editArea/editArea.vue"),
                    }]
                },
                {
                    path: 'personnelManage',
                    name: 'personnelManage',
                    component: (resolve) => require(['../view/mine/personnelManage/personnelManage.vue'], resolve),
                    // component: () => import("../view/mine/personnelManage/personnelManage.vue"),
                },
                {
                    path: 'shareManage',
                    name: 'shareManage',
                    component: (resolve) => require(['../view/mine/shareManage/shareManage.vue'], resolve),
                    // component: () => import("../view/mine/shareManage/shareManage.vue"),
                    children: [{
                        path: 'details',
                        name: 'shareDetails',
                        component: (resolve) => require(['../view/mine/shareManage/details/details.vue'], resolve),
                        // component: () => import("../view/mine/shareManage/details/details.vue"),
                    }]
                },
                {
                    path: 'packages-pay',
                    name: 'packages-pay',
                    component: (resolve) => require(['../view/mine/packagesPay/packages-pay-index.vue'], resolve),
                    // component: () => import("../view/mine/packagesPay/packages-pay-index.vue"),
                    children: [{
                        path: 'packages-pay-details',
                        name: 'packages-pay-details',
                        component: (resolve) => require(['../view/mine/packagesPay/packages-pay-details.vue'], resolve),
                        // component: () => import("../view/mine/packagesPay/packages-pay-details.vue"),
                    }]
                },
                {
                    path: 'share-manage',
                    name: 'share-manage',
                    component: (resolve) => require(['../view/mine/shareManage/share-manage.vue'], resolve),
                    // component: () => import("../view/mine/shareManage/share-manage.vue"),
                    children: [{
                        path: 'share-manage-member',
                        name: 'share-manage-member',
                        component: (resolve) => require(['../view/mine/shareManage/share-manage-member.vue'], resolve),
                        // component: () => import("../view/mine/shareManage/share-manage-member.vue"),
                    }]
                },
                {
                    path: "network-index",
                    name: "network-index",
                    component: (resolve) => require(['../view/mine/network/network-index.vue'], resolve),
                    // component: () => import('../view/mine/network/network-index.vue'),
                },
                {
                    path: "setting",
                    name: "setting",
                    component: (resolve) => require(['../view/mine/setting/setting.vue'], resolve),
                    // component: () => import("../view/mine/setting/setting.vue"),
                    children: [{
                            path: "message",
                            name: "settingMessage",
                            component: (resolve) => require(['../view/mine/setting/message/message.vue'], resolve),
                            // component: () => import("../view/mine/setting/message/message.vue"),
                        },
                        {
                            path: "help",
                            name: "settingHelp",
                            component: (resolve) => require(['../view/mine/setting/help/help.vue'], resolve),
                            // component: () => import("../view/mine/setting/help/help.vue"),
                        },
                        {
                            path: "about",
                            name: "settingAbout",
                            component: (resolve) => require(['../view/mine/setting/about/about.vue'], resolve),
                            // component: () => import("../view/mine/setting/about/about.vue"),
                        },
                    ]
                },
                {
                    path: "myCar",
                    name: "myCar",
                    component: (resolve) => require(['../view/mine/myCar/my-car.vue'], resolve),
                    // component: () => import("../view/mine/myCar/my-car.vue"),
                },
                {
                    path: "myPlot",
                    name: "myPlot",
                    component: (resolve) => require(['../view/mine/myPlot/my-plot.vue'], resolve),
                    // component: () => import("../view/mine/myPlot/myPlot.vue"),
                    children: [{
                            path: 'my-plot-details',
                            name: 'my-plot-details',
                            component: (resolve) => require(['../view/mine/myPlot/my-plot-details.vue'], resolve),
                            // component: () => import("../view/mine/myPlot/myPlot-details.vue"),
                        },
                        {
                            path: 'community-add-manage',
                            name: 'community-add-manage',
                            component: (resolve) => require(['../view/mine/communityManage/community-add-manage.vue'], resolve),
                            component: () =>
                                import ("../view/mine/communityManage/community-add-manage.vue"),
                            children: [{
                                path: 'community-add',
                                name: 'community-add',
                                component: (resolve) => require(['../view/mine/communityManage/add/add.vue'], resolve),
                                // component: () => import("../view/mine/communityManage/add/add.vue"),
                                children: [{
                                        path: 'choose-city',
                                        name: 'choose-city',
                                        component: (resolve) => require(['../view/choose/choose-city.vue'], resolve),
                                        // component: () => import("../view/choose/choose-city.vue"),
                                    },
                                    {
                                        path: 'choose-plot',
                                        name: 'choose-plot',
                                        component: (resolve) => require(['../view/choose/choose-plot.vue'], resolve),
                                        // component: () => import("../view/choose/choose-plot.vue"),
                                    }
                                ]
                            }]
                        },
                        {
                            path: 'community-add',
                            name: 'community-add',
                            component: (resolve) => require(['../view/mine/communityManage/add/add.vue'], resolve),
                            // component: () => import("../view/mine/communityManage/add/add.vue"),
                            children: [{
                                    path: 'choose-city',
                                    name: 'choose-city',
                                    component: (resolve) => require(['../view/choose/choose-city.vue'], resolve),
                                    // component: () => import("../view/choose/choose-city.vue"),
                                },
                                {
                                    path: 'choose-plot',
                                    name: 'choose-plot',
                                    component: (resolve) => require(['../view/choose/choose-plot.vue'], resolve),
                                    // component: () => import("../view/choose/choose-plot.vue"),
                                }
                            ]
                        },
                        {
                            path: 'my-plot-invite-people',
                            name: 'my-plot-invite-people',
                            component: (resolve) => require(['../view/mine/myPlot/my-plot-invite-people.vue'], resolve),
                            // component: () => import("../view/mine/myPlot/my-plot-invite-people.vue"),
                        },
                        {
                            path: 'my-plot-renew',
                            name: 'my-plot-renew',
                            component: (resolve) => require(['../view/mine/myPlot/my-plot-renew.vue'], resolve),
                            // component: () => import("../view/mine/myPlot/myPlot-renew.vue"),
                        },
                    ]
                },
                {
                    path: 'card-bag',
                    name: 'card-bag',
                    component: (resolve) => require(['../view/mine/cardBag/card-bag.vue'], resolve),
                    // component: () => import("../view/mine/cardBag/card-bag.vue"),
                    children: [{
                      path: 'coupon-index',
                      name: 'coupon-index',
                      component: (resolve) => require(['../view/mine/cardBag/coupon-index.vue'], resolve),
                      // component: () => import("../view/mine/cardBag/coupon-index.vue"),
                    }]
                },
                {
                    path: 'changePhone',
                    name: 'changePhone',
                    component: (resolve) => require(['../view/mine/setting/account/changePhone/changePhone.vue'], resolve),
                    // component: () => import("../view/mine/setting/account/changePhone/changePhone.vue"),
                },
                {
                    path: 'changePwd',
                    name: 'changePwd',
                    component: (resolve) => require(['../view/mine/setting/account/changePwd/changePwd.vue'], resolve),
                    // component: () => import("../view/mine/setting/account/changePwd/changePwd.vue"),
                },
                {
                    path: 'weChat-index',
                    name: 'weChat-index',
                    component: (resolve) => require(['../view/mine/weChat/weChat-index.vue'], resolve),
                    // component: () => import("../view/mine/weChat/weChat-index.vue"),
                }
            ]
        },

        {
            path: '/work',
            name: 'work',
            component: (resolve) => require(['../view/myHome/work.vue'], resolve),
            // component: () => import("../view/myHome/work.vue"),
            children: [{
                path: 'work-details',
                name: 'work-details',
                component: (resolve) => require(['../view/myHome/work-details.vue'], resolve),
                // component: () => import("../view/myHome/work-details.vue"),
            }]
        },

      {
        path: "/amap",
        name: "amap",
        component: (resolve) => require(['../view/map.vue'], resolve),
        // component: () => import("../view/map.vue"),
      },
      {
        path: '/coupon-index',
        name: 'coupon-index',
        component: (resolve) => require(['../view/mine/cardBag/coupon-index.vue'], resolve),
        // component: () => import("../view/mine/cardBag/coupon-index.vue"),
      },
      {
        path: "/",
        name: "/",
      },
        {
          path: "*",
          redirect: {
            name: '/'
          } //重定向到ma-hu-index
        },
    ]
});