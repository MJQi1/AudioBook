<template>
	<view class="main">
		<view class="book-top">
			<view class="book-top-warp">
				<image :src="src" mode="aspectFit"></image>
				<view class="book-info">
					<view class="book-title">shugmingxsdsa</view>
					<view class="book-type">
						<uni-tag class="tag" size="small" text="表示" type="success"></uni-tag>
						<uni-tag class="tag" size="small" text="表示表示" type="primary"></uni-tag>
						<uni-tag class="tag" size="small" text="表示" type="error"></uni-tag>
					</view>
					<view class="author">作者</view>
				</view>
			</view>
		</view>

		<uni-section title="简介" sub-title="" type="line"></uni-section>
		<view class="install">
			i是一种需求非常发散的产品，DCloud官方也无意用 uni-ui 压制第三方ui插件的空间， 但官方有义务在性能和多端方面提供一个开源的标杆给大家。
			我们欢迎更多优秀的ui组件出现，也欢迎更多人贡献 uni-ui 的主题风格，满足更多用户的需求。
		</view>
		<uni-section title="全部章节" sub-title="" type="line"></uni-section>
		<uni-list>
			<uni-list-item title="第一章 打法的萨芬" note=""></uni-list-item>
			<uni-list-item title="第二章 阿桑的歌发" note=""></uni-list-item>
		</uni-list>
		<uni-section title="评价" sub-title="" type="line"></uni-section>
		<view class="evalute">
			<view class="evalute-grade">
				<view class="grade">分数：2.5</view>
				<uni-rate value="2.5" size="20" readonly=""></uni-rate>
			</view>
			<view class="evalute-input">
				<uni-forms ref="form">
					<view class="input-grade">
						<view class="grade">评论</view>
						<uni-rate value="0" size="15"></uni-rate>
					</view>
					<textarea value="" class="text-area" placeholder="" />
					<button size="mini" class="pinglun" form-type="submit">评论</button>
				</uni-forms>
			</view>
			<view class="evalute-list">
				<uni-list>
					<uni-list-item title="列表左侧带略缩图" note="列表描述信息" thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png"
					     thumb-size="lg" rightText="右侧文字"></uni-list-item>
				</uni-list>
				<uni-list-item>
				        <!-- 自定义 header -->
				        <view slot="header" class="slot-box"><image class="slot-image" src="" mode="widthFix"></image></view>
				        <!-- 自定义 body -->
				        <text slot="body" class="slot-box slot-text">自定义插槽</text>
				        <!-- 自定义 footer-->
				        <template slot="footer">
				            <image class="slot-image" src="" mode="widthFix"></image>
				        </template>
				    </uni-list-item>
			</view>
		</view>
		<view>{{ bookId }}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bookId: '',
			src: 'http://imagev2.xmcdn.com/group74/M08/F7/E5/wKgO3F6ZKlyTkqKqAAMEKEhOSIw777.jpg!op_type=5&upload_type=album&device_type=ios&name=mobile_large&magick=png'
		};
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		this.bookId = option.id; //打印出上个页面传递的参数。
	}
};
</script>

<style lang="less" scoped>
.main {
	width: 100%;
	height: 2000rpx;
}
.book-top {
	height: 360rpx;
	background-image: linear-gradient(to top, #ffd98b, #ff8283);
	padding: 30rpx;
	.book-top-warp {
		display: flex;
		flex-direction: row;
		margin-top: 150rpx;
		height: 170rpx;
		image {
			width: 200rpx;
			height: 100%;
		}
		.book-info {
			width: 360rpx;
			padding-left: 30rpx;
			.book-title {
				color: #333;
				font-size: 38rpx;
				line-height: 70rpx;
			}
			.book-type {
				hegiht: 50rpx;
				display: flex;
				flex-direction: row;
				padding: 10rpx 0;
				.tag {
					margin-right: 20rpx;
				}
			}
			.author {
				font-size: 20rpx;
			}
		}
	}
}
.evalute {
	padding: 30rpx;
	.evalute-grade {
		display: flex;
		justify-content: space-between;
		padding: 50rpx;
		border-bottom: 1px solid #bebebe;
		.grade {
			font-size: 40rpx;
			color: #666;
			font-weight: bold;
		}
	}
	.evalute-input {
		position: relative;
		.input-grade {
			display: flex;
			justify-content: space-between;
			margin: 20rpx;
			.grade {
				font-size: 30rpx;
			}
		}
		.text-area {
			box-shadow: 1rpx 1rpx 2rpx #ffaa00;
			height: 100rpx;
			padding: 20rpx;
			width: 95%;
			background-color: #fffbf0;
		}
		.pinglun {
			position: absolute;
			margin-top: 20rpx;
			right: 20rpx;
			background-color: #f0ad4e;
			color: #ffffff;
		}
	}
}
</style>
