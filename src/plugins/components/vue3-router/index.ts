/**
 * ----------------------------------------------------
 * 插件功能：从 src/views 目录自动生成文件路由
 * ----------------------------------------------------
 * 更多路由文档 see https://router.vuejs.org/zh/
 * ----------------------------------------------------
 */

import type { App } from '@/plugins/types';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { createRoutes, createGuard } from './guards';

import basicRoutes from '~pages';
const routes = createRoutes(basicRoutes);

/* @__PURE__ */
import.meta.env.DEBUG && console.log('自动生成的路由组', routes);

const base = import.meta.env.VITE_APP_BASE_URL || '/';
export const router = createRouter({
  //fix: ensure define overrides import.meta in build see https://github.com/vitejs/vite/issues/8892
  history: import.meta.env.VITE_HTTP_HASH === true ? createWebHashHistory(base) : createWebHistory(base),
  routes
});

export default async (app: App) => {
  app.use(router);
  createGuard(router);
  await router.isReady();
};
