<template>
	<view class="main">
		<uni-list>
			<uni-list-item title="账号与安全" note=" " link="navigateTo"></uni-list-item>
			<uni-list-item title="新消息提醒" note=" " link="navigateTo"></uni-list-item>
			<uni-list-item title="账号与安全" note=" " link="navigateTo"></uni-list-item>
			<uni-list-item title="隐私设置" note=" " link="navigateTo"></uni-list-item>
			<uni-list-item title="通用设置" note=" " link="navigateTo"></uni-list-item>
			
			<view class="border"></view>
			<uni-list-item title="检查更新" note=" " link="navigateTo"></uni-list-item>
			<uni-list-item title="软件不错,赞一个" note=" " link="navigateTo"></uni-list-item>
			<uni-list-item title="帮助中心" note=" " link="navigateTo"></uni-list-item>
			<uni-list-item title=""  link>
				<template slot="header">
					<button class="sex" type="default" size="mini" open-type="">意见反馈</button>
				</template>
			</uni-list-item>
			<uni-list-item title="帐号注销" note=" " link="navigateTo"></uni-list-item>
			
			<view class="border"></view>
			<uni-list-item title="关于Audio听书" note=" " link="navigateTo"></uni-list-item>
			<uni-list-item title="清除缓存" note=" " link="navigateTo"></uni-list-item>
			
			<view v-if="isLogin">
				<view class="border"></view>
				<button type="default" class="button" @click="changelogin" size="mini">切换账号</button>
				<view class="border"></view>
				<button type="default" class="button" @click="logout" size="mini">退出登录	</button>
			</view>
			
			<view v-if="!isLogin">
				<view class="border"></view>
				<button type="default" class="button" size="mini" @click="toWhat('login')">登录账号</button>
			</view>
			
			<view class="border"></view>
			<button type="warn" class="err" size="mini">退出程序</button>
		</uni-list>
	</view>
</template>

<script>
	import { getData, postData } from '@/http/fetch.js';
	export default {
		data() {
			return {
				isLogin:this.$store.state.user.hasLogin
			};
		},
		methods:{
			//切换登录
			changelogin(){
				
			},
			//登出
			async logout() {
				let resp = await getData('logout/')
				console.log(resp);
				uni.setStorageSync('user','')
				this.$store.commit('USER_LOGOUT')
				this.isLogin = false
			},
			toWhat(s) {
				let path = ''
				switch(s) {
					case 'login':
						path = '../login/login'
				}
				uni.navigateTo({
					url:path
				})
			}
				
		}
	}
</script>

<style lang="less" scoped>
.main{
	height: 100%;
	width: 100%;
	background-color: #f8f8f8;
}
.border{
	width: 100vw;
	height:20rpx;
	background-color: #f8f8f8;
}
.button{
	width:100%;
	background-color: #FFFFFF;
	
	padding: 20rpx;
	
}
.err{
	width:100%;
	padding: 20rpx;
}
.sex {
	width: 90%;
	margin: 0;
	padding: 0;
	height: 50rpx;
	color: #3b4144;
	background-color: rgba(255,255,255,0);
	border: none !important;
	text-align: left;
	&:after{
		border: none !important;
		// background-color: none;
	}
}
</style>
