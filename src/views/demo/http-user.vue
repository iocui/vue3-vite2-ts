<script setup>
import * as userModule from '@/api/module/user';

const isUseForm = useRoute().query.useform == '1';

localStorage.setItem('token', '123456');

const userData = isUseForm
  ? reactive(
      //模仿 form 表单提交
      userModule.formApi({ type: 'admin' }).run({
        //是否手动发起请求
        manual: false
      })
    )
  : reactive(
      //模仿 form json data
      userModule.jsonApi().run({
        //是否手动发起请求
        manual: false,
        //默认请求参数
        defaultParams: [{ type: 'admin' }]
      })
    );
</script>

<template>
  <div class="p-10">
    <button type="button" @click="$router.back()">返回</button>
    |
    <button type="button" @click="$router.push({ query: { useform: isUseForm ? 0 : 1 } })">
      {{ isUseForm ? '模拟Json请求' : '模拟Form请求' }}
    </button>
    |
    <button type="button" @click="userData.run({ type: 'user' })">换一个</button>
    <span v-show="userData.loading" class="text-slate-400 ml-2">loading...</span>

    <hr class="m-4" />
    {{ userData.data }}
    <div v-if="userData.data">{{ userData.data?.data?.name }}({{ userData.data?.data?.id }}) {{ userData.data?.data?.token }}</div>
    <div v-else class="text-gray-400">{{ userData.error || '正在读取数据...' }}</div>
  </div>
</template>

<style scoped lang="scss"></style>
