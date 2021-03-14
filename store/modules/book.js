const state = {
	bookInfo:{},
	chapter:[],
}

const getters = {
	
}
const mutations = {
	BOOKINFO(state, info) {
		state.bookInfo = info
	},
	CHAPTER(state,info){
		state.chapter = info
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