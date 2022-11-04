<script setup>
//类似封装前的写法 https://next.attojs.com/guide/documentation/dataFetching.html
import api from '@/api';

//接口一
const getTest = (userName, passWord) => {
  return api.axios.post('/test', {
    username: userName,
    password: passWord
  });
};
const { data: testData } = api.useRequest(getTest, {
  manual: false,
  defaultParams: ['马冬梅', '123456']
});

//接口二
const getUser = typeName => {
  return api.axios.post('/user', {
    type: typeName
  });
};
const { data: userData, run: runUser, loading: userLaoding } = api.useRequest(getUser, {
  manual: false,
  defaultParams: ['马冬梅', '123456']
});

//接口三(模拟失败重试)
const getUsers = typeName => {
  return api.axios.post('/userErr', { type: typeName });
};
const { data, run, loading, error } = api.useRequest(getUsers, {
  errorRetryCount: 3, //重试3次
  defaultParams: ['马冬梅']
});
run('张三');
</script>

<template>
  <div class="p-10">
    <button type="button" @click="$router.back()">返回</button>
    |
    <button
      type="button"
      @click="
        run('李四');
        runUser('王八');
      "
    >
      刷新用户接口
    </button>
    <hr class="m-4" />
    <div>
      {{ testData }}
      <hr class="m-4" />
      {{ userData ?? (userLaoding ? '正在读取数据' : '') }}
      <span v-show="userLaoding" class="text-slate-400 ml-2">loading...</span>
      <hr class="m-4" />
      {{ data ?? (loading ? '正在读取数据' : '') }}
      <span v-show="loading" class="text-slate-400 ml-2">loading...</span>
      <div v-show="error">{{ error }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
