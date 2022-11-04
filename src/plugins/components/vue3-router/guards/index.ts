import type { Router, RouteRecordRaw } from 'vue-router';
import { clearAllPending } from '@/api';
import { setupLayouts } from 'virtual:generated-layouts';
import NotFound from '@/components/exception/[...404].vue';
import NProgress from 'nprogress';

// 追加的路由
export function createRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  // 配置 404 页面，并使用 src/layouts/blank.vue 布局显示
  routes.push({ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { layout: 'blank' } });
  return setupLayouts(routes);
}

// 路由拦截器
export function createGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    //唤起Loading进度条，可以换成其他的
    NProgress.start();

    //清除所有无效请求，防止数据污染(结合axios使用)
    clearAllPending();

    if (to.name === 'login') {
      return next();
    }

    const needLogin = Boolean(to.meta?.requiresAuth);
    if (needLogin && !localStorage.getItem('app-token')) {
      // 此路由需要授权，请检查是否已登录
      return next({ name: 'login', query: { redirect: to.fullPath } });
    }

    //其他拦截逻辑可以写在这里
    //.....

    //路由放行
    next();
  });

  router.afterEach((to, from, fail) => {
    if (to.meta?.title) {
      // 改变页面标题
      document.title = to.meta.title as string;
    }
    if (fail) {
      //错误的Loading进度条，可以换成其他的
      NProgress.done();
    } else {
      //关闭Loading进度条，可以换成其他的
      NProgress.done();
    }
  });

  router.onError(error => {
    console.log('路由错误', error);
  });
}
