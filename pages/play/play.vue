<template>
	<view class="main">
		<view class="play-background"></view>
		<!-- 播放版面 -->
		<view class="play-content">
			<view class="play-cover">
				<image :animation="anim" src="../../static/background/shelf.png" mode="aspectFill"></image>
			</view>
			<view class="play-button">
				<view class="silder"><slider /></view>
				<view class="buttons">
					<view class="btn"><image src="../../static/icons/Playerplay.png" mode="aspectFill"></image></view>
					<view class="btn"><image src="../../static/icons/Playerplay.png" mode="aspectFill"></image></view>
					<view class="btn-play">
						<!-- 动画 -->
						<uni-transition @click="play()" :mode-class="['fade']" :styles="style1" :show="!isPlay" @change="change" />
						<uni-transition @click="pause()" :mode-class="['fade']" :styles="style2" :show="isPlay" @change="change" />
						
					</view>
					<view class="btn"><image @click="play()" src="../../static/icons/Playernext.png" mode="aspectFill"></image></view>
					<view class="btn"><image @click="pause()" src="../../static/icons/Playerfastforward.png" mode="aspectFill"></image></view>
				</view>
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
</template>

<script>
export default {
	data() {
		return {
			playBtnSrc: '',
			isPlay: true,
			show: false,
			anim:{},
			style1: { 
				width: '150rpx', 
				height: '150rpx', 
				backgroundImage: 'url("../../static/icons/Playernext.png")' ,
				backgroundSize:'cover'
			},
			style2: {
				width: '150rpx', 
				height: '150rpx', 
				backgroundImage: 'url("../../static/icons/Playerpause.png")' ,
				backgroundSize:'cover'
			}
		};
	},
	onLoad(){
		anims = uni.createAnimation({
			duration:4000,
			timingFunction:'linear',	
		})
	},
	methods: {
		//播放
		play() {
			
			this.isPlay = true;
			console.log('播放');
	
			this.anims.rotate(360).step()
			this.anim = this.anims.export()
		},
		pause() {
			console.log('暂停');
			this.isPlay = false;
		},
		open(mode) {
			this.show = !this.show;
		},
		change() {
			
		}
	}
};
</script>

<style lang="less">
.main {
	// background-color: #ffebfe;
	width: 100%;
}
.play-background {
	width: 100%;
	height: 54vh;
	background-image: url(../../static/background/shelf.png);
	filter: blur(10rpx);
}
.play-content {
	width: 80vw;
	margin: auto;
	height: 40vh;
	overflow: hidden;
	position: absolute;
	top: 10vh;
	left: 0;
	right: 0;
	.play-cover {
		margin: auto;
		height: 50vw;
		width: 50vw;
		overflow: hidden;
		border-radius: 50%;
		image {
			width: 100%;
			height: 100%;
			
		}
	}
	.play-button {
		.silder {
		}
		.buttons {
			display: flex;
			justify-content: space-around;
			align-items: center;
			.btn {
				width: 100rpx;
				height: 100rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.btn-play {
				width: 150rpx;
				height: 150rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
.pinlun {
	width: 100%;
	background-color: #ffffff;
	height: 50vh;
	border-radius: 50rpx;
	position: relative;
	top: -100rpx;
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
