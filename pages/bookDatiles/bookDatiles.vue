<template>
	<view class="main">
		<view class="book-top">
			<view class="book-top-warp">
				<image :src="bookInfo.img" mode="aspectFit"></image>
				<view class="book-info">
					<view class="book-title">{{ bookInfo.bookName }}</view>
					<view class="book-type">
						<uni-tag class="tag" size="small" :text="bookInfo.type" type="primary"></uni-tag>
						<!-- <uni-tag class="tag" size="small" text="表示" type="warning"></uni-tag>
						<uni-tag class="tag" size="small" text="表示" type="success"></uni-tag> -->
					</view>
					<view class="author">
						<view>{{ bookInfo.anchor }}</view>
					</view>
				</view>
			</view>
			<view class="fav-add">
				<uni-fav :checked="isFavorite" circle="true" bgColor="#9999e6" fgColor="#f7f7f7" bgColorChecked="#00aa00" @click="favorite()"></uni-fav>
				<button v-show="!isShelf" type="primary" size="mini" @click="addBookShelf()">加入书架</button>
				<button v-show="isShelf" type="warn" size="mini" @click="addBookShelf()">放出书架</button>
			</view>
		</view>

		<uni-section title="简介" type="line"></uni-section>

		<!-- <uni-group title="作者" margin-top="" mode="card"><view class="nextText">内容主体，可自定义内容及样式</view></uni-group> -->
		<uni-group title="主播" margin-top="" mode="card">
			<view class="nextText">{{ bookInfo.anchor }}</view>
		</uni-group>
		<uni-group title="内容简介" margin-top="" mode="card">
			<view class="nextText">{{ bookInfo.bookInfo }}</view>
		</uni-group>

		<uni-section title="全部章节" sub-title="" type="line"></uni-section>
		<uni-list>
			<uni-list-item
				v-for="(item, index) in bookTemp"
				:key="index"
				:title="item.fields.chapterName"
				:to="'../play/play?id=' + item.fields.chapterId + '&name=' + item.fields.chapterName + '&index=' + index"
			></uni-list-item>
			<uni-list-item title="剩余全部章节" link :to="`./allList/allList`"></uni-list-item>
		</uni-list>
		<uni-section title="评价" sub-title="" type="line"></uni-section>
		<view class="evalute">
			<view class="evalute-grade">
				<view class="grade">分数：{{ score }}</view>
				<uni-rate :value="score" size="20" readonly></uni-rate>
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
				<view v-if="!hasComm" style="font-size:30rpx;text-align: center;border-top: solid 1px #999;line-height: 100rpx;">暂无评论</view>
				<uni-list v-if="hasComm">
					<uni-list-item v-for="(item, index) in commentList" :key="index" :title="item[2]" :note="item[1]" :thumb="item[3]" thumb-size="lg" rightText="右侧文字">
						<template slot="header">
							<image style="width: 80rpx;height:80rpx;border-radius: 50%;margin-right: 20rpx;" :src="item[3] | imgSrc" mode=""></image>
						</template>
						<template slot="footer">
							<view class="" style="display: flex;flex-direction: column;align-items: flex-end; justify-content: space-between;">
								<text style="font-size: 16rpx; color: #999;">{{ item[0] }}</text>
								<uni-icons v-if="user == item[2]" type="trash" size="12" @click="delComment(item[4])"></uni-icons>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
		<!-- <view>{{ bookId }}</view> -->
		<uni-popup type="share" ref="share"><book-share-pop @select="shareSelect"></book-share-pop></uni-popup>
	</view>
</template>

