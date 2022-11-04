<script setup>
import { testApi } from '@/api/module/test';

import dayjs from 'dayjs';
const getTime = () => dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
const time = ref(getTime());

const { data: testData, run: runFuns, error, loading } = testApi({
  username: 'admin',
  password: '123456'
}).run({
  manual: false, //是否手动发起请求
  onSuccess: function (res, params) {
    console.log('后端成功返回数据', res, ...params);
    time.value = getTime();
  },
  onError: function (error, params) {
    console.log('后端通讯错误返回', error, ...params);
  }
});
</script>

<template>
  <div class="p-10">
    <span style="padding-right: 10px">发起请求时间：{{ time }}</span>
    |
    <button type="button" @click="$router.push({ path: '/' })">返回首页</button>
    |
    <button type="button" @click="runFuns({ username: 'test', password: 'test' })">换一批</button>
    |
    <button type="button" @click="$router.push({ path: '/demo/http-user', query: { useform: '1' } })">延时效果</button>
    |
    <router-link :to="{ path: '/demo/http-page', query: { page: '1', limit: '10' } }">分页演示</router-link>
    |
    <router-link :to="{ path: '/demo/http-demo' }">原生写法</router-link>

    <hr class="m-4" />
    <div>{{ testData ?? '正在读取数据...' }}</div>
    <hr class="m-4" />

    <div v-for="(row, key) in testData?.data?.list">{{ key + 1 }}: {{ row.origin || '未知' }} {{ row['address'] }}</div>

    <div v-show="loading" class="text-light-800">loading...</div>
    <div v-show="!loading && error" class="error">error: {{ error }}</div>
  </div>
</template>

<style scoped lang="scss">
.error {
  @apply text-red-600;
}
</style>
