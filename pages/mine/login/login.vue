<template>
	<view class="main">
		<view class="logo">
			<image class="logo-image" src="../../../static/logo.png" mode="aspectFit"></image>
			<view class="line">|</view>
			<view v-show="loginOr" class="login-title">登录</view>
			<view v-show="!loginOr" class="login-title">注册</view>
		</view>
		<view class="input">
			<!-- 登录 -->
			<uni-forms class="form" ref="login" v-show="loginOr" label-width="50" :rules="rules">
				<uni-forms-item label="用户名" name="username"><uni-easyinput v-model="loginData.email" placeholder="请输入用户名" /></uni-forms-item>
				<uni-forms-item label="密码" name="passward"><uni-easyinput type="passward" v-model="loginData.passward" placeholder="请输入密码" /></uni-forms-item>
				<uni-forms-item label=" " name="" class="login-btn">
					<view class="sub-btn">
						<button class="btn" size="mini" @click="Login">登录</button>
						<view class="register-link" @click="changeRegister">注册账号</view>
					</view>
				</uni-forms-item>
				<!-- <uni-forms-item label=" " name="" class="login-btn">
					<view class="sub-btn">
						<view class="register-link" @click="alterPassward">修改密码</view>
					</view>
				</uni-forms-item> -->
			</uni-forms>
			<!-- 注册 -->
			<uni-forms class="form" ref="register" v-show="!loginOr" label-width="50" :rules="rules">
				<uni-forms-item label="邮箱" name="email"><uni-easyinput v-model="registerData.email" placeholder="请输入邮箱" /></uni-forms-item>
				<uni-forms-item label="用户名" name="username"><uni-easyinput v-model="registerData.username" placeholder="作为登录帐号" /></uni-forms-item>
				<uni-forms-item label="密码" name="passward"><uni-easyinput v-model="registerData.passward" placeholder="请输入密码" /></uni-forms-item>
				<uni-forms-item label="验证码" name="code">
					<uni-easyinput v-model="registerData.code" maxlength="6" />
					<button size="mini" ref="code" class="get-code" @click="getCode">获取验证码</button>
				</uni-forms-item>
				<uni-forms-item label=" " name="" class="login-btn">
					<view class="sub-btn">
						<button class="btn" size="mini" @click="Register">注册</button>
						<view class="register-link" @click="changeLogin">账号登录</view>
					</view>
				</uni-forms-item>
			</uni-forms>
		</view>
		<!-- 其他登录 -->
		<view class="other-login">
			<view class="login-type">
				<uni-icons size="25" type="qq"></uni-icons>
				<uni-icons size="25" type="weixin"></uni-icons>
				<uni-icons size="25" type="weibo"></uni-icons>
			</view>

			<view class="tiaokuan">
				<checkbox-group @change="clauseChange">
					<label>
						<checkbox style="transform:scale(0.5)" color="#ffaa00" checked value="1" />
						<text>
							我已经同意
							<text class="underline">用户协议</text>
							和
							<text class="underline">隐私政策</text>
						</text>
					</label>
				</checkbox-group>
			</view>
		</view>
	</view>
</template>

