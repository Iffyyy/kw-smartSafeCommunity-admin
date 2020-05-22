import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import event from './modules/event'
import archives from './modules/archives'
import permission from './modules/permission'

import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const state = {
  editPwd:false
}

const mutations = {
  SET_EDITPWD: (state, editPwd) => {
    state.editPwd = editPwd
  },
}

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    event,
    archives,
    permission,
  },
  getters,
  state,
  mutations,
  // ...
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(data) {
      return {
        // 设置只储存state中的myData
        archives:{
          currentUser: data.archives.currentUser,
          layoutFlag: data.archives.layoutFlag,
          viewType: data.archives.viewType,
        },
      }
    }
  })]
})

export default store
