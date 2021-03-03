<template>
	<view class="container">
		<view v-if="type == 'tx'"><zw-upload-img title="选择头像" :num="num" :dataList="dataList" @chooseImg="chooseImg" @close="close($event)"></zw-upload-img></view>

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
			<textarea :value="infoData.info" v-model="infoData.info" style="background-color: #f4f4f4;padding: 30rpx; font-size: 26rpx;" placeholder="个性签名..." />
		</view>
		{{ infoData }}
	</view>
</template>

<script>
import {getData, postData} from '@/http/fetch.js'
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
			aihao: [{ value: '运动', text: '运动' }, 
			{ value: '军事', text: '军事' }, 
			{ value: '游戏', text: '游戏' }, 
			{ value: '阅读', text: '阅读' },
			{ value: '宅家', text: '宅家'}],
			array: ['中国', '美国', '巴西', '日本'],
			sex: [{ value: '男', text: '男' },{value:'女',text:"女"}]
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
			this.infoData.fun = this.infoData.fun.toString().replace(',', ' ')
			this.infoData.type = this.type
			console.log(this.infoData);
			let resp = await postData('user/modifyUserInfo/', this.infoData)
			console.log(resp);
			console.log('保存信息');
			uni.navigateBack({});
		},
		getInfo() {
			let obj = eval(this.$store.state.user.userInfo);
			this.infoData.username = obj[0].fields.username;
			this.infoData.sex = obj[0].fields.sex;
			this.infoData.birthday = obj[0].fields.birthday;
			this.infoData.email = obj[0].fields.email;
			this.infoData.phone = obj[0].fields.phone;
			this.infoData.fun = obj[0].fields.fun.split();
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
					// #ifdef APP-PLUS
					this.upLoadImg1(); //上传，需自行写
					// #endif
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
			this.infoData.brithday = e.target.value;
		},
		bindPickerChange: function(e) {
			this.infoData.area = this.array[e.target.value];
		}
	}
};
</script>

<style lang="less"></style>
