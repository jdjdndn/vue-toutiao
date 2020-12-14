import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

const TOKEN = 'login-user'

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem(TOKEN, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
