/**
 * ======================================================================
 * vue3项目入口[此文件基本不需要进行修改，更多扩展组件插件请在plugins目录统一维护]
 * ----------------------------------------------------------------------
 * Author: 曹操<pgcao@qq.com>(https://gitee.com/pgcao/)
 * ======================================================================
 * see https://v3.cn.vuejs.org/ or https://vuejs.org/
 */
import { createApp } from 'vue';
import bootstrapPlugins from './plugins';
import setupDirectives from './directives';
import App from './App.vue';

const app = createApp(App);

// 自动导入全局自定义的vue指令
setupDirectives(app);

// 自动引导装载项目所依赖的第三方组件插件, 放在plugins目录统一维护
void bootstrapPlugins(app, () => app.mount('#app'));
