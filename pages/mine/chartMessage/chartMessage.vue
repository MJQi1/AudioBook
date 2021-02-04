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
				<uni-list><uni-list-chat :avatar-circle="true" title="xxx" avatar="/static/uni.png" note="呵呵,你可真秀" time="2020-02-02 20:20"></uni-list-chat></uni-list>
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
export default {
	data() {
		return {
			items: ['系统消息', '评论', '点赞'],
			current: 0
		};
	},
	methods: {
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		}
	}
};
</script>

<style lang="less"></style>