<script>
import { getData, postData } from '@/http/fetch.js';
export default {
	data() {
		return {
			//条款
			clause: '1',
			loginOr: true,
			loginData: {
				email: '',
				passward: ''
			},
			registerData: {
				email: '',
				passward: '',
				username: '',
				cede: 0
			},
			rules: {
				email: {
					rules: [
						{
							required: true,
							errorMessage: '请输入账号'
						},
						{
							format: 'email',
							errorMessage: '请输入正确的邮箱地址'
						}
					]
				},
				passward: {
					rules: [
						{
							required: true,
							errorMessage: '请输入密码'
						},
						{
							minLength: 6,
							maxLength: 16,
							errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符'
						}
					]
				},
				username: {
					rules: [
						{
							required: true,
							errorMessage: '请输入用户名'
						},
						{
							minLength: 2,
							maxLength: 8,
							errorMessage: '用户名长度在 {minLength} 到 {maxLength} 个字符'
						}
					]
				},
				code: {
					rules: [
						{
							required: true,
							errorMessage: '请输入验证码'
						},
						{
							pattern: /^\d{6}$/,
							errorMessage: '请输入6位验证码'
						}
					]
				}
			}
		};
	},
	methods: {
		//切换登录/注册
		changeRegister() {
			this.loginOr = false;
		},
		changeLogin() {
			this.loginOr = true;
		},
		alterPassward() {},
		//登录
		Login() {
			if (this.clause !== '1') {
				this.toast('请选择条款');
				return;
			}
			this.$refs.login
				.submit()
				.then(async (res) => {
					let set = await postData('login/', res)
						this.toast(set.msg);
						if(set.msg== '登陆成功') {
							//stroge中放用户信息id
							uni.setStorageSync('user',set.user)
							this.$store.commit('USER_LOGIN', set.user)
							let userinfo = await getData('user/getUserInfo/?username=' + set.user);
							this.$store.commit('USER_INFO', userinfo);
							uni.navigateBack()
						}
						console.log(set);
				})
				.catch(err => {
					console.log('表单错误信息',err);
				});
		},
		//Toast 提示信息
		toast(data) {
			uni.showToast({
				title: data,
				icon: 'none'
			});
		},
		//注册
		Register() {
			if (this.clause !== '1') {
				uni.showToast({
					title: '请选择条款',
					icon: 'none'
				});
				return;
			}
			this.$refs.register
				.submit()
				.then(async (res)=> {
					let set = await postData('register/', res)
					this.toast(set.msg)
					if(set.msg == '注册成功'){
						this.loginOr = true;
					}
					console.log(set);
				})
				.catch(err => {
					console.log('表单错误信息：', err);
				});
		},
		// 接受条款
		clauseChange(d) {
			this.clause = d.detail.value[0];
		},
		//获取验证码
		async getCode() {
			let email = this.registerData.email;
			let test = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email);
			if (!test) {
				this.toast('邮箱格式错误')
			} else {
				let resp = await getData('register/?email=' + email);
				// resp = eval(resp);
				this.toast(resp['msg'])
				
			}
		}
	}
};
</script>

<style lang="less" scoped>
.main {
	width: 100%;
	height: 100%;
	background-image: linear-gradient(to top, #ffbecf, #ffffff, #ffe2a8);
	.logo {
		position: absolute;
		top: 15vh;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-around;
		margin-top: 100rpx;
		margin: 0 auto;
		width: 400rpx;
		height: 160rpx;
		.logo-image {
			width: 60%;
			height: 100%;
		}
		.login-title {
			line-height: 150rpx;
			font-size: 40rpx;
			font-weight: bold;
			color: #d28278;
		}
		.line {
			.login-title();
			color: #666;
		}
	}
	.input {
		position: absolute;
		top: 30vh;
		left: 0;
		right: 0;
		width: 500rpx;
		margin: 0rpx auto;
		height: 750rpx;
		.form {
			background-color: #fff;
			// opacity: 0.6;
			border-radius: 20rpx;
			box-shadow: 0rpx 0rpx 50rpx #fff0d2;
			.sub-btn {
				width: 100%;
				position: relative;
				.btn {
					// width: 130rpx;
					// height: 60rpx;
				}
				.register-link {
					// width: 100%;
					position: absolute;
					right: 0;
					bottom: 20rpx;
					display: inline-block;
					font-size: 16rpx;
					// line-height: 60rpx;
					color: #888;
				}
				.passward-link {
					// width: 100%;
					position: absolute;
					right: 0;
					bottom: 20rpx;
					display: inline-block;
					font-size: 16rpx;
					// line-height: 60rpx;
					color: #888;
				}
			}
		}
	}
}
.other-login {
	position: absolute;
	bottom: 5vh;
	width: 500rpx;
	left: 0;
	right: 0;
	margin: 0 auto 0;
	.login-type {
		display: flex;
		justify-content: space-around;
	}
	.tiaokuan {
		margin: 30rpx auto;
		width: 85%;
		font-size: 16rpx;
		.underline {
			text-decoration: underline;
		}
	}
}
.get-code {
	margin-top: 20rpx;
	position: absolute;
	top: -15rpx;
	right: 5rpx;
	// width: 100%;
	background-color: #fff;
}
</style>
