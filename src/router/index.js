import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/incident',
    component: Layout,
    redirect: '/incident/table',
    name: 'incident',
    meta: { title: '事件中心', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '居民事件', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '公共事件', icon: 'tree' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '设备事件', icon: 'tree' }
      }
    ]
  },

  {
    path: '/report',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'report',
        component: () => import('@/views/form/index'),
        meta: { title: '报表中心', icon: 'form' }
      }
    ]
  },

  {
    path: '/analyze',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Analyze',
    meta: {
      title: '分析中心',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu2/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '人员动态' },
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '事件动态' }
      },
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu2/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '车辆动态' },
      },
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu2/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '决策贴士'},
      },
    ]
  },

  {
    path: '/archives',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Archives',
        component: () => import('@/views/form/index'),
        meta: { title: '档案中心', icon: 'form' }
      }
    ]
  },


  {
    path: '/external-link',
    component: Layout,
    redirect: '/example/table',
    name: 'external-link',
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '居民事件', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '公共事件', icon: 'tree' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '设备事件', icon: 'tree' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
