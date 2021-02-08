<template>
	<view class="main">
		<view class="play-background"></view>
		<!-- 播放版面 -->
		<view class="play-content">
			<view class="play-cover"><image :animation="marquee" id="cover" src="../../static/background/shelf.png" mode="aspectFill"></image></view>
			<view class="">
				<view class="play-button">
					<view class="silder"><slider /></view>
					<view class="buttons">
						<view class="btn"><image src="../../static/icons/Playerright.png" mode="aspectFill"></image></view>
						<view class="btn"><image src="../../static/icons/Playershang.png" mode="aspectFill"></image></view>
						<view class="btn-play">
							<!-- 动画 -->
							<image @click="play(true)" v-show="!isPlay" src="../../static/icons/Playerplay.png" mode=""></image>
							<image @click="play(false)" v-show="isPlay" src="../../static/icons/Playerpause.png" mode=""></image>
						</view>
						<view class="btn"><image @click="" src="../../static/icons/Playernext.png" mode="aspectFill"></image></view>
						<view class="btn"><image @click="play('pause')" src="../../static/icons/Playerfastforward.png" mode="aspectFill"></image></view>
					</view>
				</view>
				<!-- 评论 -->
				<view class="pinlun">
					<view class="pinglun-title">精彩评论(999+)</view>
					<scroll-view scroll-y="true" class="evalute-list">
						<view>
							<uni-list>
								<uni-list-item
									title="名字"
									note="列表描述信息列表描述信息列表描述信息列表描述信息列表列表描述信息列表描述信息列表描述信列表描述信息列表描述信息列表描述信列表描述信息列表描述信息列表描述信描述信息列表描述信息列表描述信息"
									thumb="https://tse3-mm.cn.bing.net/th/id/OIP.1NiQaNCRWX0sioJGRwKuAwHaIS?w=187&h=209&c=7&o=5&dpr=1.06&pid=1.7"
									thumb-size="lg"
									rightText="右侧文字"
								>
									<template slot="header">
										<image style="width: 100rpx;height:100rpx" src="../../static/icons/xianxia.png" mode=""></image>
									</template>
									<template slot="footer">
										<text style="font-size: 16rpx; color: #999;">2020-1-2</text>
									</template>
								</uni-list-item>
							</uni-list>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			playBtnSrc: '',
			isPlay: true,
			show: false,
			anim: {},
			style1: {
				width: '120rpx',
				height: '120rpx',
				backgroundImage: 'url("../../static/icons/Playernext.png")',
				backgroundSize: 'cover'
			},
			style2: {
				width: '120rpx',
				height: '120rpx',
				backgroundImage: 'url("../../static/icons/Playerpause.png")',
				backgroundSize: 'cover'
			},
			rate: '',
			marquee: {}, //跑马灯效果
			animation: {},
			deg:0,
			timer:null
		};
	},
	onReady() {
		// this.rate = this.$anime({
		// 	targets:'#cover',
		// 	rotate:'360deg',
		// 	easing:'linear',
		// 	loop:true,
		// 	duration:7000
		// })
		const that = this;
		/* 创建的动画 */
		var animation = uni.createAnimation({
			duration: 3000,
			timingFunction: 'linear'
		});
		that.animation = animation;
		// 模仿ajax请求
		setTimeout(() => {
			that.startAni();
			that.loopAni();
		}, 100);
	},
	methods: {
		//播放
		play(state) {
			if (state) {
				// this.rate.play();
				this.isPlay = true;
				this.loopAni()
			} else {
				// this.rate.pause();
				clearInterval(this.timer)
				
				this.isPlay = false;
			}
		},
		open(mode) {
			this.show = !this.show;
		},
		change() {},
		startAni() {
			const that = this;
			//这里输入固定值的话  循环动画就没执行了  所以加上一个随机数就可以了
			this.deg = this.deg += 180
			that.animation.rotate(this.deg).step({
				duration:3000
			});
			
			that.marquee = that.animation.export();
		},
		loopAni(x) {
			const that = this;
			that.timer = null;
			clearInterval(that.timer);
			if(x){
				console.log(123);
				return
			}
			that.timer = setInterval(() => {
				that.startAni();
			}, 3010); //这个的时间比动画的时间多一点点  防止动画没做完又执行了
			
		}
	}
};
</script>

<style lang="less" scoped>
.main {
	// background-color: #ffebfe;
	width: 100%;
}
.play-background {
	width: 100%;
	height: 60vh;
	background-image: url(../../static/background/shelf.png);
	filter: blur(10rpx);
}
.play-content {
	margin: auto;
	overflow: hidden;
	position: absolute;
	top: 8vh;
	left: 0;
	right: 0;
	.play-cover {
		margin: auto;
		height: 25vh;
		width: 25vh;
		overflow: hidden;
		border-radius: 50%;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.play-button {
		width: 70vw;
		margin: auto;
		.silder {
		}
		.buttons {
			display: flex;
			justify-content: space-around;
			align-items: center;
			.btn {
				width: 80rpx;
				height: 80rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.btn-play {
				width: 120rpx;
				height: 120rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
.pinlun {
	width: 100vw;
	background-color: #ffffff;
	height: 50vh;
	border-radius: 50rpx;
	.pinglun-title {
		text-align: center;
		line-height: 150rpx;
		font-size: 30rpx;
	}
	.evalute-list {
		height: 50vh;
	}
}
</style>
