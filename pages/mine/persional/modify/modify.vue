<template>
	<view class="container">
		<view v-if="type == 'tx'">
			<zw-upload-img title="选择头像" :num="num" :dataList="dataList" @chooseImg="chooseImg" @close="close($event)"></zw-upload-img>
		</view>

		<view v-if="type == 'username'">
			<view>查看用户名(不可修改)</view>
			<uni-easyinput v-model="infoData.username" placeholder="" disabled="" />
		</view>
		<view v-if="type == 'sex'">
			<view>选择性别</view>
			<uni-data-checkbox v-model="infoData.sex" mode="default" :localdata="sex" selectedColor="#ff5500" />
		</view>
		<view v-if="type == 'email'">
			<view>邮箱不可修改</view>
			<uni-easyinput v-model="infoData.email" disabled="" placeholder="" />
		</view>
		<view v-if="type == 'birthday'">
			<view>填写生日</view>
			<view class="uni-list">
				<picker mode="date" :value="infoData.birthday" :start="startDate" :end="endDate" @change="bindDateChange">
					<uni-easyinput v-model="infoData.birthday" disabled="" />
				</picker>
			</view>
		</view>
		<view v-if="type == 'phone'">
			<view>填写新的手机号</view>
			<uni-easyinput v-model="infoData.phone" placeholder="" />
		</view>
		<view v-if="type == 'fun'">
			<view>选择兴趣爱好</view>
			<uni-data-checkbox v-model="infoData.fun" :multiple="true" mode="tag" :localdata="aihao" selectedColor="#ff5500" />
		</view>
		<view v-if="type == 'area'">
			<view>地区</view>
			<picker @change="bindPickerChange" :value="index" :range="array"><uni-easyinput v-model="infoData.area" disabled="" /></picker>
		</view>
		<view v-if="type == 'info'">
			<view>编写个性签名</view>
			<uni-easyinput v-model="infoData.info" placeholder="个性签名" />
			
		</view>
	</view>
</template>

<script>
import { getData, postData } from '@/http/fetch.js';
import common from '@/common.js'
export default {
	data() {
		return {
			type: '',
			dataList: [],
			num: 1,
			infoData: {
				username: '',
				sex: '',
				email: '',
				phone: '',
				fun: '',
				info: '',
				birthday: '',
				area: ''
			},
			aihao: [
				{ value: '运动', text: '运动' },
				{ value: '军事', text: '军事' },
				{ value: '游戏', text: '游戏' },
				{ value: '阅读', text: '阅读' },
				{ value: '宅家', text: '宅家' }
			],
			array: ['中国', '美国', '巴西', '日本'],
			sex: [{ value: '男', text: '男' }, { value: '女', text: '女' }]
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	onLoad(option) {
		let type = option.type;
		this.type = type;
		this.loadType(type);
		this.getInfo();
	},
	onNavigationBarButtonTap(e) {
		let index = e.index;
		switch (index) {
			case 0:
				this.save();
				break;
		}
	},
	methods: {
		//上传数据
		async save() {
			this.infoData.fun = this.infoData.fun.toString();
			this.infoData.type = this.type;
			let resp = await postData('user/modifyUserInfo/', this.infoData);
			console.log(resp.state);

			// 更新本地数据
			this.$store.commit('USER_INFO', resp.data);
			this.toast(resp.state);
			uni.navigateBack({});
		},
		toast(msg) {
			uni.showToast({
				title: msg,
				icon: 'none'
			});
		},
		getInfo() {
			let obj = eval(this.$store.state.user.userInfo);
			this.infoData.username = obj[0].fields.username;
			this.infoData.sex = obj[0].fields.sex;
			this.infoData.birthday = obj[0].fields.birthday;
			this.infoData.email = obj[0].fields.email;
			this.infoData.phone = obj[0].fields.phone;
			this.infoData.fun = obj[0].fields.fun.split(',');
			this.infoData.area = obj[0].fields.area;
			this.infoData.info = obj[0].fields.info;
			// console.log(this.infoData);
		},
		loadType(type) {
			let title;
			switch (type) {
				case 'username':
					title = '用户名修改';
					break;
				case 'sex':
					title = '性别修改';
					break;
				case 'fun':
					title = '爱好设置';
					break;
				case 'phone':
					title = '手机修改';
					break;
				case 'area':
					title = '地区设置';
					break;
				case 'info':
					title = '修改个性签名';
					break;
				case 'tx':
					title = '头像修改';
					break;
				case 'email':
					title = '查看邮箱';
					break;
				case 'birthday':
					title = '生日设置';
					break;
			}
			uni.setNavigationBarTitle({
				title: title
			});
		},
		chooseImg() {
			//选择图片
			uni.chooseImage({
				sourceType: ['camera', 'album'],
				sizeType: ['compressed', 'original'],
				count: this.num - this.dataList.length,
				success: res => {
					this.dataList = this.dataList.concat(res.tempFilePaths);
					this.upLoadImg(); //上传，需自行写
				}
			});
		},
		close(msg) {
			this.dataList = msg;
		},
		// 上传图片
		async upLoadImg() {
			uni.uploadFile({
				url: this.$common.baseUrl + 'user/uploadImg/', //仅为示例，非真实的接口地址
				filePath: this.dataList[0],
				name: 'file',
				formData: {
					user: this.infoData.username
				},
				success: uploadFileRes => {
					console.log(uploadFileRes.data);
				}
			});
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		bindDateChange: function(e) {
			console.log(e.target.value);
			this.infoData.birthday = e.target.value;
		},
		bindPickerChange: function(e) {
			this.infoData.area = this.array[e.target.value];
		}
	}
};
</script>

<style lang="less"></style>
