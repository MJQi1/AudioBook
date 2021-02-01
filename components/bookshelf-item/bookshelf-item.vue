<template>
	<view class="book-item" @click="goBookDatiles(datils.bookId)">
		<image :src="datils.src" mode="scaleToFill"></image>
		<view class="title" >
			{{datils.bookTitle}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			datils:{
				type:Object,
				default:{
					src:"/static/icons/add.png",
					bookTitle:''
				}
			}
		},
		methods:{
			goBookDatiles(id){
				uni.navigateTo({
					url:'/pages/bookDatiles/bookDatiles?id='+id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.book-item{
	margin: 25rpx;
	height: 320rpx;
	width: 180rpx;
	display: flex;
	flex-flow: column nowrap;
	image {
		height: 72%;
		width: 100%;
		border-radius: 15rpx;
	}
	.title{
		padding-top: 10rpx;
		height: 28%;
		color: #333;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
}
</style>
