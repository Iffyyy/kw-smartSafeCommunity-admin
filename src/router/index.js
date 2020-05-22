import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const _import = require('./_import_' + process.env.NODE_ENV)

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
 * constantRouterMap
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRouterMap = [
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
    redirect: '/index/index',
    hidden: true,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/admin'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
/*  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/admin'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/incident',
    component: Layout,
    redirect: '/incident/person',
    name: 'incident',
    meta: { title: '事件中心', icon: 'incident' },
    children: [
      {
        path: 'person',
        name: 'Person',
        component: () => import('@/views/incident/person'),
        meta: { title: '人员事件',icon:'person'  }
      },
      {
        path: 'public',
        name: 'Public',
        component: () => import('@/views/incident/public'),
        meta: { title: '公共事件',icon:'public'  }
      },
      {
        path: 'device',
        name: 'Device',
        component: () => import('@/views/incident/device'),
        meta: { title: '设备事件',icon:'device' }
      }
    ]
  },

  {
    path: '/report',
    component: Layout,
    redirect: '/person',
    name: 'report',
    meta: {
      title: '报表中心',
      icon: 'report'
    },
    children: [
      {
        path: 'report/person',
        component: () => import('@/views/report/index'), // Parent router-view
        name: 'Person',
        meta: { title: '人员基本信息',icon:'userinfo' },
      },
      {
        path: 'report/incident',
        component: () => import('@/views/report/person'),
        meta: { title: '事件基本信息',icon:'eventinfo' }
      }
    ]
  },

  {
    path: '/analyze',
    component: Layout,
    redirect: '/person',
    name: 'Analyze',
    meta: {
      title: '分析中心',
      icon: 'analyze'
    },
    children: [
      {
        path: 'person',
        component: () => import('@/views/analyze/person/index'), // Parent router-view
        name: 'Person',
        meta: { title: '人员动态' ,icon:'people' },
      },
      {
        path: 'incident',
        component: () => import('@/views/analyze/incident/index'),
        meta: { title: '事件动态',icon:'event'  }
      },
      {
        path: 'car',
        component: () => import('@/views/analyze/car/index'), // Parent router-view
        name: 'Car',
        meta: { title: '车辆动态' ,
        icon: 'car'},
      },
      {
        path: 'note',
        component: () => import('@/views/analyze/note/index'), // Parent router-view
        name: 'Note',
        meta: { title: '决策贴士',icon:'note' },
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
        component: () => import('@/views/archives/index'),
        meta: { title: '档案中心', icon: 'archive' }
      }
    ]
  },*/

/*  {
    path: '/system',
    component: Layout,
    redirect: '/system/roleconfig',
    name: 'system',
    meta: { title: '系统管理', icon: 'system' },
    children: [
      {
        path: 'roleconfig',
        name: 'RoleConfig',
        component: () => import('@/views/system/TheRoleConfiguration/index'),
        meta: { title: '角色配置',icon:'role'  }
      },
      {
        path: 'accountmanagement',
        name: 'AccountManagement',
        component: () => import('@/views/system/AccountManagement/index'),
        meta: { title: '账号管理' ,icon:'account' }
      },
      {
        path: 'authorityManagement',
        name: 'Tree',
        component: () => import('@/views/system/AuthorityManagement/index'),
        meta: { title: '权限管理' ,icon:'permission' }
      },
      // {
      //   path: 'tree4',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: '人员管理' }
      // },
      {
        path: 'accessrecord',
        name: 'InAndOutManagement',
        component: () => import('@/views/system/InAndOutManagement/index'),
        meta: { title: '出入记录',icon:'access'  }
      },
      {
        path: 'operation',
        name: 'OperationGuidance',
        component: () => import('@/views/system/OperationGuidance/index'),
        meta: { title: '操作日志',icon:'log'  }
      },
      {
        path: 'tree7',
        name: 'Tree',
        component: () => import('@/views/system/RoleConfiguration/index'),
        meta: { title: '规则配置',icon:'rule'  }
      },
    ]
  },*/

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
