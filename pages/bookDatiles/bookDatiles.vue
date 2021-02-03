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
		
			<uni-group title="作者" margin-top="" mode="card">
				<view class="nextText">
					内容主体，可自定义内容及样式
				</view>
			</uni-group>
			<uni-group title="主播" margin-top="" mode="card" >
				<view class="nextText">
					内容主体，可自定义内容及样式
				</view>
			</uni-group>
			<uni-group title="内容简介" margin-top="" mode="card" >
				<view class="nextText">
					内容主体，可自定义内容及样式
				</view>
			</uni-group>
	
			
		<uni-section title="全部章节" sub-title="" type="line"></uni-section>
		<uni-list>
			<uni-list-item v-for="(item, index) in bookTemp" :key="index" :title="`第${index + 1}章  ${item.title}`" to="../home/search/search"></uni-list-item>
			<uni-list-item title="全部章节" link to="xxx"></uni-list-item>
		</uni-list>
		<uni-section title="评价" sub-title="" type="line"></uni-section>
		<view class="evalute">
			<view class="evalute-grade">
				<view class="grade">分数：2.5</view>
				<uni-rate value="2.5" size="20" readonly></uni-rate>
			</view>
			<view class="evalute-input">
				<uni-forms ref="form">
					<view class="input-grade">
						<view class="grade">评论</view>
						<uni-rate allowHalf="true" @change="getRate" :value="evaluteData.rate" size="15"></uni-rate>
					</view>
					<textarea v-model="evaluteData.text" class="text-area" placeholder="说说你的想法..." />
					<text style="color: red;font-size: 16rpx;" v-text="errMsg"></text>
					<button size="mini" class="pinglun" @click="evalute">评论</button>
				</uni-forms>
			</view>
			<view class="evalute-list">
				<uni-list>
					<uni-list-item
						title="名字"
						note="列表描述信息列表描述信息列表描述信息列表描述信息列表列表描述信息列表描述信息列表描述信列表描述信息列表描述信息列表描述信列表描述信息列表描述信息列表描述信描述信息列表描述信息列表描述信息"
						thumb="https://tse3-mm.cn.bing.net/th/id/OIP.1NiQaNCRWX0sioJGRwKuAwHaIS?w=187&h=209&c=7&o=5&dpr=1.06&pid=1.7"
						thumb-size="lg"
						rightText="右侧文字"
					>
						<template slot="header">
							<image style="width: 100rpx;height:100rpx" src="../../static/icons/xianxia.png" mode=""></image>
						</template>
						<template slot="footer">
							<text style="font-size: 16rpx; color: #999;">2020-1-2</text>
						</template>
					</uni-list-item>
				</uni-list>
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
			bookTemp: [
				{
					title: '阿里的父1',
					link: 'src'
				},
				{
					title: '阿父母公开2',
					link: 'src'
				},
				{
					title: '阿里的父母3',
					link: 'src'
				},
				{
					title: '阿里4',
					link: 'src'
				},
				{
					title: '阿5',
					link: 'src'
				},
				{
					title: '阿里的父母6',
					link: 'src'
				},
				{
					title: '阿里的父7',
					link: 'src'
				},
				{
					title: '阿里的8',
					link: 'src'
				},
				{
					title: '阿里的9',
					link: 'src'
				},
				{
					title: '阿里10',
					link: 'src'
				}
			],
			evaluteData: {
				text: '',
				rate: 0
			},
			errMsg:'',
			src: 'http://imagev2.xmcdn.com/group74/M08/F7/E5/wKgO3F6ZKlyTkqKqAAMEKEhOSIw777.jpg!op_type=5&upload_type=album&device_type=ios&name=mobile_large&magick=png'
		};
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		this.bookId = option.id; //打印出上个页面传递的参数。
	},
	methods: {
		//获取评分
		getRate(e) {
			this.evaluteData.rate = e.value;
		},
		// 评论
		evalute() {
			if (this.evaluteData.text == '') {
				this.errMsg = '请填写评论'
			} else if(this.evaluteData.rate == 0) {
				this.errMsg = '请进行评分'
			}else{
				console.log(`submit ${this.evaluteData}`);
				
				this.errMsg = ''
				this.evaluteData = {title:'',rate:0}
			}
		}
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
.install {
	padding: 30rpx;
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
		margin-bottom: 100rpx;
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
.nextText{
	font-size: 20rpx;
}
</style>
