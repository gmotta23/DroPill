import * as Cookies from 'js-cookie'

export default {
  setCookie (name, value) {
    return Cookies.set(name, value)
  },
  getCookie (name) {
    return Cookies.get(name)
  }
}