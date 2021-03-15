<template>
	<view class="main-box">
		<view class="top">
			<view class="top-title" v-show="isLogin">
				<text>Hi,{{ user }}</text>
				<view class="next-title">欢迎来到AudioT听书</view>
			</view>
			<view class="top-title" v-show="!isLogin">
				<navigator url="../mine/login/login">
					你好,请
					<text style="color: #d5d4aa;">登录</text>
				</navigator>
				<view class="next-title">享受私人听书空间</view>
			</view>
			<view class="msg-bar">
				<swiper class="swiper" :vertical="true" :circular="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-if="isLogin" v-for="(item, index) in bookshelfList">
						<view class="swiper-item">
							<image src="../../static/icons/book.png" mode="aspectFit"></image>
							<view class="act">{{ item.fields.bookName }} : {{ item.fields.bookInfo }}</view>
						</view>
					</swiper-item>
					<swiper-item v-if="!isLogin" v-for="(item, index) in ins">
						<view class="swiper-item">
							<image src="../../static/icons/book.png" mode="aspectFit"></image>
							<view class="act">{{ item }}</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="bookshelf">
			<bookshelf-item v-for="(item, index) in bookshelfList" :key="index" :datils="item"></bookshelf-item>
			<bookshelf-item></bookshelf-item>
		</view>
		<uni-popup type="share" ref="share"><book-share-pop @select="shareSelect"></book-share-pop></uni-popup>
	</view>
</template>

<script>
import { postData } from '@/http/fetch.js';
export default {
	data() {
		return {
			bookshelfList: [],
			isLogin: false,
			user: '',
			ins: ['登录享受美好生活', '登录享受私人听书空间']
		};
	},
	onLoad() {
		// 登录状态
		// this.getUser()
	},
	onShow() {
		// console.log('show....................');
		this.getUser();
		this.getShelf();
	},
	onNavigationBarButtonTap(e) {
		const index = e.index;
		let path;
		switch (index) {
			case 0:
				this.$refs.share.open();
				break;
			case 1:
				path = '../home/search/search';
				console.log(2);
				break;
		}
		uni.navigateTo({
			url: path
		});
	},
	watch: {
		isLogin(newdata, old) {
			if (newdata == false) {
				this.bookshelfList = [];
			}
		}
	},
	methods: {
		getUser() {
			this.isLogin = this.$store.state.user.hasLogin;
			this.user = this.$store.state.user.user;
		},
		async getShelf() {
			if (!this.isLogin) {
				return;
			}

			let res = await postData('user/shelf/', {
				user: this.user,
				bookId: '',
				state: 3 //get list
			});
			this.bookshelfList = eval(res.state);
		},
		//分享选择
		shareSelect(op) {
			let name = op.item.name;
			if (name == 'pengyouquan') {
				uni.share({
					provider: 'weixin',
					scene: 'WXSenceTimeline',
					type: 1,
					title: '来自AudioBook分享',
					href: this.$common.url,
					summary: '我正在使用AudioBook听书，赶紧跟我一起来体验！'+this.$common.url,
					success: function(res) {
						console.log('shanre:');
					},
					fail: function(err) {
						console.log('fail shanre');
					}
				});
			} else if(name == 'more'){
				uni.shareWithSystem({
				  summary: '我正在使用AudioBook听书，赶紧跟我一起来体验！'+this.$common.url,
				  href: this.$common.url,
				})
			}else {
				uni.share({
					provider: name,
					scene: 'WXSceneSession',
					type: 1,
					title: '来自AudioBook分享',
					href: this.$common.url,
					summary: '我正在使用AudioBook听书，赶紧跟我一起来体验！'+this.$common.url,
					success: function(res) {
						console.log('shanre:');
					},
					fail: function(err) {
						console.log('fail shanre');
					}
				});
			}

			this.$refs.share.close();
		}
	}
};
</script>

<style lang="less" scoped>
.main-box {
	background-color: #fafafa;
	height: 1860rpx;
	width: 100%;
}
.top {
	height: 460rpx;
	background-image: url(../../static/background/shelf.png);
	background-position: center;
	background-size: cover;
	.top-title {
		position: absolute;
		top: 10%;
		right: 10%;
		font-size: 40rpx;
		text-align: right;
		font-weight: bold;
		color: #eee;
		.next-title {
			margin-top: 20rpx;
			font-size: 36rpx;
			font-weight: normal;
		}
	}
	.msg-bar {
		position: relative;
		top: 400rpx;
		height: 60rpx;
		width: 70%;
		margin: auto;
		padding: 20rpx 50rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
		box-shadow: 0rpx 10rpx 10rpx #b9b9b9;
		.swiper {
			height: 60rpx;
			.swiper-item {
				display: flex;
				flex-direction: row;
				image {
					width: 60rpx;
					height: 60rpx;
				}
				.act {
					font-size: 25rpx;
					text-indent: 30rpx;
					line-height: 60rpx;
				}
			}
		}
	}
}
.bookshelf {
	padding: 80rpx 30rpx;
	display: flex;
	flex-flow: row wrap;
	// background-color: #f5f5f5;
}
</style>
