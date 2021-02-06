import Vue from 'vue'
import App from './App'
import anime from 'vue-animejs'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(anime)



const app = new Vue({
    ...App
})
app.$mount()
