<script setup lang="ts">
//兼容大部分UI框架的分页组件，这里只做简单的分页演示
import { UserPage } from '@/api/module/page';

const prevPage = parseInt(useRoute().query.page as string) - 1;
const nextPage = parseInt(useRoute().query.page as string) + 1;

const { data, runAsync, run, mutate, loading, error, current, totalPage, pageSize } = UserPage().run({
  // debounceInterval: 0, //关闭防抖
  onSuccess: (res, rq) => {
    if (rq.length > 1 && rq[1] == '无刷新') {
      console.log('无刷新时后端成功返回数据: ', res, rq);
    }
  }
});

//使用了防抖, 刷新时先置空数据免得当成无数据[注: 关闭防抖 或 使用无刷新分页 时则不用]
mutate({ code: 0, data: [], total: 0 });

//手工发起请求
runAsync(useRoute().query).then(
  res => {
    console.log('后端成功返回数据: ', res);
  },
  error => {
    console.log('后端通讯错误返回: ', error);
  }
);
</script>

<template>
  <div class="p-10">
    <button type="button" @click="$router.push({ query: { page: 1, limit: 10 } })">[首页]</button>
    <button type="button" @click="$router.push({ query: { page: prevPage > 0 ? prevPage : 1, limit: 10 } })">[上一页]</button>
    <button type="button" @click="$router.push({ query: { page: nextPage < 10 ? nextPage : 10, limit: 10 } })">[下一页]</button>
    <button type="button" @click="$router.push({ query: { name: 'Josh' } })">[条件查找]</button>
    OR
    <button type="button" @click="run({ page: 1, limit: 20 }, '无刷新')">[无刷新翻到首页]</button>
    <button type="button" @click="run({ page: 5, limit: 20 }, '无刷新')">[无刷新翻到尾页]</button>

    <hr class="m-4" />
    <div>
      <button type="button" @click="$router.push({ path: '/demo/http-test' })">[返回主入口]</button>
      当前页: {{ current }} 总页数: {{ totalPage }} 每页数量: {{ pageSize }} 总条数: {{ data?.total || 0 }}
    </div>
    <hr class="m-4" />
    {{ data }}
    <hr class="m-4" />
    <div v-for="row in data?.data">{{ row.id }}: {{ row.name || '未知' }}({{ row['job'] }})</div>

    <div v-show="!data?.data" class="text-yellow-500">没有相关数据</div>

    <div v-show="loading" class="text-slate-400">loading...</div>
    <div v-show="!loading && error">Error: {{ error }}</div>
  </div>
</template>

<style scoped lang="scss"></style>
