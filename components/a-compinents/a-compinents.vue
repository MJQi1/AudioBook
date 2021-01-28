<template>
	<view>
		<view class="plate-title" v-show="showTitle">
			<view class="title">{{title}}</view>
			<view class="left-op" v-show="refresh">换一换<uni-icons type="loop" size="13" color="#999" @click="refreshThis"></uni-icons></view>
			<view class="left-op" v-show="more"> 加载更多<uni-icons type="forward" size="13" color="#999" @click="moresThis"></uni-icons></view>
		</view>
		<scroll-view scroll-x="true" class="scroll-x">
			<view>
				<view class="book-datils" v-for="(item,index) in list" :key="index" @click="goDetails(item.bookId)">
					<image :src="item.src" mode=""></image>
					<view class="book-title">
						{{item.bookTitle}}
						<text>{{item.author}}</text>
					</view>
				</view>
			</view> 
		</scroll-view>
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons'
	export default {
		components:{
			uniIcons
		},
		data() {
			return {

			};
		},
		props: {
			showTitle: {
				type: Boolean,
				default: true
			},
			title: {
				type: String,
			},
			list: {
				type: Array
			},
			refresh:{
				type:Boolean,
				default:true
			},
			more:{
				type:Boolean,
				default:false
			}
		},
		methods: {
			// 跳转
			goDetails(id){
				uni.navigateTo({
					url:'../../pages/bookDatiles/bookDatiles?id='+id
				})
			},
			refreshThis() {
				
			},
			moreThis() {
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.plate-title {
		padding: 30rpx 0;
		display: flex;
		justify-content: space-between;
		.title{
			font-size: 40rpx;
			font-weight: 600;
			color: #333;
		}
		.left-op{
			font-size: 20rpx;
			line-height: 50rpx;
			color: #999;
		}
	}

	.scroll-x {
		white-space: nowrap;
		
		.book-datils {
			width: 160rpx;
			background-color: #fff;
			height: 300rpx;
			margin-right: 20rpx;
			overflow: hidden;
			display: inline-block;

			image {
				width: 100%;
				height: 70%;
			}

			.book-title {
				width: 100%;
				font-size: 30rpx;
				// text-align: center;
				white-space: normal;
				color: #333;

				text {
					display: block;
					font-size: 28rpx;
					color: #999;
				}
			}
		}
	}
</style>
