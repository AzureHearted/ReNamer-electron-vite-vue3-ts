import type { RouteRecordRaw } from 'vue-router'

export default {
  path: '/rule',
  name: 'rule',
  component: () => import('@renderer/windows/rule/layout.vue'),
  redirect() {
    return { path: '/rule/insert' }
  },
  children: [
    {
      path: 'insert',
      name: 'rule-insert',
      component: () => import('@renderer/windows/rule/form/insert.vue')
    },
    {
      path: 'replace',
      name: 'rule-replace',
      component: () => import('@renderer/windows/rule/form/replace.vue')
    },
    {
      path: 'remove',
      name: 'rule-remove',
      component: () => import('@renderer/windows/rule/form/remove.vue')
    },
    {
      path: 'serialize',
      name: 'rule-serialize',
      component: () => import('@renderer/windows/rule/form/serialize.vue')
    },
    {
      path: 'fill',
      name: 'rule-fill',
      component: () => import('@renderer/windows/rule/form/fill.vue')
    },
    {
      path: 'regex',
      name: 'rule-regex',
      component: () => import('@renderer/windows/rule/form/regex.vue')
    },
    {
      path: 'extension',
      name: 'rule-extension',
      component: () => import('@renderer/windows/rule/form/extension.vue')
    }
  ]
} as RouteRecordRaw
