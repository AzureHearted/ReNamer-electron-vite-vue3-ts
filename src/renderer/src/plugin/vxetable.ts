import type { App } from 'vue'

import {
  VxeUI,
  VxeButton,
  VxeButtonGroup,
  VxeDrawer,
  VxeForm,
  VxeFormGroup,
  VxeFormItem,
  VxeIcon,
  VxeLoading,
  VxeModal,
  VxePager,
  VxePrint,
  VxeTooltip,
  VxeUpload
} from 'vxe-pc-ui'

import { VxeTable, VxeColumn, VxeColgroup, VxeGrid, VxeToolbar } from 'vxe-table'

// 导入主题变量，也可以重写主题变量
import 'vxe-table/styles/cssvar.scss'
import 'vxe-pc-ui/styles/cssvar.scss'

// 导入默认的语言
import zhCN from 'vxe-table/lib/locale/lang/zh-CN'

VxeUI.setI18n('zh-CN', zhCN)
VxeUI.setLanguage('zh-CN')

// 可选组件
export function lazyVxeUI(app: App<Element>) {
  app.use(VxeButton)
  app.use(VxeButtonGroup)
  app.use(VxeDrawer)
  app.use(VxeForm)
  app.use(VxeFormGroup)
  app.use(VxeFormItem)
  app.use(VxeIcon)
  app.use(VxeLoading)
  app.use(VxeModal)
  app.use(VxePager)
  app.use(VxePrint)
  app.use(VxeTooltip)
  app.use(VxeUpload)
}

export function lazyVxeTable(app: App<Element>) {
  app.use(VxeTable)
  app.use(VxeColumn)
  app.use(VxeColgroup)
  app.use(VxeGrid)
  app.use(VxeToolbar)
}
