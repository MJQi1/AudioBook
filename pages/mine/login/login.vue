<template>
	<view class="main">
		<view class="logo">
			<image class="logo-image" src="../../../static/logo.png" mode="aspectFit"></image>
			<view class="line"> | </view>
			<view v-show="loginOr" class="login-title">登录</view>
			<view v-show="!loginOr" class="login-title">注册</view>
			
		</view>
		<view class="input" >
			<!-- 登录 -->
			<uni-forms 
			class="form"
			ref="form"
			v-show="loginOr"
			 label-width="50"
			:form-rules="sdaf" 
			@submit="login" 
			@reset="rest" 
			@validate="asdf">
				<uni-forms-item label="帐号" name="">
					<uni-easyinput v-model="dfs" placeholder="请输入手机号/邮箱" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="">
					<uni-easyinput  v-model="dfs" placeholder="请输入密码" />
				</uni-forms-item>
				<uni-forms-item label=" " name="" class="login-btn">
					<button size="mini" form-type="submit">登录</button>
					<view class="register-link" @click="register">没有账号？立即注册</view>
				</uni-forms-item>
				
			</uni-forms>
			<!-- 注册 -->
			<uni-forms 
			class="form"
			ref="form"
			v-show="!loginOr"
			 label-width="50"
			:form-rules="sdaf" 
			@submit="login" 
			@reset="rest" 
			@validate="asdf">
				<uni-forms-item label="帐号" name="">
					<uni-easyinput v-model="dfs" placeholder="请输入手机号/邮箱" />
				</uni-forms-item>
				<uni-forms-item label="用户名" name="">
					<uni-easyinput v-model="dfs" placeholder="请输用户名" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="">
					<uni-easyinput  v-model="dfs" placeholder="请输入密码" />
				</uni-forms-item>
				<uni-forms-item label="验证码" name="">
					<uni-easyinput  v-model="s" placeholder="输入验证码" />
					<button size="mini" class="get-code">获取验证码</button>
				</uni-forms-item>
				<uni-forms-item label=" " name="" class="login-btn">
					<button size="mini" form-type="submit">注册</button>
					<view class="register-link" @click="changeLogin">已有账号？立即登录</view>
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
				<label>
					<checkbox style="transform:scale(0.5)"  color="#ffaa00" :value="1" /><text>我已经同意<text class="underline">用户协议</text>和<text class="underline">隐私政策</text></text>
				</label>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginOr:true
			};
		},
		methods:{
			//切换登录/注册
			register(){
				this.loginOr = false
			},
			changeLogin(){
				this.loginOr = true
			}
		}
	}
</script>

<style lang="less" scoped>
.main{
	width: 100%;
	height: 100%;
	background-image: linear-gradient(to top,#ffbecf,#ffffff,#ffe2a8);
	.logo{
		display: flex;
		justify-content: space-around;
		margin-top: 100rpx;
		margin: 0 auto;
		width: 400rpx;
		height: 560rpx;
		.logo-image{
			width: 60%;
			height: 100%;
		}
		.login-title{
			line-height: 550rpx;
			font-size: 40rpx;
			font-weight: bold;
			color: #d28278;
		}
		.line{
			.login-title();
			color: #666;
		}
	}
	.input{
		width: 500rpx;
		margin: 0rpx auto;
		height: 750rpx;
		.form{
			background-color: #fff;
			// opacity: 0.6;
			border-radius: 20rpx;
			box-shadow: 0rpx 0rpx 50rpx #fff0d2;
			.login-btn{
				display: flex;
				align-items: center;
				.register-link{
					position: relative;
					bottom: 15rpx;
					display: inline-block;
					margin-left: 40rpx;
					font-size: 16rpx;
					line-height: 60rpx;
					color: #888;
				}
			}	
		}
		
	}
	
	
}
.other-login{
		width: 500rpx;
		margin: 0 auto 0;
		.login-type{
			display: flex;
			justify-content: space-around;
		}
		.tiaokuan{
			margin: 30rpx auto;
			width: 75%;
			font-size: 16rpx;
			.underline{
				text-decoration: underline;
			}
		}
	}
.get-code{
	margin-top: 20rpx;
	position: relative;
	left: 165rpx;
}

</style>
