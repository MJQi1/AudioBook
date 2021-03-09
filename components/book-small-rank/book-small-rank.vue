<template>
	<view class="main-block">
		<view class="title" >
			<view class="title-act">
				<view @click="pointBar(index)" :class="{ active: index === current }" v-for="(item, index) in lists" :key="item.title">{{ item.title }}</view>
			</view>

			<view class="title-are" @click="goRank">
				完整榜单<uni-icons type="forward" size="10" color="#999"></uni-icons>
			</view>
		</view>
		<swiper class="swiper" @change="change" :current="current" :duration="1000">
			<swiper-item  v-for="(item, index) in lists" :key="index">
				<view class="swiper-item">
					<view class="rank-item" v-for="(node, index) in item.list" :key="index" @click="goBook(node.fields.bookId)">
						<image :src="node.fields.img" mode=""></image>
						<text class="index">{{ index + 1 }}</text>
						<view class="intro">
							<text class="name">{{ node.fields.bookName }}</text>
							<text class="author">{{ node.fields.anchor }}</text>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 0
		};

	},
	props:{
		lists:{
			type:Array
		}
	},
	methods:{
		pointBar(index){
			this.current = index
		},
		change(e){
			// console.log(e);
			this.current = e.detail.current
		},
		goRank(){
			uni.switchTab({
				url:'/pages/rank/rank'
			})
		},
		goBook(id){
			uni.navigateTo({
				url:'/pages/bookDatiles/bookDatiles?id='+id
			})
		}
	}
};
</script>

<style lang="less" scoped>
.main-block {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 20rpx;
	
}
.title {
	display: flex;
	justify-content: space-between;
	height: 60rpx;
	// background-color: #007AFF;
	line-height: 60rpx;
	.title-act {
		display: flex;
		flex-direction: row;
		view {
			margin-right: 20rpx;
			font-size: 24rpx;
		}
		.active {
			// line-height: 20rpx;
			border-bottom: 5rpx solid #f0ad4e;
		}
	}
	.title-are {
		font-size: 16rpx;
		color: #999999;
	}
}
.swiper {
	height: 600rpx;

	.swiper-item {
		display: flex;
		flex-flow: row wrap;
		.rank-item {
			width: 320rpx;
			height: 160rpx;
			overflow: hidden;
			display: flex;
			flex-flow: row;
			margin: 20rpx 0;
			border-radius: 20rpx;
			.index {
				width: 35rpx;
				// line-height: 160rpx;
				text-align: right;
			}
			image {
				width: 120rpx;
				height: 98%;
				border-radius: 15rpx;
				box-shadow:0rpx 0rpx 10rpx #b9b9b9;
			}
			.intro {
				padding: 0 20rpx 0 5px;
				width: 140rpx;
				display: flex;
				flex-direction: column;
				.name {
					display: block;
					height: 120rpx;
					font-size: 26rpx;
					color: #333;
					line-height: 36rpx;
				}
				.author {
					color: #999;
					font-size: 16rpx;
				}
			}
		}
		.rank-item:nth-child(odd) {
			margin-right: 10rpx;
		}
	}
}
</style>
