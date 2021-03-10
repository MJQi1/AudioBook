<template>
	<view>
		<swiper class="swiper" :autoplay="true" :interval="5000" :duration="1000" circular="true">
			<swiper-item v-for="(item, index) in imageList" :key="index">
				<view class="swiper-item"><image :src="item.fields.image" mode="scaleToFill" @click="toSwiper(item.fields.bookId)"></image></view>
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
						src: '/static/load/load1080.png',
						path: '/pages/index/index'
					},
					{
						src: '/static/load/load1080.png',
						path: ''
					}
				];
			}
		}
	},
	methods:{
		//挑转
		toSwiper(id){
			uni.navigateTo({
				url:'../../pages/bookDatiles/bookDatiles?id='+ id
			})
		}
	}
};
</script>

<style lang="less" scoped>
.swiper {
	height: 220rpx;
	// padding: 30rpx;
	margin: 0 0 20rpx 0;
	// border-radius: 20rpx;
	width: 100%;
	// background-color: #fff;
	.swiper-item {
		image {
			height: 180rpx;
			width: 98%;
			border-radius: 20rpx;
			margin: 20rpx 5rpx;
		}
	}
}
</style>
