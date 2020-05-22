import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const userName = 'user_name'
const userPwd = 'user_pwd'

export function getToken() {
  return Cookies.get(TokenKey)
  // return 'eyJpdiI6IlNRRzREamdRTVJPMjJXUDNNbXpHeXc9PSIsInZhbHVlIjoiVWJFdGd4WEY0QWRLRnZuUUhDQjA1Zz09IiwibWFjIjoiODhiZWZhYzVhOTE3ZjIyMjBkYzg2ZmFhZDIyM2Q2NDczOWEzOTMxOWQ4MWVlZGZjN2MyYWUxODkzNjMwMGViZCJ9'
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserName() {
  return Cookies.get(userName)
}

export function setUserName(user_name) {
  return Cookies.set(userName, user_name)
}

export function setUserPwd(user_pwd) {
  return Cookies.set(userPwd, user_pwd)
}

export function getUserPwd() {
  return Cookies.get(userPwd)
}


export function removeUserInfo() {
   Cookies.remove(userName)
   Cookies.remove(userPwd)
}
