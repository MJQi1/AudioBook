<template>
	<view class="main-block">
		<view class="plate-title">
			<view class="title">{{title}}</view>
			<view class="left-op" v-show="refresh" @click="refreshThis">换一换<uni-icons type="loop" size="10" color="#999" ></uni-icons></view>
			<view class="left-op" v-show="more" @click="moresThis"> 加载更多<uni-icons type="forward" size="10" color="#999" ></uni-icons></view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			title:{
				type: String,
				default:'标题'
			},
			more:{
				type:Boolean
			},
			refresh:{
				type:Boolean
			}
		},
		methods:{
			refreshThis(){
				this.$emit('refreshThis')
			},
			moresThis(){
				this.$emit('moresThis')
			}
		}
	}
</script>

<style lang="less" scoped>
.main-block{
	background-color: #FFFFFF;
	margin: 30rpx 0;
	border-radius: 20rpx;
	padding: 20rpx;
}
.plate-title {
		padding: 30rpx 0;
		display: flex;
		justify-content: space-between;
		height: 100%;
		.title{
			font-size: 32rpx;
			font-weight: 600;
			color: #444;
		}
		.left-op{
			font-size: 20rpx;
			line-height: 50rpx;
			color: #999;
		}
	}
</style>
