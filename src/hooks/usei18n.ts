/** 此 hooks 仅为非 setup 方法下使用多语言, SFC SETUP 下请使用 useI18n 方法 */
import type { Composer } from 'vue-i18n';
import { i18n } from '@/plugins/components/vue3-i18n';

export const usei18n = (): Composer => i18n.global;
