<template>
	<view>
		<uni-segmented-control :current="current" :values="items" styleType="text" @clickItem="onClickItem" activeColor="#ff6600"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0">
				<view class="left-tab">
					<view class="check-bth" :class="{'check-active': index===1}" v-for="(item,index) in list">{{item}}</view>
					
				</view>
				<view class="right-box">
					
				</view>
			</view>
			<view v-show="current === 1">
				选项卡2的内容
			</view>
			<view v-show="current === 2">
				选项卡3的内容
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			items: ['总排行', '男生', '女生','教育'],
			current: 0,
			list:['流行榜', '免费','会员','完结','连载']
		};
	},
	methods: {
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		}
	}
};
</script>

<style lang="less" scoped>
	.content{
		display: flex;
		flex-direction: row;
		background-color: #ffaaff;
		.left-tab{
			width: 25vw;
			height: 90vh;
			background-color: #ffffff;
			.check-bth{
				line-height: 75rpx;
				height: 75rpx;
				background-color: #ffaa7f;
				
				margin-top: 2rpx;
				text-align: center;
			}
			.check-active{
				
			}
		}
	}
</style>
