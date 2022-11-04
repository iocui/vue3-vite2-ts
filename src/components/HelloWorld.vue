<script setup>
const { t } = useLang();
</script>
<template>
  <div class="p-0 mt-0">
    <div class="py-10">
      <div class="@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <img class="h-40 mb-10" src="@/assets/logo.png" title="logo" />
          <h2 class="@apply text-2xl font-normal tracking-wide uppercase; globals-color">
            {{ t('title') }}
          </h2>
          <p class="@apply mt-2 mb-10 text-2xl leading-8 tracking-tight text-gray-900 dark:text-light-900 sm:text-3xl">
            {{ t('describe') }}
          </p>
        </div>

        <dl class="@apply <lg:hidden flex flex-wrap items-center justify-center text-xs font-semibold text-gray-500 tracking-wide uppercase">
          <dt class="flex-none w-full mb-4"></dt>
          <dd class="@apply flex items-center bg-black dark:bg-gray-800 bg-opacity-10 py-2 pl-5 sm:pl-6 pr-2 sm:pr-3 rounded-l-full">
            <a href="https://code.visualstudio.com/" target="_blank">
              <icons-svg-AkarIconsVscodeFill class="icons flex-none" />
              VsCode
            </a>
          </dd>
          <dd class="@apply flex items-center bg-black dark:bg-gray-800 dark:text-light bg-opacity-10 py-2 px-2 sm:px-3">
            <a href="https://marketplace.visualstudio.com/items?itemName=MisterJ.vue-volar-extention-pack" target="_blank">
              <icons-svg-MdiApplicationBrackets class="icons flex-none" />
              Volar
            </a>
          </dd>
          <dd class="@apply flex items-center bg-black dark:bg-gray-800 bg-opacity-10 py-2 px-2 sm:px-3">
            <a href="https://v3.cn.vuejs.org/" target="_blank">
              <icons-svg-AkarIconsVueFill class="icons flex-none" />
              Vue3
            </a>
          </dd>
          <dd class="@apply flex items-center bg-black dark:bg-gray-800 bg-opacity-10 py-2 px-2 sm:px-3">
            <a href="https://cn.vitejs.dev/" target="_blank">
              <icons-svg-FileIconsVite class="icons flex-none" />
              Vite2+
            </a>
          </dd>
          <dd class="@apply flex items-center bg-black dark:bg-gray-800 bg-opacity-10 py-2 pl-2 sm:pl-3 pr-5 sm:pr-6 rounded-r-full">
            <a href="https://www.typescriptlang.org/zh/" target="_blank">
              <icons-svg-SimpleIconsTypescript class="icons flex-none" />
              Typescript4+
            </a>
          </dd>
        </dl>

        <!-- 当语种含有HTML元素时，使用i18n插槽方式展现 -->
        <i18n-t keypath="tips" tag="p" class="@apply lg:text-center mt-4 max-w-2xl text-base text-gray-500 lg:mx-auto">
          <template #dom><b>i18n</b></template>
        </i18n-t>

        <div class="@apply mt-10 lg:text-center">
          <a
            href="https://gitee.com/pgcao/vue3-vite2-ts"
            target="_blank"
            class="@apply p-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <icons-svg-SimpleIconsGitee />
            {{ t('btn-txt') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
{
  "zh-CN": {
    "title": "欢迎使用 Vite2 + VUE3.X 起始模板",
    "describe": "一套基于Vite2+可搭建企业级项目的脚手架",
    "tips": "珠联璧合! 轻量/自动/工程化/开箱即用/热切换{dom}, 快的不止那么一点点~",
    "btn-txt": "获取源码"
  },
  "zh-TW": {
    "title": "歡迎使用 Vite2 + VUE3.X 起始模板",
    "describe": "一套基於Vite2 可搭建企業級項目的腳手架",
    "tips": "珠聯璧合! 輕量/自動/工程化/開箱即用/熱切換{dom}, 快的不止那麼一點點~",
    "btn-txt": "獲取源碼"
  },
  "en": {
    "title": "Welcome use Vite2 + VUE3.X Starter Template",
    "describe": "A set of scaffolding for enterprise-level projects based on Vite2",
    "tips": "Perfect match! Light/auto/engineered/out of the box/hotSwap {dom}, faster~",
    "btn-txt": "Source code"
  }
}
</i18n>

<style lang="scss">
.icons {
  width: 20px;
  height: 20px;
  vertical-align: text-bottom;
}
.globals-color {
  color: $default-color;
}
</style>
