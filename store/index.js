import Vue from 'vue'
import Vuex from "vuex"
import systemInfo from './modules/systemInfo.js'

Vue.use(Vuex)
const sotre = new Vuex.Store({
	modules:{
		systemInfo
	}
})

export default sotre