<template>
	<view>
		<uni-segmented-control :current="current" :values="items" styleType="text" @clickItem="onClickItem" activeColor="#ff5500"></uni-segmented-control>
		<view class="content">
			<view v-show="current === index1" class="content-item" v-for="(node,index1) in items" >
				<view class="left-tab">
					<view v-if="index1===0" class="check-bth" :class="{'check-active': index==active}" v-for="(item,index) in list1 " :key="index" @click="changTab('all',index)">{{item}}</view>
					<view v-if="index1===1" class="check-bth" :class="{'check-active': index==active}" v-for="(item,index) in list2" :key="index" @click="changTab('boy',index)">{{item}}</view>
					<view v-if="index1===2" class="check-bth" :class="{'check-active': index==active}" v-for="(item,index) in list3" :key="index" @click="changTab('girl',index)">{{item}}</view>
					<view v-if="index1===3" class="check-bth" :class="{'check-active': index==active}" v-for="(item,index) in list4" :key="index" @click="changTab('edu',index)">{{item}}</view>
					<view v-if="index1===4" class="check-bth" :class="{'check-active': index==active}" v-for="(item,index) in list5" :key="index" @click="changTab('fun',index)">{{item}}</view>
				</view>
				
				<view class="right-box">
					<scroll-view scroll-y="true" class="scroll">
						<view>
							<book-intro :list="data" :limit="0"></book-intro>
						</view>
					</scroll-view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
import {textList} from '../home/data.js'
import {getData, postData} from '@/http/fetch.js'
export default {
	data() {
		return {
			items: ['总排行', '男生', '女生','教育','休闲娱乐'],
			current: 0,
			list1:['人气排行', '免费榜', '会员榜'],
			list2:['男生人气', '男生免费','男生会员'],
			list3:['女生人气', '女生免费','女生会员'],
			list4:['教育', '教育免费', '教育会员'],
			list5:['休闲娱乐', '娱乐免费', '娱乐会员'],
			active: 0,
			data:textList
		};
	},
	created() {
		this.getBook('all', 0)
	},
	methods: {
		//获取书
		async getBook(type,state){
			this.data = []
			
			let data  = {
				type:type,
				state:state
			}
			let res = await postData('book/getRank/', data)
			
			let books = res
			if(state == 0) {
				books = eval(res.data.all)
			}else if(state == 1){
				books = eval(res.data.free)
			}else if(state == 2){
				books = eval(res.data.vip)
			}
			// books[0].fields
			this.data = books
			console.log(books);
			
			
			// console.log(res);
		},
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
				let type
				switch(this.current){
					case 0:
						type = 'all'
						break
					case 1:
						type = 'boy'
						break
					case 2:
						type = 'girl'
						break
					case 3:
						type = 'edu'
						break
					case 4:
						type = 'fun'
						break
				}
				
				this.changTab(type, 0)
			}
		},
		//点击排行
		changTab(type,index){
			
			this.active = index
			this.getBook(type, index)			
			
		}
	}
}
</script>

<style lang="less" scoped>
	.content{
		// padding-top: 20rpx;
		background-color: #f0f0f0;
		.content-item{
			// border-top: 1rpx solid #666666;
			margin-top: 10rpx;
			padding-top: 10rpx;
			display: flex;
			height: 88vh;
			flex-direction: row;
			.left-tab{
				width: 25vw;
				height: 100%;
				background-color: #f0f0f0;
				.check-bth{
					line-height: 75rpx;
					height: 75rpx;
					font-size: 26rpx;
					text-align: center;
					margin: 20prx !important;
				}
				.check-active{
					border-left: 7rpx solid #ff8d0b;
					background-color: #ffffff;
					color: #ff8d0b;
				}
			}
			.right-box{
				width: 560rpx;
				padding: 20rpx;
				overflow: hidden;
				background-color: #FFFFFF;
				.scroll{
					height: 95%;
				}
			}
		}
		
	}
</style>
