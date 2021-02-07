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
				default:function(){
					return {
						src:"/static/icons/add.png",
						bookTitle:''
					}
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
	padding: 20rpx;
	margin: 15rpx;
	height: 300rpx;
	width: 160rpx;
	display: flex;
	border-radius: 20rpx;
	flex-flow: column nowrap;
	background-color: #FFFFFF;
	image {
		height: 80%;
		width: 100%;
		border-radius: 15rpx;
		box-shadow: 0 6rpx 10rpx #a5a5a5;
	}
	.title{
		font-size: 20rpx;
		padding-top: 30rpx;
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
