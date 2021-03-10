<template>
	<view>
		<book-block-title title="分类书籍">
			<!-- <view class="" v-for="(item, index2) in pollDownData" :key="index2"> -->
			<book-intro :list="pollDownData" :limit="0"></book-intro>
			<!-- </view> -->
		</book-block-title>
	</view>
</template>

<script>
	import {postData} from '@/http/fetch.js'
	export default {
		data() {
			return {
				pollDownData:[]
			}
		},
		onLoad(op) {
			console.log(op.type);
			this.getBook(op.type)
			uni.setNavigationBarTitle({
				title:op.type
			})
		},
		methods: {
			async getBook(type){
				let data  = {
					type:type
				}
				let res = await postData('book/getTypeBook/', data)
				if(res.state == 'success'){
					let books = eval(res.data)
					// books[0].fields
					this.pollDownData = books
					console.log(books);
				}
				
				// console.log(res);
			},
			
		}
	}
</script>

<style>

</style>
