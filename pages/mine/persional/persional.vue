<template>
	<view>
		<uni-list>
			<uni-list-item title="" note="" link="" to="modify/modify?type=tx">
				<template slot="header">
					<view class="title">
						头像
					</view>
				</template>
				<template slot="footer" >
					<image class="touxiang" :src="userinfo.headImage | imgSrc" mode="aspectFill"></image>
				</template>
			</uni-list-item>
			<uni-list-item title="用户名" link="" to="modify/modify?type=username" note="">
				<template slot="footer" >
					<text class="info">	{{userinfo.username | formatNull}}</text>
				</template>
			</uni-list-item>
			<uni-list-item title="性别" link="" to="modify/modify?type=sex" note="">
				<template slot="footer">
					<text class="info">	{{userinfo.sex | formatNull}}</text>
				</template>
			</uni-list-item>
			<uni-list-item title="生日" link="" to="modify/modify?type=birthday" note="">
				<template slot="footer">
					<text class="info">	{{userinfo.birthday | formatNull}}</text>
				</template>
			</uni-list-item>
			<uni-list-item title="邮箱" link="" to="modify/modify?type=email"note="">
				<template slot="footer">
					<text class="info">	{{userinfo.email | formatNull}}</text>
				</template>
			</uni-list-item>
			<uni-list-item title="手机" link="" to="modify/modify?type=phone" note="">
				<template slot="footer">
					<text class="info">	{{userinfo.phone | formatNull}}</text>
				</template>
			</uni-list-item>
			<uni-list-item title="爱好" link="" to="modify/modify?type=fun" note="">
				<template slot="footer">
					<text class="info">	{{userinfo.fun | formatNull}}</text>
				</template>
			</uni-list-item>
			<uni-list-item title="地区" link="" to="modify/modify?type=area" note="">
				<template slot="footer">
					<text class="info">	{{userinfo.area | formatNull}}</text>
				</template>
			</uni-list-item>
			<uni-list-item title="个性签名"  :note="userinfo.info | formatNull" link to="modify/modify?type=info">
			</uni-list-item>
		</uni-list>
		<view class="tips">
			tips：点击修改个人信息
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo:{}
			};
		},
		onLoad() {
			let info = this.$store.state.user.userInfo
			info = eval(info)
			this.userinfo = info[0].fields
			console.log(info);
			
		},
		filters:{
			formatNull(ret) {
				if(ret != null){
					return ret
				}else {
					return ret = '暂未设置'
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.touxiang{
	height: 100rpx;
	width: 100rpx;
	border-radius: 50rpx;
}
.title{
	height:100%;
	line-height: 100rpx;
}
.tips{
	font-size: 12rpx;
	color:#999;
	margin:30rpx;
	text-align: right;
}
.info{
	font-size: 26rpx;
	color: #666;
}
</style>
