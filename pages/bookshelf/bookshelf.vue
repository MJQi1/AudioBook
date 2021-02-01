<template>
	<view class="main-box">
		<view class="top">
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
				bookshelfList:textList
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
	height: 360rpx;
	background-image: url(../../static/backimg.png);
	background-position: center;
	.msg-bar{
		position: relative;
		top: 300rpx;
		height: 60rpx;
		width: 70%;
		margin: auto;
		padding: 20rpx 50rpx;
		border-radius: 40rpx;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 5px #ffaa7f;
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
