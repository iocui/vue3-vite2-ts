<script setup>
const router = useRouter();
const back = () => router.push('/');
</script>

<template>
  <div class="text-center mt-30">
    这是另一布局页面
    <button @click="back" class="border-light-900 border-1 pl-2 pr-2 rounded">👉 Go Home</button>
  </div>
</template>

<route lang="yml">
meta:
  layout: blank
</route>
