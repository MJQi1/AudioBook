<template>
	<view class="main">
		<view v-if="isHistory" class="tips">历史记录最多30条</view>
		<book-intro class="main-content" :limit="0" :list="textList"></book-intro>
	</view>
</template>

<script>
	import {textList} from '../../home/data.js'
	import {postData} from '@/http/fetch.js'
	export default {
		data() {
			return {
				textList:textList,
				isHistory:false,
				user:this.$store.state.user.user
			};
		},
		onLoad(option) {
			if(option.type === 'collect'){
				uni.setNavigationBarTitle({
					title:'我的收藏'
				})
				this.getCollect()
			}
			if(option.type === 'history'){
				uni.setNavigationBarTitle({
					title:'历史记录'
				})
				this.isHistory = true
			}
		},
		methods:{
			async getCollect(){
				let res = await postData('user/collect/',{
					user: this.user,
					bookId:'0',
					state: 3//获取收藏列表
				}) 
				this.textList = eval(res.state)
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
