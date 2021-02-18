<template>
	<view>
	<!-- 滚动效果 -->
	<scroll-view scroll-y="true" class="swiper-sccroll" @scrolltolower="loadMore">
		<view>
			
			<view class="swiper-container">
				<book-small-swiper></book-small-swiper>
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
				<view class="" style="height: 30rpx;"></view>
			</view>
		</view>
	</scroll-view>
	</view>
</template>

<script>
	import {selectBar, rankData, textList,boyList, girlList, pollDownData} from '../data.js'
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
		methods: {
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
	height: 100%;
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
