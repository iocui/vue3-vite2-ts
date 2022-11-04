/**
 * ===========================================================
 * 在这里配置你需要用到的函数库，项目即可直接使用，无需再导入
 * ===========================================================
 */
import type { Arrayable } from '@antfu/utils';
import type Options from 'unplugin-auto-import/types';
import type { ComponentResolver } from 'unplugin-vue-components/types';
import { isPackageExists } from 'local-pkg';

// =======================================================================================
// 选择合适你项目的UI分解器放进扩展配置, 支持以下UI库按需导入
// =======================================================================================
// ElementUiResolver/NaiveUiResolver/ElementPlusResolver/AntDesignVueResolver/HeadlessUiResolver
// IduxResolver/PrimeVueResolver/VantResolver/VarletUIResolver/VeuiResolver/ViewUiResolver
// LayuiVueResolver/BootstrapVueResolver/TDesignResolver/ArcoResolver 等... 详见官方文档
// ---------------------------------------------------------------------------------------
// see https://github.com/antfu/unplugin-vue-components#importing-from-ui-libraries
// =======================================================================================
import {
  AntDesignVueResolver, //阿里出品 https://www.antdv.com/
  ArcoResolver, //字节跳动出品 https://arco.design/
  DevUiResolver, //华为出品 https://vue-devui.gitee.io/
  ElementPlusResolver, //饿了么出品 https://element-plus.org/
  HeadlessUiResolver,
  IduxResolver,
  InklineResolver,
  LayuiVueResolver,
  NaiveUiResolver, //尤雨溪推荐组件库 https://www.naiveui.com/
  PrimeVueResolver,
  QuasarResolver,
  VantResolver, //轻量可靠的移动端组件库 http://vant-contrib.gitee.io/vant/
  ViewUiResolver,
  TDesignResolver, //腾讯出品 https://tdesign.tencent.com/
  VarletUIResolver, //Material风格移动端组件库 https://varlet.gitee.io/varlet-ui/
  Vuetify3Resolver,
  VueUseComponentsResolver //vueUse 组件化按需注册
} from 'unplugin-vue-components/resolvers';

const resolverGroup: [string, Arrayable<ComponentResolver>, string[]?][] = [
  ['naive-ui', NaiveUiResolver(), ['useLoadingBar', 'useDialog', 'useMessage', 'useNotification']],
  ['element-plus', ElementPlusResolver(), ['ElMessageBox', 'ElMessage', 'ElNotification']],
  ['ant-design-vue', AntDesignVueResolver(), ['message', 'notification']],
  ['@arco-design/web-vue', ArcoResolver({ sideEffect: true }), ['Message', 'Notification']],
  ['tdesign-vue', TDesignResolver(), ['MessagePlugin', 'NotifyPlugin']],
  ['tdesign-vue-next', TDesignResolver({ library: 'vue-next' }), ['MessagePlugin', 'NotifyPlugin']],
  ['vue-devui', DevUiResolver(), ['message']],
  ['quasar', QuasarResolver()],
  ['vuetify', Vuetify3Resolver()],
  ['primevue', PrimeVueResolver()],
  ['view-design', ViewUiResolver()],
  ['vant', VantResolver()],
  ['layui-vue', LayuiVueResolver()],
  ['@varlet/ui', VarletUIResolver()],
  ['@idux/components', IduxResolver()],
  ['@inkline/inkline', InklineResolver()],
  ['@headlessui/vue', HeadlessUiResolver()],
  ['@vueuse/components', VueUseComponentsResolver()]
];

/**
 * vueUse所有函数库自动导出(自行按要求格式增加)
 * 格式：vueUseImports[UI依赖包名] = [要注入的函数组，多个函数使用 “,” 号分隔];
 * 例如自动导出vue-devui的NotificationService格式：vueUseImports['@devui/vue-devui/notification'] = ['NotificationService'];
 */
const vueUseImports: Options.ImportsMap = require('./vueuse-json.js').call(null);

// ....其它依赖包函数库自动导出
const resolvers: Arrayable<Options.Resolver>[] = [];
const AutoResolvers = () => {
  if (!resolvers.length) {
    resolvers.push(VueUseComponentsResolver());
    resolverGroup.forEach(resolverObj => {
      const [packageName, resolver, fus] = resolverObj;
      if (isPackageExists(packageName)) {
        if (fus && fus?.length) {
          vueUseImports[packageName] = fus;
        }
        resolvers.push(resolver);
      }
    });
  }
  return resolvers;
};

const vue2Imports: Arrayable<Options.ImportsMap | Options.PresetName> = ['@vue/composition-api', 'pinia', vueUseImports];

const vue3Imports: Arrayable<Options.ImportsMap | Options.PresetName> = ['vue', 'pinia', 'vue-i18n', 'vue-router', vueUseImports];

export { vue2Imports, vue3Imports, AutoResolvers };

export default vueUseImports;
