const getDefaultState = () => {
  return {
    currentUser: {
      id: "",
      img: "",
      name:'',
    },//当前用户信息
    layoutFlag:1,//页面布局标识
    viewType:9,//查看用户信息标识
  }
}

const state = getDefaultState()

const mutations = {
  SET_CURRENTUSER: (state, currentUser) => {
    state.currentUser = currentUser
  },
  SET_LAYOUTFLAG: (state, layoutFlag) => {
    state.layoutFlag = layoutFlag
  },
  SET_VIEWTYPE: (state, viewType) => {
    state.viewType = viewType
  },
}


export default {
  namespaced: true,
  state,
  mutations,
}

