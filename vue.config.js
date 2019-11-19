const path = require('path');
// const BASE_URL = process.env.NODE_ENV === 'production' ?
//     '/family' //开发
//     : process.env.NODE_ENV === 'test' ?
//     '/FamilyClient'//测试
//     : '/'
const resolve = dir => {
    return path.join(__dirname, dir)
};

function mVersion() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1 > 9 ? now.getMonth() + 1 : `0${now.getMonth()+1}`;
    let date = now.getDate() > 9 ? now.getDate() : `0${now.getDate()}`;
    let hour = now.getHours() > 9 ? now.getHours() : `0${now.getHours()}`;
    let minute = now.getMinutes() > 9 ? now.getMinutes() : `0${now.getMinutes()}`;
    let second = now.getSeconds() > 9 ? now.getSeconds() : `0${now.getSeconds()}`;
    process.env.VUE_APP_Version = year + month + date + hour + minute + second;
    return year + month + date + hour + minute + second;
}

module.exports = {
    publicPath: process.env.VUE_APP_MPublicPath,
    outputDir: process.env.VUE_APP_MOutputDir,

    // mVersion: Version(),

    configureWebpack: config => {
        mVersion();
    },
    // chainWebpack: config => {
    //     config.resolve.symlinks(true);
    // },

    css: {
        loaderOptions: {
            stylus: {
                'resolve url': true,
                'import': [
                    './src/theme'
                ]
            }
        }
    },

    // baseUrl: BASE_URL,
    pluginOptions: {
        'cube-ui': {
            postCompile: true,
            theme: true
        }
    },
    lintOnSave: true,
    configureWebpack: { // 覆盖webpack默认配置的都在这里
        resolve: { // 配置解析别名
            alias: {
                '@': path.resolve(__dirname, './src'),
                '_c': path.resolve(__dirname, './src/components'),
                '_libs': path.resolve(__dirname, './src/libs'),
                '_assets': path.resolve(__dirname, './src/assets'),
                '_v_assets': path.resolve(__dirname, './src/view/assetss'),
            }
        }
    },

    // chainWebpack: config => {
    //     config.resolve.alias
    //         .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    //         .set('_c', resolve('src/components'))
    //         .set('_libs', resolve('src/libs'))
    //         .set('_assets', resolve('src/assets'))
    //         .set('_v_assets', resolve('src/view/assets'))
    // },
    // 设为false打包时不生成.map文件
    productionSourceMap: false,
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    // eslint-disable-next-line no-dupe-keys
    devServer: {
        open: process.platform === 'darwin',
        // host: '172.31.1.210',
        // port: 8080,
        https: true,
        hotOnly: true,
        disableHostCheck: true,
        // proxy: {

        //     ws: false


        // },

        // lintOnSave: false,
        // publicPath: `${process.env.NODE_ENV == 'test'? '/FamilyClient' : '/family'}`,
        // outputDir: `${process.env.NODE_ENV == 'test'? process.env.outputDir:'/family'}`,
        // eslint-disable-next-line no-dupe-keys
        // runtimeCompiler: true,
    }
};