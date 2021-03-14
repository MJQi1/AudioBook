<template>
	<view>
		<uni-fab
			@trigger="clickBtn"
			@fabClick="fab"
			@titleClick="titleClick"
			:pattern="parrtern"
			horizontal="right"
			:content="content"
			direction="horizontal"
			:title="bookinfo.title"
		></uni-fab>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '书籍名字',
			parrtern: {
				backgroundImage: 'url(../../static/background/mine.png)'
			},
			content: [
				{
					iconPath: '/static/icons/Playerright.png'
				},
				{
					iconPath: '/static/icons/Playershang.png'
				},
				{
					iconPath: '/static/icons/Playerplay.png'
				},
				{
					iconPath: '/static/icons/Playernext.png'
				},
				{
					iconPath: '/static/icons/Playerfastforward.png'
				}
			]
		};
	},
	created() {
		console.log(this.paused);
		if (this.paused) {
			this.content[2].iconPath = '/static/icons/Playerplay.png';
		} else {
			console.log('play');
			this.content[2].iconPath = '/static/icons/Playerpause.png';
		}
	},
	computed: {
		bookinfo() {
			return this.$store.state.player.info;
		},
		playList() {
			return this.$store.state.player.playList;
		},
		paused() {
			return this.$player.paused;
		},
		chapterIndex() {
			return this.$store.state.player.currentPlay;
		}
	},
	watch: {
		bookinfo() {
			this.parrtern = {
				backgroundImage: 'url(' + this.bookinfo.img + ')'
			};
		},
		paused() {
			console.log(this.paused);
			if (this.paused) {
				this.content[2].iconPath = '/static/icons/Playerpause.png';
			} else {
				console.log('play');
				this.content[2].iconPath = '/static/icons/Playerplay.png';
			}
		}
	},
	methods: {
		clickBtn(op) {
			if(this.bookinfo.title == '请选择专辑播放'){
				uni.showToast({
					title:'请选择书籍播放',	
					icon:'none'
				})
				return
			}
			let index = op.index;
			switch (index) {
				case 0:
					this.kuaijin(-15);
					break;
				case 1:
					this.changePlay(1);
					break;
				case 2:
					// 切换按钮样式
					let play = '/static/icons/Playerplay.png';
					let pause = '/static/icons/Playerpause.png';

					if (this.content[2].iconPath == play) {
						this.content[2].iconPath = pause;
						this.$player.play();
					} else {
						this.content[2].iconPath = play;
						this.$player.pause();
					}
					break;
				case 3:
					this.changePlay(1);
					break;
				case 4:
					this.kuaijin(15);
					break;
			}
			// console.log(op.index);
		},
		fab() {
			// console.log('fab');
		},
		titleClick() {
			// console.log('titleClick');
			if(this.bookinfo.title == '请选择专辑播放'){
				uni.showToast({
					title:'请选择书籍播放',	
					icon:'none'
				})
				return
			}
			uni.navigateTo({
				url: '/pages/play/play',
			});
		},
		//快进
		kuaijin(time) {
			this.$player.seek(this.$player.currentTime + time);
		},
		changePlay(num) {
			try {
				let chap = this.playList[parseInt(this.chapterIndex) + num].fields.chapterId;
				// this.chapterName = this.playList[parseInt(this.chapterIndex)+num].fields.chapterName
				this.chapterIndex = parseInt(this.chapterIndex) + num;
				this.$store.commit('CURRENTPLAY', this.chapterIndex);
				console.log(chap);
				this.getPlaySrc(chap);
			} catch {
				uni.showToast({
					title: '没有更多章节',
					icon: 'none'
				});
			}
		},
		getPlaySrc(id) {
			let that = this;
			uni.request({
				url: 'https://www.ximalaya.com/revision/play/v1/audio?id=' + id + '&ptype=1',
				success(res) {
					that.$player.autoplay = true;
					that.$player.src = res.data.data.src;
					that.$player.play();
				}
			});
		}
	}
};
</script>

<style lang="less"></style>
