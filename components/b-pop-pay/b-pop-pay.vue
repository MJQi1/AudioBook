<template>
	<view class="main">
		<view class="back"><uni-icons type="back" size="25" @click="close"></uni-icons></view>
		<uni-list class="list">
			<radio-group name="" @change="radioData">
				<uni-list-item class="list" title="" thumb="" note="">
					<template slot="header">
						<image class="payLogo1" src="https://gw.alipayobjects.com/mdn/member_frontWeb/afts/img/A*h7o9Q4g2KiUAAAAAAAAAAABkARQnAQ" mode="aspectFit"></image>
					</template>
					<template slot="footer">
						
							<radio value="apply"/>
					</template>
				</uni-list-item>
				<uni-list-item class="list" title="" note="">
					<template slot="header">
						<image class="payLogo2" src="../../static/icons/weixinPay.svg" mode="aspectFit"></image>
					</template>
					<template slot="footer">
						<label class="radio">
							<radio value="wx"/>
						</label>
					</template>
				</uni-list-item>
			</radio-group>
			
		</uni-list>
		<view class="pay" @click="NowPay()">立即支付</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			choose:''
		};
	},
	inject: ['popup'],
	methods: {
		close() {
			this.popup.close();
		},
		//获取radio值
		radioData(e){
			this.choose = e.detail.value
		},
		// 立即支付
		NowPay(){
			if(this.choose === 'apply'){
				this.popup.close();
				
				uni.showToast({
					title:'支付宝支付成功'
				})
			}else if(this.choose === 'wx'){
				this.popup.close();
				
				uni.showToast({
					title:'微信支付成功'
				})
			}
		}
	}
};
</script>

<style lang="less">
.main {
	width: 100%;
	height: 460rpx;
	background-color: #fff;
}
.list {
	background-color: #f8f8f8;
}
.payLogo1 {
	height: 50rpx;
	width: 160rpx;
	// background-color: #ffbf86;
}
.payLogo2 {
	margin-left: 10rpx;
	height: 50rpx;
	width: 360rpx;
}
.pay {
	height: 70rpx;
	width: 80%;
	background-color: #ff5500;
	border-radius: 50rpx;
	line-height: 70rpx;
	margin: 30rpx auto;
	text-align: center;
	color: #ffffff;
}
.back {
	padding: 20rpx;
}
</style>
url)