<script>
import { getData, postData } from '@/http/fetch.js';
export default {
	data() {
		return {
			user: '',
			isLogin: '',
			bookId: '',
			bookInfo: [{ fields: { chapterName: '' } }],
			bookTemp: [],
			evaluteData: {
				text: '',
				rate: 0
			},
			isFavorite: false,
			errMsg: '',
			isShelf: false,
			score: 0,
			commentList: [],
			hasComm: false
		};
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		this.bookId = option.id; //打印出上个页面传递的参数。
		console.log(this.bookId);
		this.getComment();
		this.getBook();
	},
	onShow() {
		this.user = this.$store.state.user.user;
		this.isLogin = this.$store.state.user.hasLogin;
	},
	watch: {
		commentList(newdata, old) {
			if (newdata.length == 0) {
				this.hasComm = false;
			} else {
				this.hasComm = true;
			}
		}
	},
	methods: {
		//获取数据
		async getBook() {
			let result = await postData('book/getBookDetiles/', {
				user: this.user,
				bookId: this.bookId
			});
			this.bookInfo = eval(result.book)[0].fields;
			this.$store.commit('BOOKINFO', this.bookInfo);
			this.bookTemp = eval(result.chapter);
			// console.log(this.bookTemp);

			//获取是否收藏 书架
			if (this.isLogin) {
				let res = await postData('user/collect/', {
					user: this.user,
					bookId: this.bookId,
					state: 2 //判断收藏
				});
				this.isFavorite = res.state;

				let res2 = await postData('user/shelf/', {
					user: this.user,
					bookId: this.bookId,
					state: 2 //判断
				});
				this.isShelf = res2.state;
			}
		},
		//获取评论列表
		async getComment() {
			let comment = await postData('user/Comment/', {
				user: this.user,
				bookId: this.bookId,
				state: 0 //get comment list
			});
			console.log(comment);
			if (comment.comment.length == 0) {
				this.score = '暂未评分';
				this.hasComm = false;
			} else {
				//评分
				let sc = comment.score.c;
				this.score = parseFloat(sc).toFixed(1);
				//评论
				this.commentList = comment.comment.reverse();
				this.hasComm = false;
			}
		},
		//获取评分
		getRate(e) {
			this.evaluteData.rate = e.value;
		},
		// 评论
		async evalute() {
			if (!this.isLogin) {
				uni.navigateTo({
					url: '/pages/mine/login/login'
				});
			}

			if (this.evaluteData.text == '') {
				this.errMsg = '请填写评论';
			} else if (this.evaluteData.rate == 0) {
				this.errMsg = '请进行评分';
			} else {
				console.log(this.evaluteData);
				let res = await postData('user/Comment/', {
					user: this.user,
					bookId: this.bookId,
					rate: this.evaluteData.rate,
					comment: this.evaluteData.text,
					state: 1 //添加
				});
				console.log(res);
				this.errMsg = '';
				this.evaluteData = { title: '', rate: 0 };
				this.getComment();
			}
		},
		// 删除评论
		async delComment(id) {
			let res = await postData('user/Comment/', {
				user: this.user,
				bookId: this.bookId,
				id: id,
				state: 2 //删除
			});
			console.log(res);
			this.getComment();
		},
		// 收藏
		async favorite() {
			if (!this.isLogin) {
				uni.navigateTo({
					url: '/pages/mine/login/login'
				});
			}

			if (this.isFavorite) {
				let res = await postData('user/collect/', {
					user: this.user,
					bookId: this.bookId,
					state: 1 //取消收藏
				});
				console.log(res);
			} else {
				let res = await postData('user/collect/', {
					user: this.user,
					bookId: this.bookId,
					state: 0 //收藏
				});
				console.log(res);
			}
			this.isFavorite = !this.isFavorite;
		},
		// 分享
		share() {
			this.$refs.share.open();
		},
		// 加入书架
		async addBookShelf() {
			if (this.isShelf) {
				let res2 = await postData('user/shelf/', {
					user: this.user,
					bookId: this.bookId,
					state: 1 //删除
				});
				console.log(res2);
			} else {
				let res2 = await postData('user/shelf/', {
					user: this.user,
					bookId: this.bookId,
					state: 0 //加入
				});
				console.log(res2);
			}
			this.isShelf = !this.isShelf;
		},
		//分享选择
		shareSelect(op) {
			// #ifdef H5
			uni.showToast({
				icon:'none',
				title:'请使用浏览器自带分享'
			})
			// #endif
			// #ifdef APP-PLUS
			let name = op.item.name;
			if (name == 'pengyouquan') {
				uni.share({
					provider: 'weixin',
					scene: 'WXSenceTimeline',
					type: 0,
					title: '来自AudioBook分享',
					imageUrl:this.bookInfo.img,
					href: this.$common.url,
					summary: '我正在使用AUdioBook听' + this.bookInfo.bookName + '，赶紧跟我一起来体验！',
					success: function(res) {
						console.log('shanre:');
					},
					fail: function(err) {
						console.log('fail shanre');
					}
				});
			}else if(name == 'more'){
				uni.shareWithSystem({
				  summary: '我正在使用AudioBook听书，赶紧跟我一起来体验！'+this.$common.url,
				  href: this.$common.url,
				})
			} else {
				uni.share({
					provider: name,
					scene: 'WXSceneSession',
					type: 0,
					title: '来自AudioBook分享',
					href: this.$common.url,
					imageUrl:this.bookInfo.img,
					summary: '我正在使用AUdioBook听' + this.bookInfo.bookName + '，赶紧跟我一起来体验！',
					success: function(res) {
						console.log('shanre:');
					},
					fail: function(err) {
						console.log('fail shanre');
					}
				});
			}
			// #endif
			
			
		}
	},
	onNavigationBarButtonTap(op) {
		let index = op.index;
		switch (index) {
			case 0:
				console.log('分享');
				this.share();
				break;
			case 1:
				console.log('收藏');
				this.favorite();
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
