<script>
	export default {
		onLaunch: function() {
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
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	page{
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
