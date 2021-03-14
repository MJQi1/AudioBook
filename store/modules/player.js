const state = {
	playList:[],
	currentPlay:'',
	info:{
		title:'请选择专辑播放',
		img:'../../static/background/mine.png'
	}
}

const getters = {
	
}
const mutations = {
	PLAYLIST(state, info) {
		state.playList = info
	},
	CURRENTPLAY(state,info){
		state.currentPlay = info
	},
	INFO(state,info){
		state.info = info
	}
}
const actions = {
	
}


export default {
	state,
	getters,
	mutations,
	actions
}