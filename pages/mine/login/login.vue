<template>
	<view class="main">
		<view class="logo">
			<image class="logo-image" src="../../../static/logo.png" mode="aspectFit"></image>
			|<view class="login-title">登录</view>
			
		</view>
		<view class="input">
			<uni-forms ref="form" >
				<uni-field label="姓名" name="name" placeholder="" />
				
				<button form-type="submit">Submit</button>
				<button form-type="reset">Reset</button>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" scoped>
.main{
	.logo{
		display: flex;
		flex-direction: row;
		margin: 0 auto;
		width: 400rpx;
		height: 360rpx;
		.logo-image{
			width: 60%;
			height: 100%;
		}
		.login-title{
			line-height: 360rpx;
		}
	}
	
}

</style>
