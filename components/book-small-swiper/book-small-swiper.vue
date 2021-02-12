<template>
	<view>
		<swiper class="swiper" :autoplay="true" :interval="5000" :duration="1000" circular="true">
			<swiper-item v-for="(item, index) in imageList" :key="index">
				<view class="swiper-item"><image :src="item.src" mode="scaleToFill" @click="toSwiper(item.path)"></image></view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		imageList: {
			type: Array,
			default: () => {
				return [
					{
						src: '/static/load/load480.png',
						path: '/pages/index/index'
					},
					{
						src: '/static/load/load480.png',
						path: ''
					}
				];
			}
		}
	},
	methods:{
		//挑转
		toSwiper(url){
			uni.navigateTo({
				url:url
			})
		}
	}
};
</script>

<style lang="less" scoped>
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
</style>
