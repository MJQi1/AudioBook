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
					<swiper-item v-for="(item, index1) in swiperArr" :key="item.id">
						<view class="banner-item" @click="goBook(item.fields.bookId)"><image :src="item.fields.image"></image></view>
					</swiper-item>
				</swiper>
				<view class="swiper-container">
					<!-- 图标快捷 -->
					<book-block @chooseSwiper="handleChooseSwiper"></book-block>
					<!-- 展示模块 -->
					<book-block-title title="猜你喜欢" :refresh="true" @refreshThis="getLike"><a-compinents :list="guessLike"></a-compinents></book-block-title>
					<!-- 展示详情 -->
					<book-block-title title="为你推荐" :more="true" @moresThis="moresThis"><book-intro :list="recommend"></book-intro></book-block-title>
					<!-- 小排行 -->
					<book-small-rank :lists="rankData"></book-small-rank>
					<!-- 下拉加载随机推荐 -->
					<book-block-title title="精彩推荐">
						<!-- <view class="" v-for="(item, index2) in pollDownData" :key="index2"> -->
						<book-intro :list="pollDownData" :limit="0"></book-intro>
						<!-- </view> -->
					</book-block-title>
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
			guessLike: [], //猜你喜欢
			recommend: [], //推荐
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
			], //小排行
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
		this.getData(); //获取推荐 轮播 小排行
		this.getLike(); //获取猜你喜欢
		this.getRecommend();
	},
	methods: {
		//获取数据
		async getData() {
			let data = {
				type: 'all',
				state: 0
			};
			//排行获取
			let res = await postData('book/getRank/', data);
			let books = eval(res.data);
			// books[0].fields
			this.rankData[0].list = eval(res.data.all);
			this.rankData[1].list = eval(res.data.free);
			this.rankData[2].list = eval(res.data.vip);

			//推荐获取
			let recommend = await postData('book/getRecommend/', {
				type: 'all',
				state: 1
			});
			this.recommend = eval(recommend.data);
			// this.pollDownData= eval(recommend.data)
			
			//轮播图获取
			let lbt = await postData('book/getRecommend/', {
				type: 'all',
				state: 2
			});
			this.swiperArr = eval(lbt.data)
		},
		//加载获取更多推荐
		async getRecommend() {
			let recommend = await postData('book/getRecommend/', {
				type: 'all',
				state: 1
			});
			for (let i of eval(recommend.data)) {
				this.pollDownData.push(i);
			}
		},
		async getLike() {
			// 猜你喜欢推荐获取
			let like = await postData('book/getRecommend/', {
				type: 'all',
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
			setTimeout(() => {
				this.getRecommend();
			}, 1000);
		},
		handleChooseSwiper(item) {
			switch (item) {
				case '免费':
					this.$emit('switchTag', 4);
					break;
				case '会员':
					this.$emit('switchTag', 5);
					break;
				case '精选':
					this.$emit('switchTag', 6);
					break;
			}
		},
		//跳转jiaz更多
		moresThis() {
			console.log(11111111);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			});
		},
		//轮播图点击跳转
		goBook(id){
			uni.navigateTo({
				url:'/pages/bookDatiles/bookDatiles?id='+id
			})
		}
	},
	onPullDownRefresh() {
		console.log('refresh');
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	
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
