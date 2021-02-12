const state = {
	phoneHeight: ''
}
const getters = {
	phoneHeigh: state => {
		return state.todos.filter(todo => todo.done)
	}
}
const mutations = {
	PHONE_HEIGHT(state, info) {
		state.phoneHeight = info
	}
}
const actions = {
	getPhoneHeight(context, info) {
		context.commit('PHONE_HEIGHT', info)
	}
}


export default {
	state,
	getters,
	mutations,
	actions
}
