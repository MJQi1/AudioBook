import Vue from 'vue'
import Vuex from "vuex"
import systemInfo from './modules/systemInfo.js'
import user from './modules/user.js'
import player from './modules/player.js'
import book from './modules/book.js'

Vue.use(Vuex)
const sotre = new Vuex.Store({
	modules:{
		systemInfo,
		user,
		player,
		book
	}
})

export default sotre