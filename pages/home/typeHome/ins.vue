<template>
	<view>
	<!-- 滚动效果 -->
	<scroll-view scroll-y="true" class="swiper-sccroll" @scrolltolower="loadMore">
		<view>
			<!-- 首页轮播 -->
			<swiper
				class="banner"
				:indicator-dots="true"
				indicator-color="#ffe4cb"
				indicator-active-color="#ffaa00"
				:autoplay="true"
				:interval="3000"
				:duration="1000"
				circular="true"
			>
				<swiper-item v-for="(item, index1) in data" :key="item.id">
					<view class="banner-item"><image :src="item.src"></image></view>
				</swiper-item>
			</swiper>
			<view class="swiper-container">
				<!-- 图标快捷 -->
				<book-block  @chooseSwiper="handleChooseSwiper"></book-block>
				<!-- 展示模块 -->
				<book-block-title title="猜你喜欢" :refresh="true"><a-compinents :list="textList"></a-compinents></book-block-title>
				<!-- 展示详情 -->
				<book-block-title title="为你推荐" :more="true"><book-intro :list="textList"></book-intro></book-block-title>
				<!-- 小排行 -->
				<book-small-rank :lists="rankData"></book-small-rank>
				<!-- 下拉加载随机推荐 -->
				<book-block-title title="精彩推荐">
					<view class="" v-for="(item, index2) in pollDownData" :key="index2"><book-intro :list="item.list"></book-intro></view>
				</book-block-title>
				<uni-load-more :status="state"></uni-load-more>
				<view class="" style="height: 30rpx;"></view>
			</view>
		</view>
	</scroll-view>
	</view>
</template>

<script>
	import {selectBar, rankData, textList,boyList, girlList, pollDownData} from '../data.js'
	import { getData, postData} from '@/http/fetch.js'
	export default {
		data() {
			return {
				data: [{
					id: 1,
					src: '/static/background/home.jpg'
				}, {
					id: 2,
					src: '/static/background/mine.png'
				}, {
					id: 3,
					src: '/static/background/home.jpg'
				}, {
					id: 4,
					src: '/static/background/shelf.png'
				}],
				guidePages: 0,
				searchData: '',
				range: 0,
				tabAct: 0,
				state:'more',//下拉刷新状态
				//标题导航
				selectBar: selectBar,
				//滚动条件
				scrollLeft: 0,
				old: {
					scrollTop: 0
				},
				//测试数据
				textList: textList,
				boyList:boyList,
				girlList:girlList,
				rankData: rankData,
				pollDownData:pollDownData,
				imageList: [
						{
							src: '/static/load/load1080.png',
							path: '/pages/index/index'
						},
						{
							src: '/static/load/load1080.png',
							path: ''
						}
					]
			}
		},
		created() {
			// this.getData()
		},
		methods: {
			//获取数据
			async getData(){
				let data = {
					type: 'all',
					state:0	
				}
				let res = await postData('book/getRank/',data)
				let books = eval(res.data)
				// books[0].fields
				this.rankData[0].list = eval(res.data)
				this.rankData[1].list = eval(res.data)
				this.rankData[2].list = eval(res.data)
				console.log(books);
			},
			//加载更多
			loadMore(){
				if(this.pollDownData.length> 6){
					this.state = 'noMore'
					return
				}
			
				let data = {
					list: this.textList
				}
				this.state = 'loading'
				setTimeout(()=>{
					this.pollDownData.push(data)
				},1000)
			},
			handleChooseSwiper(item){
				switch(item){
					case '免费':
						this.tabAct = 4
						break
					case '会员':
						this.tabAct = 5
						break
				}
			}
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
	}
</script>

<style lang="less" scoped>
.swiper-sccroll {
	width: 100%;
	height: 85vh;
	//轮播
	.banner {
		height: 20vh;
		width: 100vw;
		.banner-item {
			height: 100%;
			width: 100%;
			image {
				height: 100%;
				width: 100%;
			}
		}
	}
	.swiper-container {
		padding: 30rpx;
		// width: 100%;
		// background-color: #aaaaff;
	}
}
</style>
