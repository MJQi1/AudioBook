<template>
	<view class="main-block">
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
			}
			
		},
		methods: {
			// 跳转
			goDetails(id){
				uni.navigateTo({
					url:'../../pages/bookDatiles/bookDatiles?id='+id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.main-block{
		heihgt:300rpx;
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
				border-radius: 20rpx;
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
