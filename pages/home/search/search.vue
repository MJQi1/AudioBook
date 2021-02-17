<template>
	<view>
		<view class="status_bar">

		</view>
		<!-- 导航搜索 -->
		<uni-nav-bar left-icon="back" rightText="搜索" backgroundColor="#ffffff" @clickLeft="back" @clickRight="srarch" color="#ff5500">
			<view class="nav-input-text">
				<uni-icons class="icon" size="16" type="search" color="#666"></uni-icons>
				<input class="input" v-model="keyCode" type="text" placeholder="搜索相关书籍吧" />
			</view>
		</uni-nav-bar>
		<!-- 弹出框 -->
		<uni-popup ref="popup" type="center">
			<uni-popup-dialog type="warn" content="确认清空历史记录吗？" :duration="2000" :before-close="true" @close="close"
			 @confirm="deleteHistory()"></uni-popup-dialog>
		</uni-popup>
		<!-- 内容 -->
		<view class="container">
			<view class="search-history" v-if="hasHistory">
				<view class="history-title"><text>历史记录</text>
					<uni-icons @click="showDialog" type="trash"></uni-icons>
				</view>
				<view class="history-tab" v-for="(item,index) in historyArray" :key="index">{{item}}</view>
			</view>
			<view class="history-text" v-else>
				暂无历史记录
			</view>
			
		</view>
		<view class="line"></view>
		<view class="container">
			<book-intro :list="textList" :limit="0"></book-intro>
		</view>
	</view>
</template>

<script>
	import {textList} from '../data.js'
	export default {
		data() {
			return {
				keyCode: '',
				hasHistory: true,
				historyArray: [],
				textList:[]
			};
		},
		onLoad() {
			this.loadHistory()
		},
		watch: {
			historyArray(new1, old) {
				if (new1.length === 0) {
					this.hasHistory = false
				} else {
					this.hasHistory = true
				}
			}
		},
		methods: {
			// 返回首页
			back() {
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 300
				})
			},
			// 搜索
			srarch() {
				//搜索逻辑
				this.textList = []
				for(let i of textList){
					if(i.bookTitle.includes(this.keyCode)){
						this.textList.push(i)
					}
				}
				//历史记录
				if(this.keyCode === ''){
					return
				}
				//去重
				console.log(this.historyArray);
				this.historyArray.unshift(this.keyCode)
				let set = new Set(this.historyArray)
				this.historyArray = Array.from(set)
				
				uni.setStorageSync('localHistory',this.historyArray)
			},
			showDialog() {
				this.$refs.popup.open()
			},
			close(done){
				done()
			},
			// 删除历史记录
			deleteHistory() {
				this.historyArray = []
				uni.setStorage({
					key: 'localHistory',
					data: this.historyArray 
				})
				
				this.$refs.popup.close()
			},
			//加载历史
			loadHistory() {
				let arr = []
				let his = uni.getStorageSync('localHistory')
				this.$nextTick(function() {
					this.historyArray = his
				})
			},
		}

	}
</script>

<style lang="less" scoped>
	.nav-input-text {
		display: flex;
		flex-direction: row;
		align-items: center;
		border: 1rpx solid #e5e5e5;
		height: 50rpx;
		background-color: #ffffff;
		border-radius: 20px;

		.icon {
			margin-left: 12px;
			// line-height: 60rpx;
		}

		.input {
			font-size: 26rpx;
			// height: 60rpx;
			margin-left: 12px;
			width: 370rpx;
			color: #333;
		}
	}

	.search-history {
		height: 15vh;
		// background-color: #ffc6ff;
		// padding-bottom: 20rpx;
		// border-bottom: 3rpx dashed #adadad;
		overflow: hidden;
		
		// display: flex;
		// justify-content: space-around;
		.history-title {
			display: flex;
			justify-content: space-between;
			color: #626262;
			font-size: 20rpx;
			// border-bottom: 3rpx solid #adadad;
		}

		.history-tab {
			font-size: 16rpx;
			padding: 0 30rpx;
			background-color: #ffb13c;
			display: inline-block;
			border-radius: 50rpx;
			color: #fff;
			margin: 10rpx;
		}
	}
	.history-text{
		text-align: center;
		font-size: 30rpx;
		color: #adadad;
		height: 15vh;
		padding-bottom: 20rpx;
	}
	.line {
		height: 20rpx;
		background-color: #f8f8f8;
	}
</style>
