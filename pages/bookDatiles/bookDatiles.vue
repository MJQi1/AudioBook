<template>
	<view>{{bookId}}</view>
</template>

<script>
export default {
	data() {
		return {
			bookId:''
		};
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		this.bookId = option.id //打印出上个页面传递的参数。
	}
};
</script>

<style lang="less"></style>
