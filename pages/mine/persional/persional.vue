<template>
	<view>
		<uni-list>
			<uni-list-item title="" note="" link="" to="modify/modify?type=tx">
				<template slot="header">
					<view class="title">
						头像
					</view>
				</template>
				<template slot="footer">
					<image class="touxiang" src="../../../static/background/mine.png" mode="aspectFill"></image>
				</template>
			</uni-list-item>
			<uni-list-item title="用户名" link="" to="modify/modify?type=username" note="">
				<template slot="footer">
					xxxx
				</template>
			</uni-list-item>
			<uni-list-item title="性别" link="" to="modify/modify?type=sex" note="">
				<template slot="footer">
					男
				</template>
			</uni-list-item>
			<uni-list-item title="生日" link="" to="modify/modify?type=brith" note="">
				<template slot="footer">
					xxxx
				</template>
			</uni-list-item>
			<uni-list-item title="邮箱" link="" to="modify/modify?type=email"note="">
				<template slot="footer">
					xxxx
				</template>
			</uni-list-item>
			<uni-list-item title="手机" link="" to="modify/modify?type=phone" note="">
				<template slot="footer">
					xxxx
				</template>
			</uni-list-item>
			<uni-list-item title="爱好" link="" to="modify/modify?type=fun" note="">
				<template slot="footer">
					xxxx
				</template>
			</uni-list-item>
			<uni-list-item title="地区" link="" to="modify/modify?type=area" note="">
				<template slot="footer">
					xxxx
				</template>
			</uni-list-item>
			<uni-list-item title="个性签名"  note="阿桑的歌发但是公司发多少个豆腐干士大夫" link to="modify/modify?type=info">
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
				
			};
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
</style>
