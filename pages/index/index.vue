<template>
	<view class="main">
		<code-elf-guide v-if="guidePages"></code-elf-guide>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				guidePages: true
			}
		},
		onLoad() {
			this.loadExecution()
		},
		methods: {
			loadExecution: function() {
				/**
				 * 获取本地存储中launchFlag的值
				 * 若存在，说明不是首次启动，直接进入首页；
				 * 若不存在，说明是首次启动，进入引导页；
				 */
				try {
					// 获取本地存储中launchFlag标识
					const value = uni.getStorageSync('launchFlag');
					if (value) {
						// launchFlag=true直接跳转到首页
						uni.switchTab({
							url: '/pages/home/home'
						});
					} else {
						// launchFlag!=true显示引导页
						this.guidePages = true
					}
				} catch (e) {
					// error 
					uni.setStorage({
						key: 'launchFlag',
						data: true,
						success: function() {
							console.log('error时存储launchFlag');
						}
					});
					this.guidePages = true
				}
			}
		}
	}
</script>

<style lang="less">
	page,
	.main {
		max-width: 768px;
		min-width: 320px;
		height: 100%;
		width: 100%;
	}
</style>
