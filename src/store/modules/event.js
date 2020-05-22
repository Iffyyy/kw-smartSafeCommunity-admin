import {getEventSuperviseNum} from '@/api/event'

const getDefaultState = () => {
  return {
    superviseNum: 0,
    showDetail: false,
    showId: '',
    eventList: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_SUPERVISENUM: (state, superviseNum) => {
    state.superviseNum = superviseNum
  },
  SET_SHOWDETAIL: (state, showDetail) => {
    state.showDetail = showDetail
  },
  SET_SHOWID: (state, showId) => {
    state.showId = showId
  },
  VIEW_DETAIL: (state, showId) => {
    state.showId = showId
    state.showDetail = true
  },
  VIEW_EVENTLIST: (state, eventList) => {
    state.eventList = eventList
  }
}

const actions = {
  // 督办事件数量
  loadEventSuperviseNum({commit}) {
    return new Promise((resolve, reject) => {
      getEventSuperviseNum().then(res => {
        const {data} = res
        commit('SET_SUPERVISENUM', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

