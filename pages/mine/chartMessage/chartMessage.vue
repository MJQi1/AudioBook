<template>
	<view>
		<uni-segmented-control :current="current" styleType="text" activeColor="#eb9d00" :values="items" @clickItem="onClickItem"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0">
				<uni-list>
					<uni-list-item title="官方信息" note="活动点赞了你,活动点赞了你活动点赞了你,活动点赞了你,活动点赞了你,活动点赞了你" thumb="/static/uni.png" thumb-size="lg">
						<template slot="footer">
							<text style="font-size: 20rpx;color: #999;">2020-10-20</text>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
			<view v-show="current === 1">
				<view v-if="!showCommentList" style="font-size:30rpx;text-align: center;line-height: 100rpx;">
					你还没有评论，快去评论吧！
				</view>
				<uni-list v-if="showCommentList">
					<uni-list-item
						v-for="(item, index) in commentList"
						:key="index"
						:title="item[2]"
						:note="item[1]"
						:thumb="item[3]"
						thumb-size="lg"
					>
						<template slot="header">
							<image style="width: 80rpx;height:80rpx;margin-right: 20rpx;" :src="item[3]" mode=""></image>
						</template>
						<template slot="footer">
							<view class="" style="display: flex;flex-direction: column;align-items: flex-end; justify-content: space-between;">
								<text style="font-size: 16rpx; color: #999;">{{item[0]}}</text>
								<uni-icons type="trash" size="12" @click="delComment(item[4])"></uni-icons>
							</view>
							
						</template>
					</uni-list-item>
				</uni-list>
			</view>
			<view v-show="current === 2">
				<uni-list>
					<uni-list-item title="官方信息" note="xxx点赞了你" thumb="/static/uni.png" thumb-size="lg">
						<template slot="footer">
							<text style="font-size: 20rpx;color: #999;">2020-10-20</text>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
import{postData} from '@/http/fetch.js'
export default {
	data() {
		return {
			items: ['系统消息', '评论', '点赞'],
			current: 0,
			commentList:[],
			showCommentList:''
		};
	},
	onLoad(option) {
		if(option.type === 'pl'){
			this.current = 1
		}
		this.getComment()
	},
	computed:{
		user(){
			return this.$store.state.user.user
		}
	},
	methods: {
		// 获取pinglun
		async getComment(){
			let comment = await postData('user/Comment/',{
				user: this.user,
				state: 3//get comment list
			}) 
			this.commentList = comment.comment
			if (this.commentList.length == 0){
				this.showCommentList = false
			} else {
				this.showCommentList = true
			}
			
		},
		// 删除评论
		async delComment(id){
			let res = await postData('user/Comment/',{
				user: this.user,
				bookId:this.bookId,
				id: id,
				state: 2//删除
			}) 
			console.log(res);
			this.getComment()
		},
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		}
	}
};
</script>

<style lang="less"></style>
