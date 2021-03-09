<template>
	<view class="">
		<view v-if="listSub.length!=0" class="main-box" v-for="(item, index) in listSub" :key="index" @click="goDetails(item.fields.bookId)">
			<view class="image"><image :src="item&&item.fields.img" mode=""></image></view>
			<view class="datils">
				<text class="title">{{ item.fields.bookName }}</text>
				<view class="intro">
					{{item.fields.bookInfo}}
				</view>
				<view class="msg">{{ item.fields.anchor }} · {{ item.fields.type }} · {{ item.fields.pay }}</view>
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
			type: Array
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
				url: '/pages/bookDatiles/bookDatiles?id=' + id
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
	// box-shadow: 0  2rpx 2rpx #afafaf;
	.image {
		height: 100%;
		width: 23%;
		margin-right: 30rpx;
		image {
			height: 100%;
			width: 160rpx;
			border-radius: 15rpx;
			box-shadow: 0  5rpx 10rpx #afafaf;
		}
	}
	.datils {
		height: 100%;
		// width: 77%;
		padding: 0 0 0 20rpx;
		overflow: hidden;
		.title {
			color: #333;
			font-size: 28rpx;
		}
		.intro {
			// height: 100rpx;
			padding-top: 20rpx;
			color: #999;
			line-height: 40rpx;
			font-size: 24rpx;
			//文字超出隐藏
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.msg {
			color: #999;
			font-size: 20rpx;
			padding-top: 20rpx;
		}
	}
}
</style>
