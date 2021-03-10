<template>
	<view>
		<!-- 滚动效果 -->
		<scroll-view scroll-y="true" class="swiper-sccroll" @scrolltolower="loadMore">
			<view>
				<view class="swiper-container">
					<book-small-swiper :imageList="swiperArr"></book-small-swiper>
					<!-- 图标快捷 -->
					<!-- <book-block :list="girlList" @chooseSwiper="handleChooseSwiper"></book-block> -->
					<!-- 展示模块 -->
					<book-block-title title="猜你喜欢" :refresh="true" @refreshThis="getLike"><a-compinents :list="guessLike"></a-compinents></book-block-title>
					<!-- 展示详情 -->
					<book-block-title title="为你推荐" :more="true" @moresThis="mores"><book-intro :list="recommend"></book-intro></book-block-title>
					<!-- 小排行 -->
					<book-small-rank :lists="rankData"></book-small-rank>
					<!-- 下拉加载随机推荐 -->
					<book-block-title id="mo" title="精彩推荐"><book-intro :list="pollDownData" :limit="0"></book-intro></book-block-title>
					<uni-load-more :status="state"></uni-load-more>
					<view class="" style="height: 30rpx;"></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { selectBar, rankData, textList, boyList, girlList, pollDownData } from '../data.js';
import { getData, postData } from '@/http/fetch.js';
export default {
	data() {
		return {
			swiperArr: [],
			guidePages: 0,
			searchData: '',
			range: 0,
			tabAct: 0,
			state: 'more', //下拉刷新状态
			//标题导航
			selectBar: selectBar,
			//滚动条件
			scrollLeft: 0,
			old: {
				scrollTop: 0
			},
			recommend: [], //推荐
			guessLike: [], //猜你喜欢
			//测试数据
			textList: textList,
			boyList: boyList,
			girlList: girlList,
			rankData: [
				{
					title: '人气榜',
					list: textList
				},
				{
					title: '免费榜',
					list: textList
				},
				{
					title: '新书榜',
					list: textList
				}
			],
			pollDownData: [],
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
		};
	},
	created() {
		this.getData();
		this.getLike();
		this.getRecommend();
	},
	methods: {
		//获取数据
		async getData() {

			//推荐获取
			let recommend = await postData('book/getRecommend/', {
				type: 'free',
				state: 1
			});
			this.recommend = eval(recommend.data);
			
			//轮播图获取
			let lbt = await postData('book/getRecommend/', {
				type: 'free',
				state: 2
			});
			this.swiperArr = eval(lbt.data)
		},
		//加载获取更多推荐
		async getRecommend() {
			let recommend = await postData('book/getRecommend/', {
				type: 'free',
				state: 1
			});

			this.$nextTick(function() {
				for (let i of eval(recommend.data)) {
					this.pollDownData.push(i);
				}
			});
			console.log(this.pollDownData);
		},
		async getLike() {
			// 猜你喜欢推荐获取
			let like = await postData('book/getRecommend/', {
				type: 'free',
				state: 0
			});
			this.guessLike = eval(like.data);
		},
		//加载更多
		loadMore() {
			if (this.pollDownData.length > 30) {
				this.state = 'noMore';
				return;
			}
			this.state = 'loading';
			console.log(111111111111111);
			setTimeout(() => {
				this.getRecommend();
			}, 1000);
		},
		handleChooseSwiper(item) {
			switch (item) {
				case '免费':
					this.tabAct = 4;
					break;
				case '会员':
					this.tabAct = 5;
					break;
			}
		},
		//推荐更多
		mores() {
			uni.pageScrollTo({
				selector: '#mo',
				duration: 300
			});
		}
	},
	onPullDownRefresh() {
		console.log('refresh');
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	}
};
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
