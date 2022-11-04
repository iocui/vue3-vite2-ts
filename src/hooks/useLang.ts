/**
 * 此 hooks 自动识别 单文件组件(SFC) 或 ts文件 而选择使用多语言 useI18n or usei18n 方法, 全局通用
 */
import config from '@/config';
import type { Composer } from 'vue-i18n';

// 语言缓存KEY名
const localeStorageKey = config.localeStorageKey;

// 自识别语言HOOKS
const useLang = (): Composer => {
  const instance = getCurrentInstance();
  if (instance && typeof instance?.proxy == 'object') {
    return useI18n();
  }
  return usei18n();
};

// 全局切换语言
const useLangChanged = (locale: string) => {
  localStorage.setItem(localeStorageKey, locale);
  useLang().locale.value = locale;
};

// 异步切换语言
const useLangChangedAsync = () => {
  //待开发中
};

// 导出函数
export { useLang, useLangChanged, useLangChangedAsync };
