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
		:title="title"></uni-fab>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title:'书籍名字',
			parrtern: {
				backgroundImage: 'url(../../static/background/shelf.png)'
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
	methods: {
		clickBtn(op) {
			let index = op.index
			switch(index){
				case 0:
				
					break	
				case 1:
					
					break
				case 2:
					// 切换按钮样式
					let play = '/static/icons/Playerplay.png'
					let pause = '/static/icons/Playerpause.png'
					if(this.content[2].iconPath == play){
						this.content[2].iconPath = pause
					}else{
						this.content[2].iconPath = play
					}
					break	
				case 3:
				
					break	
				case 4:
				
					break	
					
			}
			// console.log(op.index);
		},
		fab() {
			// console.log('fab');
		},
		titleClick(){
			// console.log('titleClick');
			uni.navigateTo({
				url:'/pages/play/play'
			})
		}
	}
};
</script>

<style lang="less"></style>
