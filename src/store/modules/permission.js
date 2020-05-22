import { constantRouterMap, _import } from '@/router'
import { getPermission } from '@/api/user'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles 当前的权限是admin 还是其他用户
 */
function filterAsyncRouter(asyncRouterMap) {
  const res = []
  asyncRouterMap.forEach(route => {
    const tmp = { ...route }
    if (tmp.child) {
      tmp.child = filterAsyncRouter(tmp.child)
    }
    if (tmp.path) {
      if (tmp.child && !tmp.child.length) {
        res.push({
          path: tmp.path,
          component: () => import('@/layout/index.vue'),
          // alwaysShow: false,
          // redirect: '/index',
          children: [{
            path: 'index',
            name: tmp.name,
            component: _import(tmp.component),
            meta: {
              title: tmp.name,
              icon: tmp.icon,
            }
          }]
        })
      } else {
        res.push({
          path: tmp.level===1?tmp.path:tmp.path.substring(1),
          component: tmp.level !== 1 ? _import(tmp.component) : () => import('@/layout/index.vue'),
          // alwaysShow: false,
          name: tmp.name,
          meta: {
            title: tmp.name,
            icon: tmp.icon,
          },
          children: tmp.child
        })
      }

    }

    if (String(tmp.path).toLocaleLowerCase() === '/hide/menu') {
      res.pop()
    }
  })
  // console.log(res)
  return res
}

const permission = {
  state: {
    routers: [],
    addRouters: [],
    buttonRoles: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise((resolve, reject) => {
        let accessedRouters
        getPermission().then(response => {
          if (!response.data) {
            reject('error')
          }
          accessedRouters = filterAsyncRouter(response.data)
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission
