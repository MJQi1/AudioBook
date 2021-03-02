<script>
import {getData,postData} from '@/http/fetch.js'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
	onLaunch: function() {
		const that = this;
		// 获取系统信息
		uni.getSystemInfo({
			success(info) {
				let screenHeight = info.screenHeight;
				info.screenWidth;
				console.log(screenHeight);
				// that.getPhoneHeight(screenHeight)
				// alert(that.phoneHeight())
			}
		});
		//点击中间按钮跳转
		uni.onTabBarMidButtonTap(function() {
			uni.navigateTo({
				url: '/pages/bookshelf/bookshelf'
			});
		});

		//判断用户登录
		let user = uni.getStorageSync('user');
		if (user == '') {
			console.log('未登录');
		} else {
			this.$store.commit('USER_LOGIN', user);
			this.getUserInfo(user);

			console.log('登录用户：' + user);
		}

		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		...mapState(['phoneHeight']),
		...mapActions(['getPhoneHeight']),
		async getUserInfo(user) {
			let resp = await getData('user/getUserInfo/?username=' + user);
			this.$store.commit('USER_INFO', resp);
		}
	}
};
</script>

<style lang="less">
/*每个页面公共css */
page {
	height: 100%;
	width: 100%;
}
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}

.container {
	padding: 20px;
	font-size: 14px;
	line-height: 24px;
}
</style>
