import Vue from 'vue'
import App from './App'
import anime from 'vue-animejs'
import store from 'store/index.js'
import common from './common.js'
//喜马拉雅api
import {
	config,
	XMLY,
	XMplayer
} from '@xmly-fem/web-jssdk'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$common = common

App.mpType = 'app'

Vue.use(anime)
// 免登录授权
config({
	app_key: 'b617866c20482d133d5de66fceb37da3', // 必传，官方提供的 app_key：b617866c20482d133d5de66fceb37da3 仅供测试，有调用次数限制，上线需替换为自己的 app_key。
	// 官方提供测试使用的 sig_url => https://api.ximalaya.com/openapi-collector-app/jssdk_sig
	// （限制了 app_key 必须是测试账号，并且限制了调用次数，上线需替换为自己的 sig_url）
	sig_url: 'https://api.ximalaya.com/openapi-collector-app/jssdk_sig', // 免登录授权，必须传 sig_url，和 get_access_token 互斥
	debug: true, // 是否在控制台打印日志
})
//调用接口，获取喜马拉雅数据
const xmly = new XMLY()

// 调用接口获取喜马拉雅数据
// 获取分类列表
xmly.get('https://api.ximalaya.com/categories/list').then(res => {
	// console.log(res)
})


Vue.filter('imgSrc', function(src) {
	let url = 'http://127.0.0.1:8000' + src
	return url
})

const app = new Vue({
	...App
})
app.$mount()
