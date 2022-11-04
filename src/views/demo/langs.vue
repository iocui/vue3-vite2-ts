<script setup>
const { t } = useLang();
</script>

<template>
  <div style="text-align: center; margin-top: 10%">
    <h1>{{ t('language') }} - {{ $t('language') }}(我没变哈)</h1>
    <h1>{{ t('hello') }} - {{ $t('hello') }}</h1>
    <h1>{{ t('server.timeout') }} - {{ $t('server.timeout') }}</h1>
    <h1>{{ t('common.hello') }} - {{ $t('common.hello') }}</h1>
    <h1>{{ t('common.api.hello') }} - {{ $t('common.api.hello') }}</h1>
  </div>
</template>

<i18n>
{
  "en": {
    "language": "我是英语"
  },
  "zh-CN": {
    "language": "我是简体"
  },
  "zh-TW": {
    "language": "我是繁体"
  }
}
</i18n>
