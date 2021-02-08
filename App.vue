<script>
export default {
	onLaunch: function() {
		const AudioNotification = uni.requireNativePlugin("Audio-Notification"); // 显示插件,
		showView(params,callback),
		AudioNotification.showView({
		title:'鸡你太美',
		singer:'坤坤',
		image:'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1187968865,2620848686&fm=179&app=42&f=PNG?w=56&h=56',
		},res=>{
			console.log(res.btn)
			switch(res.btn){
				case 0: // 点击了上一曲
					this.onPrev()
					break
				case 1: // 点击了暂停按钮
					this.pause()
					break
				case 2: // 点击了播放按钮
					this.play()
					break
				case 3: // 点击了下一曲
					this.onNext()
					break
				case 4: // 点击了关闭按钮
					AudioNotification.hideView()
					break
			}
		})

		uni.onTabBarMidButtonTap(function(){
			uni.navigateTo({
				url:'/pages/bookshelf/bookshelf'
			})
		})
		console.log('App Launch')
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	},
	methods:{
		showView(params,callback){
			
		}
	}
}
</script>

<style lang="less">
/*每个页面公共css */
page {
	height: 100%;
	width: 100%;
}
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}

.container {
	padding: 20px;
	font-size: 14px;
	line-height: 24px;
}
</style>
