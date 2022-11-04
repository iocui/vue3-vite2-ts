<script setup>
const inputval = ref('');
</script>
<template>
  <div>
    <div class="text-center pt-20">
      <strong>路由 Params 参:</strong>
      {{ $route.params.id }}
    </div>
    <div class="text-center p-10">
      <strong>路由 Query 参:</strong>
      {{ $route.query }}
      <p class="m-5">
        切换路由保留所输入:
        <input type="text" placeholder="输入内容" v-model.trim="inputval" />
      </p>
      {{ inputval }}
    </div>
  </div>
</template>

<route lang="yml">
meta:
  keepAlive: true
</route>
