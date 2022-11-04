<template>
  <component :is="fontComponent" :name="props.name" :type="props.type" />
</template>

<script setup lang="ts">
import config from '@/config';
import createIconfont from './libs/create-iconfont';

/**
 * 阿里图标配置，支持多个阿里图标库整合使用
 * 本地化: 本地阿里图标库存放位于 public/assets/iconfont 目录下(推荐企业级应用建议使用本地化)
 * 线上库: 直接使用阿里图标库提供的在线链接(由阿里 CDN 服务仅供平台体验和调试使用，不承诺服务的稳定性)
 */
const fontComponent = createIconfont({
  /* 阿里 font-class 格式 font 图标，所有图标均可改变颜色 */
  linkUrl: config.iconFont.linkUrl || ['/assets/iconfont/iconfont.css'],

  /* 阿里 Symbol 格式 svg 图标，有色图标不可改变颜色 */
  scriptUrl: config.iconFont.scriptUrl || ['/assets/iconfont/iconfont.js']
});

const props = withDefaults(
  defineProps<{
    /** 图标名称 */
    name: string;
    /** 图标格式 */
    type?: 'font' | 'svg';
  }>(),
  { type: 'font' }
);
</script>
