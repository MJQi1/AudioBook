const state = {
	user: {},
	hasLogin:false,
	userInfo: {},
	socket: null,
	socketMessage:[]
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
	USER_LOGOUT(state) {
		state.hasLogin = false
		state.user = {}
	},
	USER_INFO(state, info) {
		state.userInfo = info
	},
	SOCKET(state, info) {
		state.socket = info
	},
	SOCKET_MSG(state, info) {
		state.socketMessage = info
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
