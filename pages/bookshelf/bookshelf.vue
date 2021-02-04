<template>
	<view class="main-box">
		<view class="top">
			<view class="top-title" v-show="isLogin">
				<text>Hi,蒂华纳姐</text>
				<view class="next-title">
					欢迎来到AudioT听书
				</view>
			</view>
			<view class="top-title" v-show="!isLogin">
				<navigator url="../mine/login/login">你好，请 <text style="color: #d5d4aa;">登录</text></navigator>
				<view class="next-title">
					享受私人听书空间
				</view>
			</view>
			<view class="msg-bar">
				<swiper class="swiper" :vertical="true" :circular="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item>
						<view class="swiper-item">
							<image src="../../static/icons/book.png" mode="aspectFit"></image><view class="act">lsdfasd</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="../../static/icons/book.png" mode="aspectFit"></image><view class="act">61523</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="bookshelf">
			
			<bookshelf-item v-for="(item,index) in bookshelfList" :key="index" :datils="item"></bookshelf-item>
			<bookshelf-item></bookshelf-item>
		</view>
	</view>
</template>

<script>
	import {textList} from "../home/data.js"
	export default {
		data() {
			return {
				bookshelfList:textList,
				isLogin:false
			};
		}
	}
</script>

<style lang="less" scoped>
.main-box{
	
	height: 1860rpx;
	width: 100%;
}
.top{
	height: 460rpx;
	background-image: url(../../static/background/shelf.png);
	background-position: center;
	background-size: cover;
	.top-title{
		position: absolute;
		top: 10%;
		right: 10%;
		font-size: 40rpx;
		text-align: right;
		font-weight: bold;
		color: #eee;
		.next-title{
			margin-top: 20rpx;
			font-size: 36rpx;
			font-weight: normal;
		}
	}
	.msg-bar{
		position: relative;
		top: 400rpx;
		height: 60rpx;
		width: 70%;
		margin: auto;
		padding: 20rpx 50rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
		box-shadow:0rpx 10rpx 10rpx #b9b9b9;
		.swiper{
			height: 60rpx;
			.swiper-item{
				display: flex;
				flex-direction: row;
				image {
					width: 60rpx;
					height: 60rpx;
				}
				.act{
					text-indent: 30rpx;
					line-height: 60rpx;
				}
			}
		}
	}
}
.bookshelf{
	padding: 80rpx 30rpx;
	display: flex;
	flex-flow: row wrap;
	
}
</style>
