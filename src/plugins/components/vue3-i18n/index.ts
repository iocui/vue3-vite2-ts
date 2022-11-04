/**
 * ==========================================================
 * 使用 yml 文件格式时要用到 @intlify/vite-plugin-vue-i18n 插件
 * ----------------------------------------------------
 * 注意 @intlify/vite-plugin-vue-i18n 在nodejs低版本的选择
 * nodejs < 14 推荐 @intlify/vite-plugin-vue-i18n 2.5.0 版本
 * 2.5.0+ 版本浏览器会报 client.mjs.map 找不到提示
 * ----------------------------------------------------
 * see https://vue-i18n.intlify.dev/
 */

import type { App } from '@/plugins/types';
import { createI18n } from 'vue-i18n';
import { set, merge } from 'lodash';
import config from '@/config';

const localeStorageKey = config.localeStorageKey;

// 获取浏览器默认语言
const getBrowserLang = function (langKeys: string[]) {
  let defaultBrowserLang = null;
  if (localStorage.getItem(localeStorageKey)) {
    defaultBrowserLang = localStorage.getItem(localeStorageKey);
  } else {
    const browserLang = navigator.language ? navigator.language : navigator['browserLanguage'] || '';
    if (['cn', 'zh', 'zh-cn'].includes(browserLang.toLowerCase())) {
      defaultBrowserLang = 'zh-CN';
    } else if (browserLang.toLowerCase().includes('en')) {
      defaultBrowserLang = 'en';
    } else {
      defaultBrowserLang = browserLang;
    }
  }
  defaultBrowserLang = defaultBrowserLang && langKeys.includes(defaultBrowserLang) ? defaultBrowserLang : '';
  return defaultBrowserLang;
};

// 获取语言包数据
let AllMessages: any;
const getMessages = () => {
  if (AllMessages) {
    return AllMessages;
  }

  let langMessages = {};

  //因为Object.fromEntries是ES10的东西，为了老掉牙的浏览器兼容一下
  if (!Object.fromEntries) {
    Object.defineProperty(Object, 'fromEntries', {
      value(entries: any) {
        if (!entries || !entries[Symbol.iterator]) {
          throw new Error('Object.fromEntries() requires a single iterable argument');
        }
        const o = {};
        Object.keys(entries).forEach(key => {
          const [k, v] = entries[key];
          o[k] = v;
        });
        return o;
      }
    });
  }

  // 用fromEntries将entries出来的[键值对数组列表]转为[对象]
  AllMessages = Object.fromEntries(
    Object.entries(
      // # =================================================================================================
      // # 提供两种语言目录结构, 自行选择更适合你所用. 支持 ts, json, yaml 文件格式，优先使用 yaml 文件的语言配置
      // # !!注意：选择后同时需更改 .vscode/settings.json 配置 i18n-ally.localesPaths 和 i18n-ally.pathMatcher
      // # =================================================================================================
      // # 方式一: 示例语言位于 /src/langs 目录下
      // # -------------------------------------------------------------------------------------------------
      // import.meta.glob('/src/langs/**/*.{ts,json(5)?,yaml}', { eager: true }) as Record<string, any>
      // # -------------------------------------------------------------------------------------------------
      // # 方式二: 示例语言位于 /src/locales 目录下
      // # -------------------------------------------------------------------------------------------------
      import.meta.glob('/src/locales/**/*.{ts,json(5)?,yaml}', { eager: true }) as Record<string, any>
      // # =================================================================================================
    ).map(([key, value]) => {
      const langDefault = value.default || {};

      const pathName = key.replace(/^\.\//, '') as string;
      const pathFileName = pathName.replace(/(.*\/)*([^.]+).*/gi, '$1$2') as string;
      const pathList = pathFileName.split('/').splice(3);

      const langName = ((key.indexOf('/src/langs/') > -1 ? pathList.pop() : pathList.shift()) || 'en') as string;
      const langKey = pathList.join('.');

      const jsonObj = {};
      const langObj: Record<string, any> = {};
      const langRootObj: Record<string, any> = {};
      if (langKey) {
        Object.keys(langDefault).forEach(value => {
          if (value.includes('.')) {
            jsonObj[langKey + '.' + value] = langDefault[value];
            set(langRootObj, langName, jsonObj);
            delete langDefault[value];
          }
        });
        if (JSON.stringify(langDefault) !== '{}') {
          set(langObj, langName + '.' + langKey, langDefault);
        }
      } else {
        set(langObj, langName, langDefault);
      }

      const result = merge(langMessages[langName] || {}, langObj[langName] || {}, langRootObj[langName] || {});
      langMessages[langName] = result;

      return [langName, result];
    })
  );

  langMessages = {};

  return AllMessages;
};

const messages = getMessages();
const defaultLocale = getBrowserLang(Object.keys(messages));

/* @__PURE__ */
import.meta.env.DEBUG && console.log('获取到的语言数据', defaultLocale, messages);

export const i18n = createI18n({
  legacy: false, // 是否禁用 Composition API 模式
  globalInjection: true, // 是否全局注册 $t 方法
  useI18nComponentName: false, // 翻译组件使用元素标签名称
  fallbackWarn: false, //是否去除没有翻译给定关键字的 Fall back 警告
  missingWarn: false, //是否去除国际化无效键值的 Not found 警告
  locale: defaultLocale, // 默认语言
  fallbackLocale: ['en'], // 备用语言(默认语言不存在时再按此序使用语种)
  messages
});

export default (app: App) => {
  // 注册全局无刷新切换语言
  app.config.globalProperties.setLang = (locale: string) => {
    localStorage.setItem(localeStorageKey, locale);
    i18n.global.locale['value'] = locale;
  };

  app.use(i18n);
};
