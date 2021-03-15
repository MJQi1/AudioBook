<template>
	<view class="main">
		<view class="play-background"></view>
		<!-- 播放版面 -->
		<view class="play-content">
			<view class="play-cover"><image :animation="marquee" id="cover" :src="info.img" mode="aspectFill"></image></view>
			<view class="">
				<view class="play-button">
					<view style="text-align: center;line-height: 100rpx;font-size: 36rpx;color: #ffe8e0;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
						{{info.title}}
					</view>
					<view class="silder">
						<text>{{ currentTime|format }}</text>
						<slider :max="duration" :value="currentTime" block-size="15" @change="seek" activeColor="#ea9518"/>
						<text>{{ duration|format }}</text>
					</view>
					<view class="buttons">
						<view class="btn"><image @click="kuaijin(-15)" src="../../static/icons/Playerright.png" mode="aspectFill"></image></view>
						<view class="btn"><image @click="changePlay(-1)" src="../../static/icons/Playershang.png" mode="aspectFill"></image></view>
						<view class="btn-play">
							<!-- 动画 -->
							<image @click="play(true)" v-show="!isPlay" src="../../static/icons/Playerplay.png" mode=""></image>
							<image @click="play(false)" v-show="isPlay" src="../../static/icons/Playerpause.png" mode=""></image>
						</view>
						<view class="btn"><image @click="changePlay(1)" src="../../static/icons/Playernext.png" mode="aspectFill"></image></view>
						<view class="btn"><image @click="kuaijin(15)" src="../../static/icons/Playerfastforward.png" mode="aspectFill"></image></view>
					</view>
				</view>
				<!-- 评论 -->
				<view class="pinlun">
					<view class="pinglun-title">精彩评论({{commentList.length}})</view>
					<scroll-view scroll-y="true" class="evalute-list">
						<view>
							<view v-if="!hasComm" style="font-size:30rpx;text-align: center;border-top: solid 1px #999;line-height: 100rpx;">
								暂无评论
							</view>
							<uni-list v-if="hasComm">
								<uni-list-item 
									v-for="(item, index) in commentList"
									:key="index"
									:title="item[2]"
									:note="item[1]"
									:thumb="item[3]"
									thumb-size="lg"
									rightText="右侧文字"
								>
									<template slot="header">
										<image style="width: 80rpx;height:80rpx;border-radius: 50%;margin-right: 20rpx;" :src="item[3]|imgSrc" mode=""></image>
									</template>
									<template slot="footer">
										<view class="" style="display: flex;flex-direction: column;align-items: flex-end; justify-content: space-between;">
											<text style="font-size: 16rpx; color: #999;">{{item[0]}}</text>
											<uni-icons v-if="user == item[2]" type="trash" size="12" @click="delComment(item[4])"></uni-icons>
										</view>
										
									</template>
								</uni-list-item>
							</uni-list>
						</view>
					</scroll-view>
				</view>
			</view>
			<uni-popup type="share" ref="share"><book-share-pop @select="shareSelect"></book-share-pop></uni-popup>
		</view>
	</view>
</template>

