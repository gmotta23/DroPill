import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _98c49d8c = () => interopDefault(import('../pages/medico/index.vue' /* webpackChunkName: "pages/medico/index" */))
const _55bc2202 = () => interopDefault(import('../pages/responsavel.vue' /* webpackChunkName: "pages/responsavel" */))
const _1d0cb8fb = () => interopDefault(import('../pages/sobre.vue' /* webpackChunkName: "pages/sobre" */))
const _9e55f0ee = () => interopDefault(import('../pages/medico/receita.vue' /* webpackChunkName: "pages/medico/receita" */))
const _3f286b14 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/medico",
    component: _98c49d8c,
    name: "medico"
  }, {
    path: "/responsavel",
    component: _55bc2202,
    name: "responsavel"
  }, {
    path: "/sobre",
    component: _1d0cb8fb,
    name: "sobre"
  }, {
    path: "/medico/receita",
    component: _9e55f0ee,
    name: "medico-receita"
  }, {
    path: "/",
    component: _3f286b14,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
