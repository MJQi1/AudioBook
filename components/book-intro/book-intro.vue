<template>
	<view class="">
		<view class="main-box" v-for="(item, index) in listSub" :key="index" @click="goDetails(item.bookId)">
			<view class="image"><image :src="item.src" mode=""></image></view>
			<view class="datils">
				<text class="title">{{ item.bookTitle }}</text>
				<view class="intro">
					详情一键三连点赞Mark关注该博主随时了解T赞Mark关注该博主随时了解T要输入用户名和密赞Mark关注该博主随时了解T要输入用户名和1231313密要输入用户名和密码的解决方法asdfas的博asdfasdfasddasfasdfas客
					2614
				</view>
				<view class="msg">{{ item.author }} · {{ item.type }} · {{ item.state }}</view>
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
			default: []
		},
		limit: {
			type: Number,
			default: 3
		}
	},
	methods: {
		// 跳转详情
		goDetails(id) {
			uni.navigateTo({
				url: '../../pages/bookDatiles/bookDatiles?id=' + id
			});
		}
	},
	computed: {
		listSub() {
			if(this.limit === 0){
				return this.list
			}
			return this.list.slice(0, this.limit);
		}
	}
};
</script>

<style lang="less" scoped>
.main-box {
	width: 100%;
	height: 210rpx;
	display: flex;
	flex-flow: row warp;
	// background-color: #808080;
	padding: 20rpx 0;
	.image {
		height: 100%;
		width: 23%;
		margin-right: 30rpx;
		image {
			height: 100%;
			width: 160rpx;
			border-radius: 20rpx;
		}
	}
	.datils {
		height: 100%;
		// width: 77%;
		padding: 0 0 0 20rpx;
		overflow: hidden;
		.title {
			color: #333;
			font-size: 30rpx;
		}
		.intro {
			// height: 100rpx;
			padding-top: 20rpx;
			color: #999;
			font-size: 26rpx;
			//文字超出隐藏
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
		}
		.msg {
			color: #999;
			font-size: 20rpx;
			padding-top: 10rpx;
		}
	}
}
</style>
