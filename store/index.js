import Vue from 'vue'
import Vuex from "vuex"
import systemInfo from './modules/systemInfo.js'
import user from './modules/user.js'

Vue.use(Vuex)
const sotre = new Vuex.Store({
	modules:{
		systemInfo,
		user
	}
})

export default sotre