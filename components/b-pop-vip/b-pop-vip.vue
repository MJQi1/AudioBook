<template>
	<view class="main">
		<view class="back"><uni-icons type="back" size="25" @click="close"></uni-icons><text>开通/续费至尊VIP</text></view>
		<view class="choose">
			<view class="title">
				
			</view>
			<view>
				<uni-data-checkbox mode="tag" selectedColor="#ff5500" v-model="choose" :multiple="false" :localdata="range" />
			</view>
			<view class="money">
				金额：{{choose}}元
			</view>
		</view>
		
		<view class="pay" @click="NowPay()">立即支付</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			choose:3,
			range: [{"value": 3,"text": "7 天"},{"value": 10,"text": "1个月"    },{"value": 29,"text": "3个月"},{"value": 109,"text": "12个月"}]
		};
	},
	inject: ['popup'],
	methods: {
		close() {
			this.popup.close();
		},
		// 立即支付
		NowPay(){
			this.popup.close();
			this.$emit('pay')
		}
	}
};
</script>

<style lang="less">
.main {
	width: 100%;
	height: 460rpx;
	border-radius: 20rpx;
	background-color: #fff;
}
.choose{
	padding:30rpx;
	
	.title{
		margin: 10rpx 0;
	}
	.money{
		text-align: right;
		padding: 20rpx 30rpx 0 0 ;
	}
}

.pay {
	height: 70rpx;
	width: 80%;
	background-color: #ff5500;
	border-radius: 50rpx;
	line-height: 70rpx;
	margin: 20rpx auto;
	text-align: center;
	color: #ffffff;
}
.back {
	padding: 20rpx;
	display: flex;
	align-items: center;
}
</style>

