<template>
	<view class="book-item" @click="goBookDatiles(datils.fields.bookId)">
		<image :src="datils.fields.img" mode="scaleToFill"></image>
		<view class="title" >
			{{datils.fields.bookName}}
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
						fields:{
							img:"/static/icons/add.png",
							bookId:'home'
						}
						
					}
				}
			}
		},
		methods:{
			goBookDatiles(id){
				if(id == 'home'){
					uni.switchTab({
						url:'/pages/home/home'
					})
					return
				}
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
	margin: 0 15rpx;
	height: 280rpx;
	width: 160rpx;
	display: flex;
	border-radius: 20rpx;
	flex-flow: column nowrap;
	// background-color: #FFFFFF;
	image {
		height: 90%;
		width: 100%;
		border-radius: 15rpx;
		box-shadow: 0 6rpx 10rpx #a5a5a5;
	}
	.title{
		font-size: 25rpx;
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
