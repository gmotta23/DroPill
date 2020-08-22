import * as Cookies from 'js-cookie'

export default {
  setCookie (name, value) {
    Cookies.set(name, value)
  },
  getCookie (name) {
    Cookies.get(name)
  }
}