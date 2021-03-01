<template>
	<view class="container">
		<view v-if="type=='tx'">
			<zw-upload-img title="选择头像" :num='num' :dataList="dataList" @chooseImg="chooseImg" @close="close($event)"></zw-upload-img>
		</view>
		
		<view v-if="type=='username'">
			<view>填写新的用户名</view>
			<uni-easyinput  v-model="infoData.username" placeholder="" />
		</view>
		<view v-if="type=='sex'">
			<view>选择性别</view>
			<radio-group name="sex">
				
				<view>
					<label>
						<radio value="male" /><text>男</text>
					</label>
				</view>
				<view>
					<label>
						<radio value="female" /><text>女</text>
					</label>
				</view>
				
			</radio-group>
		</view>
		<view v-if="type=='email'">
			<view>邮箱是登录账号不可修改</view>
			<uni-easyinput  v-model="infoData.email" disabled="" placeholder="" />
		</view>
		<view v-if="type=='brith'">
			<view>填写生日</view>
			
		</view>
		<view v-if="type=='phone'">
			<view>填写新的手机号</view>
			<uni-easyinput  v-model="infoData.phone" placeholder="" />
		</view>
		<view v-if="type=='fun'">
			<view>选择兴趣爱好</view>
			<uni-data-checkbox  v-model="infoData.fun" :multiple="true" mode="tag" :localdata="aihao"  selectedColor="#ff5500"/>
		</view>
		<view v-if="type=='info'">
			<view>编写个性签名</view>
			<textarea :value="infoData.info" style="background-color: #f4f4f4;padding: 30rpx; font-size: 26rpx;" placeholder="个性签名..." />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'',
				dataList:[],
				num:1,
				infoData:{
					username:'',
					sex:'',
					email:'',
					phone:'',
					fun:[],
					info:'',
					brith:''
				},
				aihao:[{"value": 0,"text": "篮球"    },{"value": 1,"text": "足球"},{"value": 2,"text": "游泳"}]
			};
		},
		onLoad(option) {
			let type = option.type
			this.type = type
			let title
			switch (type){
				case 'username':
					title = '用户名修改'
					break
				case 'sex':
					title = '性别修改'
					break
				case 'fun':
					title = '爱好设置'
					break
				case 'phone':
					title = '手机修改'
					break
				case 'area':
					title = '地区设置'
					break
				case 'info':
					title = '修改个性签名'
					break
				case 'tx':
					title = '头像修改'
					break
				case 'email':
					title = '查看邮箱'
					break
			}
			uni.setNavigationBarTitle({
				title:title
			})
		},
		onNavigationBarButtonTap(e) {
			let index = e.index
			switch(index){
				case 0:
					this.save()
					break
			}
		},
		methods:{
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
			save(){
				console.log('保存信息');
				uni.navigateBack({
					
				})
			}
		}
	}
</script>

<style lang="less">

</style>