<script>
import { postData, getData } from '@/http/fetch.js';
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
			deg: 0,
			timer: null,
			audio: {},
			playSrc: '',
			currentTime: '',
			duration: '',
			bookinfo:'',
			chapterName:'',
			chapterIndex:'',
			info:'',
			commentList:[],
			hasComm:'',
		};
	},
	onNavigationBarButtonTap(e) {
		const index = e.index;
		let path;
		switch (index) {
			case 0:
				this.$refs.share.open();
				break;
		}
	},
	onReady() {
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
	onLoad(op) {
		//初始化信息
		this.chapterName = op.name
		this.bookinfo = this.$store.state.book.bookInfo
		this.chapterIndex = op.index
		console.log(op.index);
		this.$store.commit('CURRENTPLAY',op.index)
		//初始化音频api
		// this.audio = uni.createInnerAudioContext();
		if(op.id != undefined){
			this.getPlaySrc(op.id)
		}else{
			this.initAudio()
		}
		this.getChapter()
		if(this.chapterName != undefined){
			this.$store.commit('INFO',{
				title:this.bookinfo.bookName+ ' ' + this.chapterName,
				img:this.bookinfo.img,
				bookId:this.bookinfo.bookId
			})
		}
		
		this.info = this.$store.state.player.info
		this.getComment()
	},
	filters: {
		format(endTime) {
			let secondTime = parseInt(endTime); //将传入的秒的值转化为Number
			let min = 0; // 初始化分
			let result = '';
			if (secondTime > 60) {
				//如果秒数大于60，将秒数转换成整数
				min = parseInt(secondTime / 60); //获取分钟，除以60取整数，得到整数分钟
				secondTime = parseInt(secondTime % 60); //获取秒数，秒数取佘，得到整数秒数
			}
			result = `${min.toString().padStart(2, '0')}:${secondTime.toString().padStart(2, '0')}`;
			return result;
		}
	},
	methods: {
		async getComment() {
			let comment = await postData('user/Comment/',{
				user: this.user,
				bookId:this.info.bookId,
				state: 0//get comment list
			}) 
			this.commentList = comment.comment
			if(comment.comment.length==0){
				this.hasComm = false
			}else{
				this.hasComm = true
			}
		},
		async getChapter(){
			let res = await getData('book/getBookDetiles/?id=' + this.bookinfo.bookId)
			this.$store.commit('PLAYLIST',eval(res.data))
			this.playList = this.$store.state.player.playList
		},
		initAudio(){
			if(this.$player.pause){
				this.isPlay = true;
			}
			this.currentTime = this.$player.currentTime;
			this.$player.onCanplay(() => {
				this.duration = this.$player.duration;
			})
			this.duration = this.$player.duration;
			let that = this
			setInterval(()=>{
				that.currentTime = that.$player.currentTime;
			},1000)
		},
		//回去音频地址
		getPlaySrc(id) {
			let that = this;
			uni.request({
				url: 'https://www.ximalaya.com/revision/play/v1/audio?id=' + id + '&ptype=1',
				success(res) {
					that.$player.autoplay = true;
					this.audioSrc = res.data.data.src;
					that.$player.src = res.data.data.src;
					that.currentTime = that.$player.currentTime;
					that.$player.onCanplay(() => {
						that.duration = that.$player.duration;
					});
					that.$player.play();
					that.$store.commit('INFO',{
						title:that.bookinfo.bookName+ ' ' + that.chapterName,
						img:that.bookinfo.img,
						bookId:that.bookinfo.bookId,
						audioSrc: res.data.data.src
					})
					setInterval(()=>{
						that.currentTime = that.$player.currentTime;
					},1000)
				}
			});
		},
		//播放
		play(state) {
			if (state) {
				this.$player.play();
				this.isPlay = true;
				this.loopAni();
			} else {
				// 暂停
				// this.rate.pause();
				clearInterval(this.timer);
				this.$player.pause();
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
			this.deg = this.deg += 180;
			that.animation.rotate(this.deg).step({
				duration: 3000
			});

			that.marquee = that.animation.export();
		},
		loopAni(x) {
			const that = this;
			that.timer = null;
			clearInterval(that.timer);
			if (x) {
				console.log(123);
				return;
			}
			that.timer = setInterval(() => {
				that.startAni();
			}, 3010); //这个的时间比动画的时间多一点点  防止动画没做完又执行了
		},
		// 拖动滑块
		seek(e){
			this.$player.seek(e.detail.value)
		},
		//快进
		kuaijin(time){
			this.$player.seek(this.currentTime+time)
		},
		changePlay(num){
			try{
				let chap = this.playList[parseInt(this.chapterIndex)+num].fields.chapterId
				this.chapterName = this.playList[parseInt(this.chapterIndex)+num].fields.chapterName
				this.chapterIndex = parseInt(this.chapterIndex)+num
				this.$store.commit('CURRENTPLAY',this.chapterIndex)
				console.log(chap);
				this.getPlaySrc(chap)
			}catch{
				uni.showToast({
					title:'没有更多章节',
					icon:'none'
				})
			}		
		},
		//分享选择
		shareSelect(op) {
			let name = op.item.name;
			
			if (name == 'pengyouquan') {
				uni.share({
					provider: 'weixin',
					scene: 'WXSenceTimeline',
					type: 3,
					title: '来自AudioBook分享',
					href: this.$common.url,
					imageUrl:this.info.img,
					mediaUrl:this.info.audioSrc,
					summary: '我正在使用AudioBook听书，赶紧跟我一起来体验！'+this.$common.url,
				});
			}else if(name == 'more'){
				uni.shareWithSystem({
				  summary: '我正在使用AudioBook听书，赶紧跟我一起来体验！'+this.$common.url,
				  href: this.$common.url,
				})
			}else {
				uni.share({
					provider: name,
					scene: 'WXSceneSession',
					type: 3,
					title: '来自AudioBook分享',
					href: this.$common.url,
					imageUrl:this.info.img,
					mediaUrl:this.info.audioSrc,
					summary: '我正在使用AudioBook听书，赶紧跟我一起来体验！'+this.$common.url,
					success: function(res) {
						console.log('shanre:');
					},
					fail: function(err) {
						console.log('fail shanre');
					}
				});
			}
			this.$refs.share.close();
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
			display: flex;
			color: #fbe8e0;
			font-size: 26rpx;
			align-items: center;
			slider{
				width: 80%;
			}
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
