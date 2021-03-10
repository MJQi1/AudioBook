<template>
	<view class="main">
		<!-- app状态栏留白 -->
		<view class="status_bar"></view>
		<!-- Nav -->
		<uni-nav-bar class="nav-bar" rightIcon="bars" @clickRight="showDraw">
			<view slot="left" class="logo-text"><image src="../../static/logo.png" mode="aspectFit"></image></view>
			<view @click.stop="goSearchPage" class="search-box" slot="default">
				<view class="child">
					<uni-icons type="search" color="#999" size="16"></uni-icons>
					<text>搜索相关书籍</text>
				</view>
			</view>
		</uni-nav-bar>
		<!-- 悬浮按钮 -->
		<book-fab></book-fab>
		<!-- 抽屉 -->
		<uni-drawer ref="draw" mode="right" @change="hideDraw">
			<view class="draw">
				<text>自定义模块</text>
				<div class="tab-box">
					<view class="select-tab" v-for="(item, index) in selectBar" :key="index">
						<uni-fav
							class="tab-item"
							:checked="item.select"
							circle="true"
							bgColorChecked="#ffaa7f"
							:contentText="{ contentDefault: item.name, contentFav: item.name }"
							star="false"
							@click="selected(index)"
						></uni-fav>
					</view>
				</div>
			</view>
		</uni-drawer>
		<!-- 切换 -->
		<view class="top-bar">
			<!-- 小导航 -->
			<scroll-view class="scroll-x" scroll-x="true" :scroll-left="scrollLeft">
				<view
					v-for="(item, index) in selectBar"
					:key="index"
					class="page-container"
					:class="tabAct === index ? 'tab-active' : ''"
					v-show="item.select"
					@click="ponit(index, $event)"
				>
					{{ item.name }}
				</view>
			</scroll-view>

			<!-- 切换容器 -->
			<swiper class="swipers" :indicator-dots="false" :current="tabAct" @change="swiperChange" :duration="500">
				<swiper-item v-for="(item, index) in selectBar" v-if="item.select" :key="item.name">
					<!-- 滚动效果 -->
					<scroll-view scroll-y="true" class="swiper-sccroll" @scrolltolower="loadMore">
						<insCom v-if="item.name == '推荐'" @switchTag="switchTag"/>
						<boyCom v-if="item.name == '男生'"/>
						<girlCom v-if="item.name == '女生'"/>
						<eduCom v-if="item.name == '教育'"/>
						<memberCom v-if="item.name == '会员'"/>
						<freeCom v-if="item.name == '免费'"/>
						<childCom v-if="item.name == '娱乐'"/>
						
						<!-- <uni-load-more :status="state"></uni-load-more> -->
						<view class="" style="height: 30rpx;"></view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import {selectBar, rankData, textList,boyList, girlList, pollDownData} from './data.js'
import ins from './typeHome/ins.vue'
import boy from './typeHome/boy.vue'
import girl from './typeHome/grirl.vue'
import edu from './typeHome/edu.vue'
import free from './typeHome/free.vue'
import member from './typeHome/menber.vue'
import child from './typeHome/child.vue'
export default {
	components:{
		insCom:ins,
		boyCom:boy,
		girlCom:girl,
		eduCom:edu,
		freeCom:free,
		memberCom:member,
		childCom:child
	},
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
	onLoad() {
		let settings = uni.getStorageSync('moudule-select')
		if(settings !== ''){
			this.selectBar = settings
		}

	},
	methods: {
		//跳转搜索页
		goSearchPage() {
			uni.navigateTo({
				url: 'search/search'
			})
		},
		// confirm() {
		// 	uni.navigateTo({
		// 		url: "./search/search",
		// 		success() {
		// 			console.log('success');
		// 		},
		// 		fail(e) {
		// 			console.log(e);
		// 		}
		// 	})
		// },
		//导航按钮
		ponit(i, e) {
			this.tabAct = i
			let obj = e.target.x
			let width
			uni.getSystemInfo({
				success(res) {
					width = res.screenWidth - 70
				}
			})
			this.$nextTick(function() {
				if (obj > width) {

					this.scrollLeft = width

				} else {
					this.scrollLeft = 0
				}
			})
			this.scrollLeft = 0
		},
		//返回当前swiper的页码
		swiperChange(e) {
			this.tabAct = e.detail.current

		},
		//显示抽屉
		showDraw() {
			this.$refs.draw.open();
			// uni.hideTabBar()
		},
		hideDraw(status){
			console.log(status);
			if(!status){
				// uni.showTabBar()
			}
		},
		//练级swiper
		selected(index) {
			let i = index
			if (index === 0) {
				return
			}
			this.$nextTick(function() {
				this.selectBar[i].select = !this.selectBar[i].select
				uni.setStorageSync('moudule-select',this.selectBar)
				// console.log(this.selectBar);
			})

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
		//切换主题
		switchTag(item){
			this.tabAct = item
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
page {
	width: 100%;
	min-height: 100%;
	display: flex;
}

.main {
	height: 100%;
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	background-color: #ffffff;
}

// navBar
.nav-bar {
	:first-child {
	}

	.logo-text {
		image {
			margin-top: 2vh;
			width: 10vh;
			// height: 72rpx;
		}
	}

	.search-box {
		color: #999;
		width: 60vw;
		height: 50rpx;
		margin-left: 20rpx;
		border: 1px solid #e5e5e5;
		border-radius: 50rpx;

		.child {
			font-size: 26rpx;
			margin-left: 15vw;
			height: 100%;
			line-height: 50rpx;
		}
	}
}

/* #ifdef MP-WEIXIN */
.nav-bar {
	:first-child {
		// height: 120rpx;
	}
}

/* #endif */

.container {
	padding: 10px;
	font-size: 14px;
	line-height: 24px;
}

.draw {
	padding: 30rpx;

	text {
		display: block;
		font-size: 30rpx;
		color: #ff6600;
		height: 100rpx;
		width: 100%;
		text-align: center;
		line-height: 100rpx;
		// box-shadow: 0 1px 1px #cccccc;
	}
	.tab-box {
		padding: 20rpx;
		.select-tab {
			display: inline-block;
			margin: 20rpx;
			.tab-item {
				width: 300rpx;
				height: 60rpx;
			}
		}
	}
}

// 主体切换
.top-bar {
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	background-color: #ffe6c7;
	// background-image: url(/static/background/content.png);
	background-size: cover;
	background-repeat: no-repeat;
	color: #555;
	height: 100%;

	.scroll-x {
		width: 100%;
		height: 70rpx;
		white-space: nowrap;
		background-image: linear-gradient(to bottom, #fdf2ee, #ffe6c7);

		.page-container {
			display: inline-block;
			height: 50rpx;
			line-height: 50rpx;
			margin: 10rpx 30rpx;
			font-size: 30rpx;
		}

		.tab-active {
			color: #ff5500;
			border-bottom: 5rpx #ff5500 solid;
		}
	}

	.swipers {
		flex: 1;
		height: 90%;
		// background-color: #ffc743;
		.swiper-item {
			flex: 1;
			flex-direction: row;
		}
	}
}
//主要内容
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
