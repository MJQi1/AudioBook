const state = {
	user: {},
	hasLogin:false
}
const getters = {
	
}
const mutations = {
	//登录
	USER_LOGIN(state, info) {
		state.hasLogin = true
		state.user = info
	},
	//登出
	USER_LOGOUT(state, info) {
		state.hasLogin = false
		state.user = info
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
