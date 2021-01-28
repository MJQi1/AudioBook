<template>
	<view class="book-block" v-show="show">
		<view class="classify" v-for="(item, index) in list" :key="index" @click="goPage(item.path)">
			<image :src="item.imageSrc" mode="aspectFit"></image>

			<view class="title">
				<text>{{ item.title }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		list: {
			type: Array,
			default: function(){
				return [
				{
					title: '分类',
					imageSrc: '/static/icons/fenlei.png',
					path: '/pages/index/test/test'
				},
				{
					title: '排行',
					imageSrc: '/static/icons/paihangbang.png',
					path: '/pages/index/test/test'
				},
				{
					title: '免费',
					imageSrc: '/static/icons/liwu.png',
					path: '/pages/index/test/test'
				},
				{
					title: '会员',
					imageSrc: '/static/icons/huiyuan.png',
					path: '/pages/index/test/test'
				},
				{
					title: '精选',
					imageSrc: '/static/icons/jinxuan.png',
					path: '/pages/index/test/test'
				}]
			}
		},
		color: {
			type: String,
			default: '#333'
		},
		show: {
			type: Boolean,
			default: true
		}
	},
	methods:{
		goPage(path) {
			console.log(22);
			uni.navigateTo({
				url:path
			})
		}
	}
};
</script>

<style lang="less" scoped>
.book-block {
	width: 100%;
	display: flex;
	justify-content: space-between;
	.classify {
		width: 120rpx;
		height: 120rpx;
		image {
			width: 100%;
			height: 70%;
		}
		.title {
			line-height: 30%;
			text-align: center;
			text {
				font-size: 20rpx;
			}
		}
	}
}
</style>
