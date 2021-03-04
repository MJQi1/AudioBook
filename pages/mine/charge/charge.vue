<template>
	<view class="main">
		<view class="vip-card">
			<view class="card-id"><image :src="userinfo.headImage|imgSrc"></image></view>
			<view class="card-title">
				<view class="gard-title">至尊 · VIP</view>
				<view class="grad-bach" v-show="!isVip" @click="popupVipPay">
					立即开通， 畅享生活
					<uni-icons type="forward"></uni-icons>
				</view>
				<view class="grad-bach" v-show="isVip">至尊会员{{userinfo.vip}}到期</view>
				<view class="grad-bach" v-show="isVip" @click="popupVipPay">
					续费会员
					<uni-icons type="forward" size="13"></uni-icons>
				</view>
			</view>
		</view>
		<uni-section title="我的账户" sub-title="" type="line"></uni-section>
		<view class="wallet-msg">
			<view class="book-coin">
				<view class="coin">{{userinfo.coin}}</view>
				<view class="coin-title">书币</view>
			</view>
			<view class="book-coin">
				<view class="coin">{{userinfo.coupon}}</view>
				<view class="coin-title">书券</view>
			</view>
			<view class="book-coin">
				<view class="coin">0</view>
				<view class="coin-title">优惠券 		{{pay}}</view>
			</view>
		</view>
		<uni-section title="充值中心" sub-title="" type="line"></uni-section>
		<view class="charge-view">
			<view class="charge-btn" v-for="(item,index) in chargeMsg" :class="{'charge-btn-active':choose == index}" @click="chooseCharge(index,item.pay,item.coin)">
				<view class="coin">{{item.coin}}</view>
				<view class="money">{{item.pay}}元</view>
			</view>
			
			<view class="charge-btn" :class="{'charge-btn-active':choose == 999}" @click="chooseCharge(999,coninData)">
				<view class="coin"><input type="text" maxlength="7" v-model="coninData" @input="changeData" value=""placeholder="自定义" /></view>
				<view class="money">{{coninData/100}}元</view>
			</view>
		</view>
		<view class="pay"><view class="message">{{pay}}元</view><view class="btn" @click="openPay">立即支付</view></view>
		<uni-popup ref="popup" type="pay" :maskClick="false">
			<b-pop-pay @payChoose="charge"></b-pop-pay>
		</uni-popup>
		<uni-popup ref="vipPay" type="center"  :maskClick="false">
			<b-pop-vip @pay="openPay"></b-pop-vip>
		</uni-popup>
	</view>
</template>

<script>
import { getData,postData } from '@/http/fetch.js'
export default {
	data() {
		return {
			isVip: true,
			coninData: null,
			choose: -1,
			pay:0,
			chargeMsg:[
				{
					pay:1,
					coin:100
				},{
					pay:5,
					coin:500
				},{
					pay:10,
					coin:1000
				},{
					pay:20,
					coin:2088
				},{
					pay:50,
					coin:5288
				},{
					pay:100,
					coin:11888
				},{
					pay:200,
					coin:22888
				},{
					pay:500,
					coin:55888
				}
			],
			userinfo:{}
		};
	},
	onLoad(option){
		if(option.type === 'vip'){
			this.$nextTick(function(){
				this.popupVipPay()
			})
			
		}
	},
	onShow() {
		let info = this.$store.state.user.userInfo
		info = eval(info)
		this.userinfo = info[0].fields
		this.isVip = this.userinfo.vip
		console.log(this.userinfo);
	},
	methods:{
		chooseCharge(index,money,coin){
			this.choose = index
			this.pay = money
			this.coninData = coin
		},
		//弹出支付
		openPay(){
			 this.$refs.popup.open()
		},
		// 会员续费
		popupVipPay(){
			this.$refs.vipPay.open()
		},
		changeData(){
			this.pay = this.coninData/100
		},
		// 充值
		async charge() {
			let data = {
				charge: this.coninData,
				user: this.userinfo.username
			}
			
			let resp = await postData('wallet/chargeCoin/', data)
			console.log(resp);
		}
	},
	computed:{
	}
};
</script>

<style lang="less">
.main {
	
}
.vip-card {
	width: 80%;
	display: flex;
	justify-content: space-around;
	background-image: url(/static/background/backimg.png);
	background-position: center right;
	height: 160rpx;
	padding: 30rpx;
	border-radius: 20rpx;
	box-shadow: 2rpx 8rpx 10rpx #b5b5b5;
	margin: 30rpx auto;
	.card-id {
		width: 120rpx;
		height: 120rpx;
		image {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	.card-title {
		.gard-title {
			font-weight: bold;
			color: #333;
		}
		.grad-bach {
			line-height: 60rpx;
			font-size: 19rpx;
			color: #444;
		}
	}
}
.wallet-msg {
	padding: 50rpx 0 50rpx 0;
	width: 100%;
	// height: 360rpx;
	// background-color: #A1DCC1;
	display: flex;
	flex-direction: row;
	.book-coin {
		text-align: center;
		width: 100%;
		color: #333;
		.conin {
			font-size: 36rpx;
		}
		.coin-title {
			font-size: 18rpx;
		}
	}
}
.charge-view{
	display: flex;
	flex-wrap: wrap;
	.charge-btn{
		margin: 20rpx;
		height: 200rpx;
		width: 28%;
		// border: 1rpx solid #ffaa00;
		border-radius: 15rpx;
		box-shadow: 2rpx 3rpx 30rpx #dfdfdf;
		.coin{
			height: 60%;
			padding-left: 20rpx;
			line-height: 120rpx;
			font-size: 40rpx;
			color: #555;
			input{
				position: relative;
				top: 30rpx;
				font-size: 40rpx;
				color: #555;
			}
		}
		.money{
			font-weight: 600;
			color: #ff5500;
			line-height: 80rpx;
			text-align: right;
			padding-right: 30rpx;
			font-size: 20rpx;
		}
	}
	.charge-btn-active{
		// border: 1rpx solid #ffaa00;
		background-color: #fbe5db;
	}
}
.pay{
	width: 100%;
	display: flex;
	justify-content: space-between;
	height: 80rpx;
	margin-top: 30rpx;
	background-color: #f8f8f8;
	.message{
		line-height: 80rpx;
		padding-left: 30rpx;
	}
	.btn{
		line-height: 80rpx;
		padding: 0rpx 30rpx 0rpx 80rpx;
		background-color: #ff7e0e;
		color: #fff;
		border-top-left-radius: 50rpx;
		border-bottom-left-radius: 50rpx;
	}
}
</style>
