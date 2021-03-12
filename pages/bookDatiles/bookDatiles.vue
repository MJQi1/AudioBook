<template>
	<view class="main">
		<view class="book-top">
			<view class="book-top-warp">
				<image :src="bookInfo.img" mode="aspectFit"></image>
				<view class="book-info">
					<view class="book-title">{{bookInfo.bookName}}</view>
					<view class="book-type">
						<uni-tag class="tag" size="small" :text="bookInfo.type" type="error"></uni-tag>
						<!-- <uni-tag class="tag" size="small" text="表示" type="warning"></uni-tag>
						<uni-tag class="tag" size="small" text="表示" type="success"></uni-tag> -->
					</view>
					<view class="author"><view>{{bookInfo.anchor}}</view></view>
				</view>
			</view>
			<view class="fav-add">
				<uni-fav :checked="isFavorite" circle="true" bgColor="#9999e6" fgColor="#f7f7f7" bgColorChecked="#e64340" @click="favorite()"></uni-fav>
				<button type="primary" size="mini" @click="addBookShelf()">加入书架</button>
			</view>
		</view>

		<uni-section title="简介" type="line"></uni-section>

		<!-- <uni-group title="作者" margin-top="" mode="card"><view class="nextText">内容主体，可自定义内容及样式</view></uni-group> -->
		<uni-group title="主播" margin-top="" mode="card"><view class="nextText">{{bookInfo.anchor}}</view></uni-group>
		<uni-group title="内容简介" margin-top="" mode="card"><view class="nextText">{{bookInfo.bookInfo}}</view></uni-group>

		<uni-section title="全部章节" sub-title="" type="line"></uni-section>
		<uni-list>
			<uni-list-item v-for="(item, index) in bookTemp" :key="index" :title="item.fields.chapterName" :to="'../play/play?id='+item.fields.chapterId"></uni-list-item>
			<uni-list-item title="剩余全部章节" link :to="`./allList/allList?bookId=${bookId}&book=${bookInfo.bookName}&img=${bookInfo.img}&anchor=${bookInfo.anchor}&type=${bookInfo.type}`"></uni-list-item>
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
		<!-- <view>{{ bookId }}</view> -->
		<uni-popup type="share" ref="share">
			<book-share-pop @select="shareSelect"></book-share-pop>
			
		</uni-popup>
	</view>
</template>

<script>
	import {getData,postData} from '@/http/fetch.js'
export default {
	data() {
		return {
			user:'',
			bookId: '',
			bookInfo:[{fields:{chapterName:''}}],
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
			isFavorite: false,
			errMsg: '',
			src: 'http://imagev2.xmcdn.com/group74/M08/F7/E5/wKgO3F6ZKlyTkqKqAAMEKEhOSIw777.jpg!op_type=5&upload_type=album&device_type=ios&name=mobile_large&magick=png'
		};
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		this.bookId = option.id; //打印出上个页面传递的参数。
		console.log(this.bookId);
		this.user = this.$store.state.user.user
		this.getBook()
	},
	methods: {
		//获取数据
		async getBook(){
			let result = await postData('book/getBookDetiles/',{
				user:this.user,
				bookId:this.bookId
			})
			this.bookInfo = eval(result.book)[0].fields
			this.bookTemp = eval(result.chapter)
			// console.log(this.bookTemp);
		},
		//获取评分
		getRate(e) {
			this.evaluteData.rate = e.value;
		},
		// 评论
		evalute() {
			if (this.evaluteData.text == '') {
				this.errMsg = '请填写评论';
			} else if (this.evaluteData.rate == 0) {
				this.errMsg = '请进行评分';
			} else {
				console.log(`submit ${this.evaluteData}`);

				this.errMsg = '';
				this.evaluteData = { title: '', rate: 0 };
			}
		},
		// 收藏
		favorite() {
			this.isFavorite = !this.isFavorite;
		},
		// 分享
		share() {
			this.$refs.share.open()
		},
		// 加入书架
		addBookShelf() {
			
		},
		//分享选择
		shareSelect(op){
			let name = op.item.name
			switch(name){
				case 'wx':
					console.log('wx');
					break
				case 'qq':
					console.log('qq');
					break
				case 'sina':
					console.log('wb');
					break
				case 'more':
					console.log('more');
					break
			}
		}
	},
	onNavigationBarButtonTap(op) {
		let index = op.index;
		switch (index) {
			case 0:
				console.log('分享');
				this.share()
				break;
			case 1:
				console.log('收藏');
				this.favorite()
				break;
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
	background-image: url(../../static/background/shelf.gif);
	background-size: cover;
	background-repeat: no-repeat;
	padding: 30rpx;
	.fav-add {
		padding-left: 362rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		button {
			
		}
	}
	.book-top-warp {
		// filter: blur(20rpx);
		display: flex;
		flex-direction: row;
		margin-top: 110rpx;
		height: 170rpx;
		image {
			border-radius: 20%;
			width: 170rpx;
			height: 150rpx;
		}
		.book-info {
			width: 550rpx;
			padding-left: 30rpx;
			.book-title {
				color: #aa0000;
				font-size: 35rpx;
				line-height: 70rpx;
			}
			.book-type {
				hegiht: 45rpx;
				display: flex;
				flex-direction: row;
				padding: 5rpx 0;
				.tag {
					margin-right: 20rpx;
				}
			}
			.author {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 25rpx;
				
			}
		}
	}
}
.install {
	padding: 30rpx;
	border-radius: 23rpx;
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
.nextText {
	font-size: 20rpx;
}
</style>
