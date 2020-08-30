import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2cfb77a1 = () => interopDefault(import('../pages/farmacia/index.vue' /* webpackChunkName: "pages/farmacia/index" */))
const _98c49d8c = () => interopDefault(import('../pages/medico/index.vue' /* webpackChunkName: "pages/medico/index" */))
const _2a339f05 = () => interopDefault(import('../pages/responsavel/index.vue' /* webpackChunkName: "pages/responsavel/index" */))
const _1d0cb8fb = () => interopDefault(import('../pages/sobre.vue' /* webpackChunkName: "pages/sobre" */))
const _6d336d58 = () => interopDefault(import('../pages/farmacia/reposicao.vue' /* webpackChunkName: "pages/farmacia/reposicao" */))
const _50e45ec2 = () => interopDefault(import('../pages/medico/dropill.vue' /* webpackChunkName: "pages/medico/dropill" */))
const _9e55f0ee = () => interopDefault(import('../pages/medico/receita.vue' /* webpackChunkName: "pages/medico/receita" */))
const _000b104e = () => interopDefault(import('../pages/responsavel/recarga.vue' /* webpackChunkName: "pages/responsavel/recarga" */))
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
    path: "/farmacia",
    component: _2cfb77a1,
    name: "farmacia"
  }, {
    path: "/medico",
    component: _98c49d8c,
    name: "medico"
  }, {
    path: "/responsavel",
    component: _2a339f05,
    name: "responsavel"
  }, {
    path: "/sobre",
    component: _1d0cb8fb,
    name: "sobre"
  }, {
    path: "/farmacia/reposicao",
    component: _6d336d58,
    name: "farmacia-reposicao"
  }, {
    path: "/medico/dropill",
    component: _50e45ec2,
    name: "medico-dropill"
  }, {
    path: "/medico/receita",
    component: _9e55f0ee,
    name: "medico-receita"
  }, {
    path: "/responsavel/recarga",
    component: _000b104e,
    name: "responsavel-recarga"
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
