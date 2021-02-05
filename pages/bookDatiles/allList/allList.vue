<template>
	<view>
		<view class="book-top-warp">
			<image src="../../../static/background/home.jpg" mode="aspectFit"></image>
			<view class="book-info">
				<view class="book-title">shugmingxsdsa</view>
				<view class="author">作者：</view>
				<view class="author">主播：</view>
			</view>
			<view class="sort" @click="sort">
				<view v-show="sorts">
					倒序<uni-icons size="14" type="arrowthinup"></uni-icons>
				</view>
				<view v-show="!sorts">
					顺序<uni-icons size="14" type="arrowthindown"></uni-icons>
				</view>
				
			</view>
			
		</view>
		<scroll-view class="scroll" scroll-y="true" >
			<view>
				<uni-list>
					<uni-list-item v-for="(item, index) in bookTemp" :key="index" :title="`第${item.index}章  ${item.title}`" to="../home/search/search"></uni-list-item>
				</uni-list>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//顺序
				sorts:true,
				bookTemp: [
					{
						title: '阿里的父1',
						link: 'src',
						index:1
					},
					{
						title: '阿父母公开2',
						link: 'src',
						index:2
					},
					{
						title: '阿里的父母3',
						link: 'src',
						index:3
					},
					{
						title: '阿里4',
						link: 'src'
					},
					{
						title: '阿5',
						link: 'src'
					},
					{
						title: '阿里的父母6',
						link: 'src'
					},
					{
						title: '阿里的父7',
						link: 'src'
					},
					{
						title: '阿里的8',
						link: 'src'
					},
					{
						title: '阿里的9',
						link: 'src'
					},
					{
						title: '阿里10',
						link: 'src'
					},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{index:29}
				]
			};
		},
		methods:{
			sort(){
				this.bookTemp.reverse()
				this.sorts = !this.sorts
			}
		}
	}
</script>

<style lang="less" scoped>
.book-top-warp {
		// filter: blur(20rpx);
		display: flex;
		flex-direction: row;
		padding: 20rpx;
		height: 170rpx;
		image {
			border-radius: 20%;
			width: 170rpx;
			height: 100%;
		}
		.book-info {
			width: 360rpx;
			padding-left: 30rpx;
			.book-title {
				color: #333;
				font-size: 38rpx;
				line-height: 70rpx;
			}
			.author {
				font-size: 26rpx;
			}
		}
		.sort{
			padding-top: 100rpx;
			font-size: 26rpx;
			color: #777;
		}
	}
	
	.scroll{
		height: 80vh;
	}
</style>
