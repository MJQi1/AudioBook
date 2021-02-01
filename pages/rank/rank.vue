<template>
	<view>
		<uni-segmented-control :current="current" :values="items" styleType="text" @clickItem="onClickItem" activeColor="#ff6600"></uni-segmented-control>
		<view class="content">
			<view v-show="current === index1" class="content-item" v-for="(node,index1) in items" >
				<view class="left-tab">
					<view v-if="index1===0" class="check-bth" :class="{'check-active': index==active}" v-for="(item,index) in list1 " :key="index" @click="changTab(index)">{{item}}</view>
					<view v-if="index1===1" class="check-bth" :class="{'check-active': index==active}" v-for="(item,index) in list2" :key="index" @click="changTab(index)">{{item}}</view>
					<view v-if="index1===2" class="check-bth" :class="{'check-active': index==active}" v-for="(item,index) in list3" :key="index" @click="changTab(index)">{{item}}</view>
					<view v-if="index1===3" class="check-bth" :class="{'check-active': index==active}" v-for="(item,index) in list4" :key="index" @click="changTab(index)">{{item}}</view>
				</view>
				
				<view class="right-box">
					<scroll-view scroll-y="true" class="scroll">
						<view>
							<book-intro :list="data" :limit="0"></book-intro>
						</view>
					</scroll-view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {textList} from '../home/data.js'
export default {
	data() {
		return {
			items: ['总排行', '男生', '女生','教育'],
			current: 0,
			list1:['人气榜', '免费榜', '会员榜', '完结榜' ,'新书榜'],
			list2:['男生人气', '免费','会员','完结','连载'],
			list3:['女生人气', '免费','会员','完结','连载'],
			list4:['热度榜', '教育','会员','完结','连载'],
			active: 0,
			data:textList
		};
	},
	methods: {
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		},
		//点击排行
		changTab(index){
			this.active = index
		}
	}
};
</script>

<style lang="less" scoped>
	.content{
		// padding-top: 20rpx;
		.content-item{
			// border-top: 1rpx solid #666666;
			margin-top: 10rpx;
			padding-top: 10rpx;
			display: flex;
			height: 88vh;
			flex-direction: row;
			.left-tab{
				width: 25vw;
				height: 100%;
				background-color: #f0f0f0;
				.check-bth{
					line-height: 75rpx;
					height: 75rpx;
					
					margin-top: 2rpx;
					text-align: center;
				}
				.check-active{
					border-left: 7rpx solid #ff6600;
					background-color: #ffffff;
					color: #ff6600;
				}
			}
			.right-box{
				width: 560rpx;
				padding: 20rpx;
				overflow: hidden;
				.scroll{
					height: 95%;
				}
			}
		}
		
	}
</style>
