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
			let socket = new WebSocket("ws:" + "127.0.0.1:8000/websocketLink/?username"+ user);
			this.$store.commit('SOCKET', socket)
			console.log('登录用户：' + user);
			
			
			
			
			socket.onopen = function() {
				console.log('WebSocket open'); //成功连接上Websocket
			};
			socket.onmessage = function(e) {
				console.log('message: ' + e.data); //打印服务端返回的数据
				console.log(JSON.parse(e.data));
				let officalMessage = that.$store.state.user.socketMessage
				officalMessage.unshift(JSON.parse(e.data))
				that.$store.commit('SOCKET_MSG',officalMessage)
				uni.showTabBarRedDot({
					index:4
				})
				
			};
			socket.onclose = function(e) {
				console.log(e);
				socket.close(); //关闭TCP连接
			};
			if (socket.readyState == WebSocket.OPEN) {
				socket.onopen();
			}
			
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
