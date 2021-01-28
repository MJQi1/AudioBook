<template>
	<view class="content">
		<swiper class="swiper" 
		:autoplay="autoplay" 
		:duration="duration"
		>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../static/guide/looks.png" mode="aspectFit"></image></view>
					<view class="swiper-item-img"><image src="../../static/guide/text1.png" mode="aspectFit"></image></view>
				</view>
				<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../static/guide/convent.png" mode="aspectFit"></image></view>
					<view class="swiper-item-img"><image src="../../static/guide/text2.png" mode="aspectFit"></image></view>
				</view>
				<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../static/guide/duo.png" mode="aspectFit"></image></view>
					<view class="swiper-item-img"><image src="../../static/guide/text3.png" mode="aspectFit"></image></view>
				</view>
				<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="../../static/guide/learn.png" mode="aspectFit"></image></view>
					<view class="swiper-item-img"><image src="../../static/guide/text4.png" mode="aspectFit"></image></view>
				</view>
				<view class="experience" @tap="launchFlag()">{{experience}}</view>
			</swiper-item>
		</swiper>
		<view class="uniapp-img"><image src="../../static/logo.png" mode="aspectFit"></image></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				duration: 500,
				jumpover: '跳过',
				experience: '立即体验'
			}
		},
		methods: {
			launchFlag: function(){
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 */
				uni.setStorage({
						key: 'launchFlag',
						data: true,
				});
				uni.switchTab({
					url: '/pages/home/home'
				});
				
			}
		}
	}
</script>
<style>
	page,
	.content{
		width: 100%;
		height: 100%;
		background-size: 100% auto ;
		padding: 0;
	}
	.swiper{
		width: 100%;
		height: 80%;
		background-image: linear-gradient(#e66465,#faae3e);
	}
	.swiper-item {
		width: 100%;
		height: 100%;
		text-align: center;
		position: relative;
		display: flex;
		/* justify-content: center; */
		align-items:flex-end;
		flex-direction:column-reverse
	}
	.swiper-item-img{
		width: 100%;
		height: auto;
		margin: 0 auto;
	}
	.swiper-item-img image{
		width: 80%;
	}
	.uniapp-img{
		height: 20%;
		background-image: linear-gradient(#faae3e,#ffc33d);
		display: flex;
		justify-content: center;
		align-items:center;
		overflow: hidden;
	}
	.uniapp-img image{
		width: 60%;
	}
	
	.jump-over,.experience{
		position: absolute;
		height: 60upx;
		line-height: 60upx;
		padding: 0 40upx;
		border-radius: 30upx;
		font-size: 32upx;
		color: #efeec7;
		border: 1px solid #efeec7;
		z-index: 999;
	}
	.jump-over{
		right: 45upx;
		top: 125upx;
	}
	/* #ifdef MP-WEIXIN */
	.jump-over{
		right: 45upx;
		top: 155upx;
	}
	/* #endif */
	.experience{
		right: 50%;
		margin-right: -105upx;
		bottom: 0;
	}
</style>
