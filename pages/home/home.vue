<template>
	<view class="main">
		<!-- app状态栏留白 -->
		<view class="status_bar"></view>
		<!-- Nav -->
		<uni-nav-bar class="nav-bar" rightIcon="bars" @clickRight="showDraw">
			<view slot="left" class="logo-text">
				<image src="../../static/logo.png" mode="aspectFit"></image>
			</view>
			<view @click.stop="goSearchPage" class="search-box" slot="default">
				<view class="child">
					<uni-icons type="search" color="#999" size="16"></uni-icons>搜索相关书籍
				</view>
			</view>
		</uni-nav-bar>
		<!-- 抽屉 -->
		<uni-drawer ref="draw" mode="right">
			<view class="draw">
				<text>选择想要的模块</text>
				<div class="tab-box">
					<view class="select-tab" v-for="(item,index) in selectBar" :key="index" >
						<uni-fav class="tab-item" :checked="item.select" circle="true"  bgColorChecked="#ffaa7f" :contentText="{contentDefault: item.name,contentFav: item.name}"
						 star="false" @click="selected(index)"></uni-fav>
					</view>
				</div>
			</view>
		</uni-drawer>
		<!-- 切换 -->
		<view class="top-bar">
			<!-- 小导航 -->
			<scroll-view class="scroll-x" scroll-x="true" :scroll-left="scrollLeft">
				<view v-for="(item,index) in selectBar" :key="index" class="page-container" :class="tabAct === index? 'tab-active':''"
				 v-show="item.select" @click="ponit(index,$event)">{{item.name}}</view>
			</scroll-view>
			<!-- 切换容器 -->
			<swiper class="swipers" :indicator-dots="false" :current="tabAct" @change="swiperChange" :duration="500">
				<swiper-item v-for="(item, index) in selectBar" v-if="item.select" :key="item.name">
					<!-- 滚动效果 -->
					<scroll-view scroll-y="true" class="swiper-sccroll">
						<view>
							<!-- 首页轮播 -->
							<swiper class="banner" v-if="index === 0" :indicator-dots="true" indicator-color="#ffe4cb" indicator-active-color="#ffaa00"
							 :autoplay="true" :interval="3000" :duration="1000" circular="true">
								<swiper-item v-for="(item,index) in data" :key="item.id">
									<view class="banner-item">
										<image :src="item.src" mode="scaleToFill"></image>
									</view>
								</swiper-item>
							</swiper>
							<view class="swiper-container">
								<!-- 图标快捷 -->
								<book-block v-if="item.name==='推荐'"></book-block>
								<book-block v-if="item.name==='男生'" :list="boyList"></book-block>
								<book-block v-if="item.name==='女生'" :list="girlList"></book-block>
								
								<a-compinents title="猜你喜欢" :list="textList"></a-compinents>
								{{item.name}}
								<view class="" style="height: 300rpx;">
									1
								</view>
								<view class="" style="height: 300rpx;">
									12
								</view>
								<view class="" style="height: 300rpx;">
									13
								</view>
								<view class="" style="height: 300rpx;">
									14
								</view>
								<view class="" style="height: 300rpx;">
									15
								</view>
								<view class="" style="height: 300rpx;">
									16
								</view>
								<view class="" style="height: 300rpx;">
									17
								</view>
							</view>
						</view>
					</scroll-view>
					

				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [{
					id: 1,
					src: '/static/guide/duo.png'
				}, {
					id: 2,
					src: '/static/guide/convent.png'
				}, {
					id: 3,
					src: '/static/guide/learn.png'
				}, {
					id: 4,
					src: '/static/guide/looks.png'
				}],
				guidePages: 0,
				searchData: '',
				range: 0,
				tabAct: 0,
				//标题导航
				selectBar: [{
						name: '推荐',
						select: true
					},
					{
						name: '男生',
						select: true
					},
					{
						name: '女生',
						select: true
					},
					{
						name: '儿童',
						select: true
					},
					{
						name: '免费',
						select: true
					},
					{
						name: '会员',
						select: true
					},
					{
						name: '132',
						select: true
					},
					{
						name: 'true',
						select: true
					}
				],
				//滚动条件
				scrollLeft: 0,
				old: {
					scrollTop: 0
				},
				//测试数据
				textList:[{
					bookId:144,
					src:'http://imagev2.xmcdn.com/group74/M08/F7/E5/wKgO3F6ZKlyTkqKqAAMEKEhOSIw777.jpg!op_type=5&upload_type=album&device_type=ios&name=mobile_large&magick=png',
					bookTitle:'嘴说大全',
					author:'小三'
				},{
					bookId:242,
					src:'http://imagev2.xmcdn.com/group74/M08/F7/E5/wKgO3F6ZKlyTkqKqAAMEKEhOSIw777.jpg!op_type=5&upload_type=album&device_type=ios&name=mobile_large&magick=png',
					bookTitle:'校花的贴身',
					author:'鱼人二代'
				},{
					bookId:2544,
					src:'/static/guide/duo.png',
					bookTitle:'斗破苍穹',
					author:'天蚕土豆'
				},{
					bookId:454,
					src:'/static/guide/duo.png',
					bookTitle:'小鼠大气',
					author:'哈罗'
				},{
					bookId:1995,
					src:'/static/guide/duo.png',
					bookTitle:'庆余年',
					author:'猫腻'
				},{
					bookId:785,
					src:'/static/guide/duo.png',
					bookTitle:'斗罗大陆',
					author:'唐家三少'
				}],
				boyList:[
				{
					title: '玄幻',
					imageSrc: '/static/icons/xuanhuan.png',
					path: '/pages/index/test/test'
				},
				{
					title: '武侠',
					imageSrc: '/static/icons/xianxia.png',
					path: '/pages/index/test/test'
				},
				{
					title: '都市',
					imageSrc: '/static/icons/dushi.png',
					path: '/pages/index/test/test'
				},
				{
					title: '悬疑',
					imageSrc: '/static/icons/xuanyi.png',
					path: '/pages/index/test/test'
				},
				{
					title: '游戏',
					imageSrc: '/static/icons/youxi.png',
					path: '/pages/index/test/test'
				}],
				girlList:[
				{
					title: '言情',
					imageSrc: '/static/icons/yanqing.png',
					path: '/pages/index/test/test'
				},
				{
					title: '悬疑',
					imageSrc: '/static/icons/xuanyi.png',
					path: '/pages/index/test/test'
				},
				{
					title: '仙侠',
					imageSrc: '/static/icons/xianxia.png',
					path: '/pages/index/test/test'
				},
				{
					title: '青春',
					imageSrc: '/static/icons/shuidi.png',
					path: '/pages/index/test/test'
				},
				{
					title: '游戏',
					imageSrc: '/static/icons/youxi.png',
					path: '/pages/index/test/test'
				}]
			}
		},
		methods: {
			//跳转搜索页
			goSearchPage() {
				uni.navigateTo({
					url: 'search/search'
				})
			},
			confirm() {
				uni.navigateTo({
					url: "./search/search",
					success() {
						console.log('success');
					},
					fail(e) {
						console.log(e);
					}
				})
			},
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
			swiperChange(e) {
				this.tabAct = e.detail.current

			},
			showDraw() {
				this.$refs.draw.open();
			},
			selected(index) {
				let i = index
				if (index === 0) {
					return
				}
				this.$nextTick(function() {
					this.selectBar[i].select = !this.selectBar[i].select
					// console.log(this.selectBar);
				})

			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	.main {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #ffffff;
	}

	// navBar
	.nav-bar {
		:first-child {}

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
			margin-left: 20rpx;
			height: 60rpx;
			border: 1px solid #e5e5e5;
			border-radius: 50rpx;
			line-height: 60rpx;

			.child {
				font-size: 26rpx;
				margin-left: 15vw;
			}
		}

	}

	/* #ifdef MP-WEIXIN */
	.nav-bar {
		:first-child {
			height: 120rpx;
		}
	}

	/* #endif */

	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.draw {
		padding: 30rpx;

		text {
			display: block;
			font-size: 36rpx;
			color: #ff6600;
			height: 100rpx;
			width: 100%;
			text-align: center;
			line-height: 100rpx;
			border-bottom: 2px solid #ff6600;
		}
		.tab-box{
			padding: 20rpx;
			.select-tab{			
				display: inline-block;
				margin: 20rpx;
				.tab-item{
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
		background-color: #ffffff;
		height: 100%;

		.scroll-x {
			width: 100%;
			height: 70rpx;
			white-space: nowrap;

			.page-container {
				display: inline-block;
				height: 50rpx;
				line-height: 50rpx;
				margin: 10rpx 30rpx;
				/* background-color: #0086B3; */
			}

			.tab-active {
				border-bottom: 5rpx #ffc23a solid;
			}
		}

		.swipers {
			flex: 1;
			height: 90%;
			.swiper-item {
				flex: 1;
				flex-direction: row;

			}
		}
	}
	//主要内容
	.swiper-sccroll{
		width: 100%;
		height: 100%;
		//轮播
		.banner {
			height: 20vh;
			.banner-item {}
		}
		.swiper-container{
			padding: 30rpx;
			// width: 100%;
			
			// background-color: #aaaaff;
		}
	}
	
</style>
