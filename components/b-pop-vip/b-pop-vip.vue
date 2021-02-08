<template>
	<view class="main">
		<view class="back"><uni-icons type="back" size="25" @click="close"></uni-icons><text>开通/续费至尊VIP</text></view>
		<view class="choose">
			<view class="title">
				
			</view>
			<view>
				<uni-data-checkbox mode="tag" selectedColor="#ff7e0e" v-model="choose" :multiple="false" :localdata="range" />
			</view>
			<view class="money">
				金额：{{choose}}元
			</view>
		</view>
		
		<view class="pay" @click="NowPay()"><text>立即支付</text></view>
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
	height: 420rpx;
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
		font-size: 28rpx;
		color: #666;
	}
}

.pay {
	height: 70rpx;
	width: 80%;
	background-color: #ff7e0e;
	border-radius: 50rpx;
	line-height: 70rpx;
	margin: 20rpx auto;
	text-align: center !important;
	color: #ffffff;
	display: flex;
	justify-content: center;
	text {
		
	}
}
.back {
	padding: 20rpx;
	display: flex;
	align-items: center;
	color: #333;
	box-shadow: 0 1rpx 1rpx #ebebeb;
}
</style>

