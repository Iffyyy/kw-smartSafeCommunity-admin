const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  accountId: state => state.user.accountId,
  name: state => state.user.name,
  superviseNum: state => state.superviseNum,
  showDetail:state => state.event.showDetail,
  eventList:state => state.event.eventList,
  showId:state => state.event.showId,
  permission_routers: state => state.permission.routers, // 当前渲染的前端路由----从后来获取
  addRouters: state => state.permission.addRouters // 当前渲染的前端路由----从后来获取 好像也是
}
export default getters
