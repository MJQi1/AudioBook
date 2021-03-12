<template>
	<view>
		<view class="book-top-warp">
			<image :src="info.img" mode="aspectFit"></image>
			<view class="book-info">
				<view class="book-title">{{info.book}}</view>
				<view class="author">分类：{{info.type}}</view>
				<view class="author">主播：{{info.anchor}}</view>
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
					<uni-list-item v-for="(item, index) in bookTemp" :key="index" :title="item.fields.chapterName" :to="'/pages/play/play?id='+item.fields.chapterId"></uni-list-item>
				</uni-list>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import {getData, postData} from '@/http/fetch.js'
	export default {
		data() {
			return {
				//顺序
				sorts:true,
				bookTemp: [],
				info:''
			};
		},
		onLoad(op) {
			this.getChapter(op.bookId)
			// console.log(op);
			this.info = op
		},
		methods:{
			async getChapter(id){
				let res = await getData('book/getBookDetiles/?id=' + id)
				// console.log(res);
				this.bookTemp = eval(res.data)
			},
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
				overflow: hidden;
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
