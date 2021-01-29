const selectBar = [{
		name: '推荐',
		select: true
	},
	{
		name: '男生',
		select: true
	},
	{
		name: '女生',
		select: true
	},
	{
		name: '教育',
		select: true
	},
	{
		name: '免费',
		select: true
	},
	{
		name: '会员',
		select: true
	},
	{
		name: '儿童',
		select: true
	},
]


/**
 * 测试数据
 * textList [
	 {
		 ...
	 }
 ]
 
 */
const textList = [{
	bookId: 144,
	src: 'http://imagev2.xmcdn.com/group74/M08/F7/E5/wKgO3F6ZKlyTkqKqAAMEKEhOSIw777.jpg!op_type=5&upload_type=album&device_type=ios&name=mobile_large&magick=png',
	bookTitle: '嘴说大全',
	author: '小三',
	type: '都市',
	state: "连载",
	bookIntro: '可选。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）'
}, {
	bookId: 242,
	src: 'http://imagev2.xmcdn.com/group74/M08/F7/E5/wKgO3F6ZKlyTkqKqAAMEKEhOSIw777.jpg!op_type=5&upload_type=album&device_type=ios&name=mobile_large&magick=png',
	bookTitle: '校花的贴身',
	author: '鱼人二代',
	type: '都市',
	state: "连载",
	bookIntro: '可选。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）'
}, {
	bookId: 2544,
	src: '/static/guide/duo.png',
	bookTitle: '斗破苍穹',
	author: '天蚕土豆',
	type: '都市',
	state: "连载",
	bookIntro: '可选。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）'
}, {
	bookId: 454,
	src: '/static/guide/duo.png',
	bookTitle: '小鼠大气',
	author: '哈罗',
	type: '都市',
	state: "连载",
	bookIntro: '可选。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）'
}, {
	bookId: 1995,
	src: '/static/guide/duo.png',
	bookTitle: '庆余年',
	author: '猫腻',
	type: '都市',
	state: "连载",
	bookIntro: '可选。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）'
}, {
	bookId: 785,
	src: '/static/guide/duo.png',
	bookTitle: '斗罗大陆',
	author: '唐家三少',
	type: '都市',
	state: "连载",
	bookIntro: '可选。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）'
}]

const boyList = [{
		title: '玄幻',
		imageSrc: '/static/icons/xuanhuan.png',
		path: '/pages/index/test/test'
	},
	{
		title: '武侠',
		imageSrc: '/static/icons/xianxia.png',
		path: '/pages/index/test/test'
	},
	{
		title: '都市',
		imageSrc: '/static/icons/dushi.png',
		path: '/pages/index/test/test'
	},
	{
		title: '悬疑',
		imageSrc: '/static/icons/xuanyi.png',
		path: '/pages/index/test/test'
	},
	{
		title: '游戏',
		imageSrc: '/static/icons/youxi.png',
		path: '/pages/index/test/test'
	}
]
const girlList = [{
		title: '言情',
		imageSrc: '/static/icons/yanqing.png',
		path: '/pages/index/test/test'
	},
	{
		title: '悬疑',
		imageSrc: '/static/icons/xuanyi.png',
		path: '/pages/index/test/test'
	},
	{
		title: '仙侠',
		imageSrc: '/static/icons/xianxia.png',
		path: '/pages/index/test/test'
	},
	{
		title: '青春',
		imageSrc: '/static/icons/shuidi.png',
		path: '/pages/index/test/test'
	},
	{
		title: '游戏',
		imageSrc: '/static/icons/youxi.png',
		path: '/pages/index/test/test'
	}
]

const rankData = [{
		title: '热播榜',
		list: textList
	},
	{
		title: '推荐',
		list: textList
	},
	{
		title: '销售榜',
		list: textList
	}
]

const pollDownData = [
	{
		list:textList
	},
	{
		list:textList
	}
	
]
export {
	selectBar,
	textList,
	rankData,
	boyList,
	girlList,
	pollDownData
}
