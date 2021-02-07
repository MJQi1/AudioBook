<template>
	<view class="main">
		<view v-if="isHistory" class="tips">历史记录最多30条</view>
		<book-intro class="main-content" :limit="0" :list="textList"></book-intro>
	</view>
</template>

<script>
	import {textList} from '../../home/data.js'
	export default {
		data() {
			return {
				textList:textList,
				isHistory:false
			};
		},
		onLoad(option) {
			if(option.type === 'collect'){
				uni.setNavigationBarTitle({
					title:'我的收藏'
				})
			}
			if(option.type === 'history'){
				uni.setNavigationBarTitle({
					title:'历史记录'
				})
				this.isHistory = true
			}
		}
	}
</script>

<style lang="less" scoped>
.main{
	height: 100%;
	width: 100%;
	background-color:#f7f7f7 ;
	.main-content{
		padding: 20rpx;
	}
	.tips{
		padding: 10rpx 20rpx;
		font-size: 26rpx;
		color: #999;
		text-align: center;
	}
}

</style>
