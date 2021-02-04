<template>
	<view class="main-box">
		<view class="top-message">
			<view class="persional-msg" v-show="isLogin">
				<image src="../../static/icons/bangbangtang.png" mode="aspectFit"></image>
				<view class="user-name">用户名</view>
				<uni-icons type="compose" size="16" class="edit-icon" color="#eee"></uni-icons>
			</view>
			<view class="persional-msg" v-show="!isLogin">
				<image src="../../static/icons/bangbangtang.png" mode="aspectFit" @click="toLogin"></image>
				<view class="user-name" @click="toLogin">登录</view>
			</view>
			<view class="wallet-msg">
				<view class="book-coin">
					<view class="coin">10</view>
					<view class="coin-title">书币</view>
				</view>
				<view class="book-coin">
					<view class="coin">0</view>
					<view class="coin-title">书券</view>
				</view>
				<view class="book-coin">
					<view class="coin">0</view>
					<view class="coin-title">优惠券</view>
				</view>
				<view class="charge">充值</view>
			</view>
			<view class="vip-card">
				<view class="gard-title">至尊 · VIP</view>
				<view class="grad-bach">
					立即开通， 畅享生活
					<uni-icons type="forward"></uni-icons>
				</view>
			</view>
		</view>
		<view class="body-list">
			<view class="ins-button">
				<view class="btn" @click="toWhat('msg1')">
					<uni-icons type="heart" size="25" color="#333"></uni-icons>
					<view class="text">收藏</view>
				</view>
				<view class="btn" @click="toWhat('msg1')">
					<uni-icons type="info" size="25" color="#555"></uni-icons>
					<view class="text">历史记录</view>
				</view>
				<view class="btn" @click="toWhat('msg')">
					<uni-icons type="chatbubble" size="25" color="#555"></uni-icons>
					<view class="text">消息</view>
				</view>
				<view class="btn" @click="toWhat('msg2')">
					<uni-icons type="paperplane" size="25" color="#555"></uni-icons>
					<view class="text">签到</view>
				</view>
			</view>
			<view class="space"></view>
			<swiper class="swiper" :autoplay="true" :interval="5000" :duration="1000" circular="true">
				<swiper-item>
					<view class="swiper-item"><image src="../../static/load/load480.png" mode="scaleToFill"></image></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"><image src="../../static/load/load480.png" mode="scaleToFill"></image></view>
				</swiper-item>
			</swiper>
			<view class="space"></view>
			<uni-list>
				<uni-list-item title="我的钱包" link></uni-list-item>
				<uni-list-item title="签到" link></uni-list-item>
				<uni-list-item title="每日福利" link></uni-list-item>
			</uni-list>
			<view class="space"></view>
			<uni-list>
				<uni-list-item title="我的收藏" link></uni-list-item>
				<uni-list-item title="历史记录" link></uni-list-item>
				<uni-list-item title="我的评论" link></uni-list-item>
			</uni-list>
			<view class="space"></view>
			<uni-list>
				<uni-list-item title="设置" link></uni-list-item>
				<uni-list-item title="意见反馈" link></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isLogin: true
		};
	},
	methods: {
		toLogin() {
			uni.navigateTo({
				url: './login/login'
			});
		},
		// 跳转到哪？
		toWhat(add) {
			let url;
			switch (add) {
				case 'msg':
					url = './chartMessage/chartMessage';
					break;
			}
			uni.navigateTo({
				url: url
			});
		}
	},
	onNavigationBarButtonTap(e) {
		const index = e.index;
		let path;
		switch (index) {
			case 0:
				path = './settings/settings'
				break;
			case 1:
				path = './chartMessage/chartMessage';
				break;
			case 2:
				console.log('saomiao');
				break;
		}
		uni.navigateTo({
			url: path
		});
	}
};
</script>

<style lang="less" scoped>
.main-box {
	height: 1300rpx;
	width: 100%;
	// background-color: #ffe6be;
}
.top-message {
	background-image: url(../../static/background/mine.png);
	background-size: cover;
	background-position: 100%;
	.persional-msg {
		position: relative;
		top: 100rpx;
		height: 100rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		// background-color: #4CD964;
		color: #eee;
		image {
			height: 100%;
			width: 200rpx;
		}
		.user-name {
			height: 100%;
			line-height: 100rpx;
			font-size: 36rpx;
		}
		.edit-icon {
			margin-left: 20rpx;
			line-height: 100rpx;
			color: #eee;
		}
	}
	.wallet-msg {
		padding: 200rpx 0 50rpx 0;
		width: 100%;
		// height: 360rpx;
		// background-color: #A1DCC1;
		display: flex;
		flex-direction: row;
		.book-coin {
			text-align: center;
			width: 20%;
			color: #eee;
			.conin {
				font-size: 36rpx;
			}
			.coin-title {
				font-size: 18rpx;
			}
		}
		.charge {
			height: 50rpx;
			padding: 5rpx 40rpx;
			border-radius: 50rpx;
			background-color: #bdd380;
			border: 1rpx solid #50a570;
			color: #457f4d;
			font-size: 26rpx;
			line-height: 50rpx;
			position: relative;
			top: 15rpx;
			left: 100rpx;
		}
	}
	.vip-card {
		width: 75%;
		display: flex;
		justify-content: space-between;
		background-image: url(../../static/background/backimg.png);
		background-position: center right;
		height: 50rpx;
		padding: 30rpx;
		border-radius: 20rpx;
		margin: auto;
		.gard-title {
			font-weight: bold;
			color: #333;
		}
		.grad-bach {
			font-size: 19rpx;
			color: #444;
		}
	}
}
.body-list {
	width: 100%;
	height: 100%;
	background-color: #efeff4;
	margin-top: -30rpx;
	.ins-button {
		display: flex;
		justify-content: space-around;
		background-color: #ffffff;
		.btn {
			text-align: center;
			padding: 40rpx;
			.text {
				font-size: 16rpx;
				color: #333;
			}
		}
	}
	.swiper {
		height: 220rpx;
		// padding: 30rpx;
		width: 100%;
		background-color: #fff;
		.swiper-item {
			image {
				height: 180rpx;
				width: 92%;
				border-radius: 20rpx;
				margin: 20rpx 30rpx;
			}
		}
	}
	.space {
		height: 10rpx;
	}
}
</style>
