import type { RouteRecordRaw } from 'vue-router'

export default {
  path: '/add-rule',
  name: 'add-rule',
  component: () => import('@renderer/windows/add-rule/layout.vue'),
  redirect() {
    return { path: '/add-rule/insert' }
  },
  children: [
    {
      path: 'insert',
      name: 'add-rule-insert',
      component: () => import('@renderer/windows/add-rule/form/insert.vue')
    },
    {
      path: 'replace',
      name: 'add-rule-replace',
      component: () => import('@renderer/windows/add-rule/form/replace.vue')
    },
    {
      path: 'remove',
      name: 'add-rule-remove',
      component: () => import('@renderer/windows/add-rule/form/remove.vue')
    },
    {
      path: 'serialize',
      name: 'add-rule-serialize',
      component: () => import('@renderer/windows/add-rule/form/serialize.vue')
    },
    {
      path: 'fill',
      name: 'add-rule-fill',
      component: () => import('@renderer/windows/add-rule/form/fill.vue')
    },
    {
      path: 'regex',
      name: 'add-rule-regex',
      component: () => import('@renderer/windows/add-rule/form/regex.vue')
    },
    {
      path: 'extension',
      name: 'add-rule-extension',
      component: () => import('@renderer/windows/add-rule/form/extension.vue')
    }
  ]
} as RouteRecordRaw
