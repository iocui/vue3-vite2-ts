<script setup>
const testStore = useTestStore();

const { isDark, toggleDark } = useDarks();

const { t, locale, availableLocales } = useLang();
const toggleLocales = () => {
  const langs = availableLocales;
  useLangChanged(langs[(langs.indexOf(locale.value) + 1) % langs.length]);
};
</script>
<template>
  <!-- 默认布局 -->
  <header>
    <div class="text-right px-8 py-2">
      <div class="relative inline-flex items-center">
        <router-link to="/">
          <icons-font name="ri-home-3-line" />
          首页
        </router-link>
        <span>|</span>
        <router-link to="/demo">Demo</router-link>
        <span>|</span>
        <router-link to="/demo/about">Md页</router-link>
        <span>|</span>
        <router-link to="/demo/http-test">API请求</router-link>
        <span>|</span>
        <router-link to="/demo/store">Pinia状态管理({{ testStore.count }})</router-link>
        <span>|</span>
        <router-link to="/demo/icon">图标集</router-link>
        <span>|</span>
        <router-link to="/demo/lang">多语言</router-link>
        <span>|</span>
        <router-link :to="{ path: '/demo/users/1000', query: { page: '1', limit: '10' } }">路由参(缓存)</router-link>
        <span>|</span>
        <router-link to="/demo/directive">自定义指令</router-link>
        <span>|</span>
        <router-link to="/demo/other">另一布局</router-link>
        <span>|</span>
        <button class="icon-btn mx-2" @click="toggleLocales">
          <span class="text-red-400 dark:text-green-400">切换语种({{ t('language') }})</span>
          <icons-svg-carbon-language class="text-xl" />
        </button>
        <button :title="isDark ? t('light-title') : t('dark-title')" class="@apply !outline-none opacity-60 hover:opacity-80 ml-2" @click="toggleDark()">
          <icons-svg-carbon-sun class="text-xl" v-show="!isDark" />
          <icons-svg-carbon-moon class="text-xl" v-show="isDark" />
        </button>
      </div>
    </div>
  </header>

  <RouterView v-slot="{ Component, route }">
    <KeepAlive max="10">
      <component :is="Component" :key="route.fullPath" v-if="route.meta.keepAlive" />
    </KeepAlive>
    <component :is="Component" :key="route.fullPath" v-if="!route.meta.keepAlive" />
  </RouterView>

  <footer class="text-center text-light-900">[默认布局]</footer>
</template>

<i18n lang="json">
{
  "zh-CN": {
    "dark-title": "黑暗模式",
    "light-title": "浅亮模式"
  },
  "zh-TW": {
    "dark-title": "黑暗模式",
    "light-title": "淺亮模式"
  },
  "en": {
    "dark-title": "dark mode",
    "light-title": "bright mode"
  }
}
</i18n>

<style scoped>
.relative span {
  padding: 0 6px;
  color: #cccccc;
}
.router-link-active {
  color: #ff0000;
}
</style>
